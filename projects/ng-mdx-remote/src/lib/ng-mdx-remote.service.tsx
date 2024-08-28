import { 
  Injectable,
  Injector,
  ElementRef, 
  EmbeddedViewRef ,
  ViewContainerRef,
} from '@angular/core';

import { createCustomElement } from '@angular/elements';
import { HttpClient } from '@angular/common/http';

// React Librarys //
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import * as mdx from '@mdx-js/react';

// React Compnents //
import MDXWrapper from './MDXWrapper'

// MDX //
import { compile, CompileOptions } from '@mdx-js/mdx';
import { VFile } from 'vfile';
import { matter } from 'vfile-matter';

// Types //
import { React_Component,Angular_Custom_Component} from './ng-mdx-remote.types';

//// Plugin Librarys & Options ////
import  {NG_Remote_MDX_Plugin_Obj} from './ng-mdx-remote.interfaces';
// PrismJS //
import Prism from 'prismjs'
import {
  PrismPlugin,
  PrismPlug_CommandLine_Options,
  PrismPlug_LineHighlight_Options,
  PrismPlug_matchBraces_Options,
  PrismPlug_NormalizeWhitespace_Options,

} from './plugins/prism-plugin';

// clipboard //
import ClipboardJS from 'clipboard'
import {ClipboardButtonComponent} from './clipboard-button.component';
import {ClipboardRenderOptions} from './plugins/clipboard-options'

// Interfaces //
import { 
  Compile_SerializeOptions,
  MDXRemoteSerializeResult,
  Input_SerializeOptions,
  Render_Options,
  Nested_Code_Render_Options,
} from './ng-mdx-remote.interfaces';

// Exceptions //
import {
  errorClipboardNotLoaded,
  errorClipboardViewContainerRequired,
} from './ng-mdx-remote.exceptions'


@Injectable({
  providedIn: 'root',
})
export class NgMdxRemoteService {


  constructor(
    private injector: Injector, 
    private http: HttpClient,
  ) {}

  public async serializeFromString<TScope = Record<string, unknown>, TFrontmatter = Record<string, unknown>>(
    source: string,
    options: Compile_SerializeOptions = {}
  ): Promise<MDXRemoteSerializeResult<TScope, TFrontmatter>> {
    return this.serialize<TScope, TFrontmatter>(new VFile(source), options);
  }

  public async serializeFromUrl<TScope = Record<string, unknown>, TFrontmatter = Record<string, unknown>>(
    url: string,
    options: Compile_SerializeOptions = {}
  ): Promise<MDXRemoteSerializeResult<TScope, TFrontmatter>> {
    const response = await fetch(url);
    const content = await response.text();
    return this.serialize<TScope, TFrontmatter>(new VFile(content), options);
  }

  public async serializeFromFile<TScope = Record<string, unknown>, TFrontmatter = Record<string, unknown>>(
    filePath: string,
    options: Compile_SerializeOptions = {}
  ): Promise<MDXRemoteSerializeResult<TScope, TFrontmatter>> {
    try {
      const content = await this.http.get(filePath, { responseType: 'text' }).toPromise();
      return this.serialize<TScope, TFrontmatter>(new VFile(content), options);
    } catch (error) {
      throw new Error(error instanceof Error ? `Error fetching MDX content: ${error.message}` : 'An unknown error occurred while fetching MDX content');
    }
  }

  private async serialize<TScope = Record<string, unknown>, TFrontmatter = Record<string, unknown>>(
    vfile: VFile,
    options: Compile_SerializeOptions
  ): Promise<MDXRemoteSerializeResult<TScope, TFrontmatter>> {
    if (options.parseFrontmatter) {
      matter(vfile, { strip: true });
    }

    const compileOptions: CompileOptions= {
      ...options.mdxOptions,
      outputFormat: 'function-body',
      providerImportSource: '@mdx-js/react',
    };

    try {
      const compiledMdx = await compile(vfile, compileOptions);
      const compiledSource = String(compiledMdx);
      return {
        compiledSource,
        frontmatter: (vfile.data["matter"] ?? {}) as TFrontmatter,
        scope: options.scope as TScope,
      };
    } catch (error) {
      throw new Error(error instanceof Error ? `Error compiling MDX: ${error.message}` : 'An unknown error occurred while compiling MDX');
    }
  }

  public convertNGComponent_ToCustomElement(component: any, tagName: string): void {
    if (typeof window !== 'undefined' && window.customElements && !customElements.get(tagName)) {
      const el = createCustomElement(component, { injector: this.injector });
      customElements.define(tagName, el);
    }
  }

  public convertNGComponents_FromArray(components: { component: any, tagName: string }[]): void {
    components.forEach(item => {
      this.convertNGComponent_ToCustomElement(item.component, item.tagName);
    });
  }

  public convertNGComponents_FromObject(components: Angular_Custom_Component): void {
    const componentArray = Object.keys(components).map(tagName => ({
      component: components[tagName],
      tagName
    }));
    this.convertNGComponents_FromArray(componentArray);
  }

  public async renderMdx(source : string, sourceType : string, reactRoot : ReactDOM.Root, elementRef : ElementRef<HTMLElement>, viewContainerRef : ViewContainerRef, SerializeOptions : Input_SerializeOptions, RenderOptions : Render_Options, reactComponents : React_Component): Promise<void> {
    if (!source) {
      return;
    }

    /// Apply Options you Modifed i Conmponent Html (Input)
    this.applyRemark_Plugins_Opts(SerializeOptions, RenderOptions)
    this.applyRehype_Plugins_Opts(SerializeOptions, RenderOptions)

    let serializePromise: Promise<MDXRemoteSerializeResult>;

    switch (sourceType) {
      case 'url':
        serializePromise = this.serializeFromUrl(source, SerializeOptions as Compile_SerializeOptions);
        break;
      case 'file':
        serializePromise = this.serializeFromFile(source, SerializeOptions as Compile_SerializeOptions);
        break;
      case 'string':
      default:
        serializePromise = this.serializeFromString(source, SerializeOptions as Compile_SerializeOptions);
        break;
    }

    try {
      const { compiledSource, scope, frontmatter } = await serializePromise;
      const fullScope = { ...scope, frontmatter, opts: { ...mdx, jsx, jsxs, Fragment } };
      const keys = Object.keys(fullScope);
      const values = Object.values(fullScope);
      const validSource = `return (function() {${compiledSource}}).apply(null, [opts]);`;
      const hydrateFn = new Function(...keys, validSource);

      // Execute the function to get the React component
      const Content = hydrateFn(...values).default;

      // Render the React component into the container
      reactRoot.render(
        <React.StrictMode>
          <MDXWrapper
            Content={Content}
            onRendered={() => {
              this.applyPrismJS(elementRef,RenderOptions);
              this.applyClipboard(elementRef, viewContainerRef, RenderOptions)
            }}
            reactComponents={reactComponents}
          />
        </React.StrictMode>
      );

    } catch (error) {
      reactRoot.render(
        <React.StrictMode>
          <p style={{ color: 'red', fontWeight: 'bold', fontSize: '35px' }}>
            The rendered content is not a valid React MDX/MD Component.
          </p>
        </React.StrictMode>
      );
      console.error('Error rendering MDX/MD content:', error);
    }
  }

  public applyPrismJS(elementRef : ElementRef<HTMLElement>, RenderOptions : Render_Options): void {
    if(RenderOptions.prismjs){
      const preElements = this.setlectAllPreElements(elementRef.nativeElement)
    if (preElements) {
      const filteredPreElements = Array.from(preElements).filter(pre => !pre.classList.contains('nested-code-block-pre'));
      filteredPreElements.forEach(preElement => {
        const codeElement = this.selectCodeElement(preElement)
        const lang = this.getCodeLanguage(preElement)
        if (codeElement && lang && Prism.languages[lang]){
          this.applyPrismPlugins(preElement, RenderOptions)
          Prism.highlightElement(codeElement)
        }
      });
    }
  }

  }

  public applyPrismPlugins(preElement: HTMLPreElement, RenderOptions : Render_Options | Nested_Code_Render_Options): void {
    if (RenderOptions.command_line) {
      RenderOptions.command_line_options
      this.applyPrismCommandLinePlugin(preElement,{
        "data-filter-output": RenderOptions.command_line_options?.filter_output,
        "data-host": RenderOptions.command_line_options?.host,
        "data-prompt": RenderOptions.command_line_options?.prompt,
        "data-output": RenderOptions.command_line_options?.output,
        "data-user": RenderOptions.command_line_options?.user,
      });
    }

    if (RenderOptions.line_highlight) {
      this.applyPrismLineHighlightPlugin(
        preElement,{ 
          'data-line': RenderOptions.line_highlight_options?.line, 
          'data-lineOffset': RenderOptions.line_highlight_options?.lineOffset 
        });
    }
    if (RenderOptions.line_numbers) {
      this.applyPrismLineNumbersPlugin(preElement,{ 'data-start': RenderOptions.line_numbers_options?.start });
    }

    if(RenderOptions.diff_highlight){
      this.applyPrismDiffHighlightdPlugin(preElement)
    }

    if(RenderOptions.match_braces){
      if(RenderOptions.match_braces_options){
        this.applyPrismMatchBracesPlugin(preElement,RenderOptions.match_braces_options)
      }else{
        this.applyPrismMatchBracesPlugin(preElement)
      }
    }

    if(RenderOptions.normalize_whitespace_options){
      this.applyPrismNormalizeWhitespacedPlugin(preElement,RenderOptions.normalize_whitespace_options)
    }

  }

  public applyClipboard(elementRef : ElementRef<HTMLElement>, viewContainerRef : ViewContainerRef, RenderOptions : Render_Options): void {
    if(RenderOptions.clipboard){
      const preElements = this.setlectAllPreElements(elementRef.nativeElement)
      if(preElements){
        this.renderClipboard(preElements, viewContainerRef, RenderOptions.clipboard_options)
      }
    }
  }
  

  public applyRemark_Plugins_Opts(SerializeOptions : Input_SerializeOptions, RenderOptions : Render_Options): void {
    const remarkPlugins = SerializeOptions.mdxOptions?.remarkPlugins;

    if (Array.isArray(remarkPlugins)) {
      // Iterate through the plugins in reverse to handle index issues during removal
      for (let i = remarkPlugins.length - 1; i >= 0; i--) {
        
        if (Array.isArray(remarkPlugins[i])) {
          
          // remark-emoji Plugin - Array
          if (this.isArrayPluginbyName(remarkPlugins[i], 'plugin')) {
            this.applyPlugins_OptsinArray(RenderOptions.gemoji,remarkPlugins,i,RenderOptions.gemoji_options)
          }

          // remarkGemoji Plugin - Array
          if (this.isArrayPluginbyName(remarkPlugins[i], 'remarkGemoji')) {
            this.disablePlugin(RenderOptions.gemoji,remarkPlugins,i)
          }
          

        }
        else if(this.isSimpleFuncPlugin(remarkPlugins[i])){
          
          // remark-emoji Plugin - Functiom
          if (this.isSimpleFuncPluginbyName(remarkPlugins[i], 'plugin')) {
            this.applyPlugins_OptsinFunc(RenderOptions.gemoji,remarkPlugins,i,RenderOptions.gemoji_options)
          }

          // remarkGemoji Plugin - Functiom
          if (this.isSimpleFuncPluginbyName(remarkPlugins[i], 'remarkGemoji')) {
            this.disablePlugin(RenderOptions.gemoji,remarkPlugins,i)
          }
          

        }
        else if (this.isObject(remarkPlugins[i])) {
          /// Object Needs to Be Like '{pluginName: string; pluginFunc: (...args: any[]) => any; pluginOptions?: Record<string, any>;}' 
          /// Because the pluginfunc has not allways the same name as package so i can not reconize it correctly,so imgoing to set the standard Name 'pluginName' so i can reconize it
          const Plugin = remarkPlugins[i] as NG_Remote_MDX_Plugin_Obj
          if(Plugin.pluginName && typeof Plugin.pluginFunc === 'function'){
            
            // remark-emoji Plugin - Object
            this.applyPlugins_OptsinObject(RenderOptions.gemoji, 'remark-emoji', remarkPlugins, i, RenderOptions.gemoji_options)

            // remarkGemoji Plugin (Has no Options)- Object 
            this.applyPlugins_OptsinObject(RenderOptions.gemoji, 'remarkGemoji', remarkPlugins, i)

            
          }
          else{
            console.warn("Make sure the object you pass looks like this '{pluginName: string; pluginFunc: (...args: any[]) => any; pluginOptions?: Record<string, any>;}' ");
          }
        }
        else {
          console.warn("Make sure you pass Remark Plugins as an array '[remarkKatex,{displayMode : false}]', or as Function 'remarkKatex' if you want to update the options dynamically in HTML.");
        }
      }
    } else {
      console.warn("Make sure rehypePlugins is an array.");
    }
  }

  public applyRehype_Plugins_Opts(SerializeOptions : Input_SerializeOptions, RenderOptions : Render_Options): void {
    const rehypePlugins = SerializeOptions.mdxOptions?.rehypePlugins;

    if (Array.isArray(rehypePlugins)) {
      // Iterate through the plugins in reverse to handle index issues during removal
      for (let i = rehypePlugins.length - 1; i >= 0; i--) {
        
        if (Array.isArray(rehypePlugins[i])) {
          
          // rehypeKatex Plugin - Array
          if (this.isArrayPluginbyName(rehypePlugins[i], 'rehypeKatex')) {
            this.applyPlugins_OptsinArray(RenderOptions.katex,rehypePlugins,i,RenderOptions.katex_options)
          }

          // rehypeTwemoji Plugin - Array
          if (this.isArrayPluginbyName(rehypePlugins[i], 'j')) {
            this.applyPlugins_OptsinArray(RenderOptions.twemoji,rehypePlugins,i,RenderOptions.twemoji_options)
          }

          // rehypeMermaid Plugin - Array
          if (this.isArrayPluginbyName(rehypePlugins[i], 'rehypeMermaid')) {
            this.applyPlugins_OptsinArray(RenderOptions.mermaid,rehypePlugins,i,RenderOptions.mermaid_options)
          }

        }
        else if(this.isSimpleFuncPlugin(rehypePlugins[i])){
          
          // rehypeKatex Plugin - Function
          if (this.istheRightPluginFuncbyName(rehypePlugins[i], 'rehypeKatex')) {
            this.applyPlugins_OptsinFunc(RenderOptions.katex,rehypePlugins,i,RenderOptions.katex_options)
          }

          // rehypeTwemoji Plugin - Function
          if (this.istheRightPluginFuncbyName(rehypePlugins[i], 'j')) {
            this.applyPlugins_OptsinFunc(RenderOptions.twemoji,rehypePlugins,i,RenderOptions.twemoji_options)
          }

          // rehypeMermaid Plugin - Function
          if (this.istheRightPluginFuncbyName(rehypePlugins[i], 'rehypeMermaid')) {
            this.applyPlugins_OptsinFunc(RenderOptions.mermaid,rehypePlugins,i,RenderOptions.mermaid_options)
          }

        }
        else if (this.isObject(rehypePlugins[i])) {
          /// Object Needs to Be Like {pluginName: string; pluginFunc: (...args: any[]) => any; pluginOptions?: Record<string, any>;} 
          /// Because the pluginfunc has not allways the same name as package so i can not reconize it correctly,so imgoing to set the standard Name 'pluginName' so i can reconize it
          
          const Plugin = rehypePlugins[i] as NG_Remote_MDX_Plugin_Obj
          if(Plugin.pluginName && typeof Plugin.pluginFunc === 'function'){

            // rehypeKatex Plugin - Object
            this.applyPlugins_OptsinObject(RenderOptions.katex, 'rehypeKatex', rehypePlugins, i, RenderOptions.katex_options)

            // rehypeTwemoji Plugin - Object
            this.applyPlugins_OptsinObject(RenderOptions.twemoji, 'rehypeTwemoji', rehypePlugins, i, RenderOptions.twemoji_options)
          
            // rehypeMermaid Plugin - Object
            this.applyPlugins_OptsinObject(RenderOptions.mermaid, 'rehypeMermaid', rehypePlugins, i, RenderOptions.mermaid_options)
          
          }
          else{
            console.warn("Make sure the object you pass looks like this '{pluginName: string; pluginFunc: (...args: any[]) => any; pluginOptions?: Record<string, any>;}' ");
          }
        }
        else {
          console.warn("Make sure you pass Rehype Plugins as an array '[rehypeKatex,{displayMode : false}]', or as Function 'rehypeKatex' if you want to update the options dynamically in HTML.");
        }
      }
    } else {
      console.warn("Make sure rehypePlugins is an array.");
    }
  }


  public applyPrismCommandLinePlugin(preElement: HTMLPreElement, options?: PrismPlug_CommandLine_Options): void {
    this.setPluginClass(preElement, PrismPlugin.CommandLine);
    if (options) {
      this.setPluginOptions(preElement, options);
    }
  }

  public applyPrismLineHighlightPlugin(preElement: HTMLPreElement, options?: PrismPlug_LineHighlight_Options): void {
    this.setPluginClass(preElement, PrismPlugin.LineHighlight);
    if (options) {
      this.setPluginOptions(preElement, options);
    }
  }

  public applyPrismLineNumbersPlugin(preElement: HTMLPreElement,options?: { "data-start"?: number }): void {
    this.setPluginClass(preElement, PrismPlugin.LineNumbers);
    if (options) {
      this.setPluginOptions(preElement, options);
    }
  }

  public applyPrismDiffHighlightdPlugin(preElement: HTMLPreElement): void {
    const lang = this.getCodeLanguage(preElement)
    if(lang && lang === "diff"){
      this.setPluginClass(preElement, PrismPlugin.DiffHighlight);
    }
  }

  public applyPrismMatchBracesPlugin(preElement: HTMLPreElement,options?: PrismPlug_matchBraces_Options): void {
    this.setPluginClass(preElement, PrismPlugin.MatchBraces);
    if(options){
      if(options['rainbow-braces']){
        this.setPluginClass(preElement, 'rainbow-braces');
      }

      if(options['no-brace-hover']){
        this.setPluginClass(preElement, 'no-brace-hover');
      }

      if(options['no-brace-select']){
        this.setPluginClass(preElement, 'no-brace-select');
      }
    }
  }

  public applyPrismNormalizeWhitespacedPlugin(preElement: HTMLPreElement, options: PrismPlug_NormalizeWhitespace_Options): void {
    // Ensure Prism and the plugin are loaded
    if (!Prism || !Prism.plugins || !Prism.plugins['NormalizeWhitespace']) {
      console.error('Prism or NormalizeWhitespace plugin not found');
      return;
    }
  
    // Normalize the whitespace directly
    const codeElement = this.selectCodeElement(preElement);
    if (codeElement) {
      const codeHTML = codeElement.innerHTML;
      const normalizedCode = Prism.plugins['NormalizeWhitespace'].normalize(codeHTML, options);
      codeElement.innerHTML = normalizedCode;
    } else {
      console.warn('Code element not found');
    }
  }

  public renderClipboard(preElements: NodeListOf<HTMLPreElement>, viewContainerRef?: ViewContainerRef, options?: ClipboardRenderOptions): void {
    /*if (isPlatformBrowser(this.platformId)) {
      return;
    }
    */
    if (typeof ClipboardJS === 'undefined') {
      throw new Error(errorClipboardNotLoaded);
    }
    if (!viewContainerRef) {
      throw new Error(errorClipboardViewContainerRequired);
    }

    for (let i = 0; i < preElements.length; i++) {
      const preElement = preElements[i];
  
      // Create <pre> wrapper element
      const preWrapperElement = document.createElement('div');
      preWrapperElement.style.position = 'relative';
      preElement.parentNode!.insertBefore(preWrapperElement, preElement);
      preWrapperElement.appendChild(preElement);
  
      // Create toolbar element
      const toolbarWrapperElement = document.createElement('div');
      toolbarWrapperElement.classList.add('ng-mdx-remote-clipboard-toolbar');
      toolbarWrapperElement.style.position = 'absolute';
      toolbarWrapperElement.style.top = '.5em';
      toolbarWrapperElement.style.right = '.5em';
      toolbarWrapperElement.style.zIndex = '1';
      preWrapperElement.insertAdjacentElement('beforeend', toolbarWrapperElement);
  
      // Register listener to show/hide toolbar
      preWrapperElement.onmouseenter = () => toolbarWrapperElement.classList.add('hover');
      preWrapperElement.onmouseleave = () => toolbarWrapperElement.classList.remove('hover');
  
      // Declare embeddedViewRef holding variable
      let embeddedViewRef: EmbeddedViewRef<unknown>;
  
      // Use provided component via input property
      // or provided via ClipboardOptions provider
      if (options?.buttonComponent) {
        const componentRef = viewContainerRef.createComponent(options?.buttonComponent);
        embeddedViewRef = componentRef.hostView as EmbeddedViewRef<unknown>;
        componentRef.changeDetectorRef.markForCheck();
      }
      // Use provided template via input property
      else if (options?.buttonTemplate) {
        embeddedViewRef = viewContainerRef.createEmbeddedView(options?.buttonTemplate);
      }
      // Use default component
      else {
        const componentRef = viewContainerRef.createComponent(ClipboardButtonComponent);
        embeddedViewRef = componentRef.hostView as EmbeddedViewRef<unknown>;
        componentRef.changeDetectorRef.markForCheck();
      }
  
      // Declare clipboard instance variable
      let clipboardInstance: ClipboardJS;
  
      // Attach clipboard.js to root node
      embeddedViewRef.rootNodes.forEach((node: HTMLElement) => {
        toolbarWrapperElement.appendChild(node);
        clipboardInstance = new ClipboardJS(node, { text: () => preElement.innerText });
      });
  
      // Destroy clipboard instance when view is destroyed
      embeddedViewRef.onDestroy(() => clipboardInstance.destroy());
    }
  }

  public setlectAllPreElements(element: HTMLElement): NodeListOf<HTMLPreElement> | null{
      return element.querySelectorAll('pre');
  }

  public selectCodeElement(preElement: HTMLPreElement): HTMLElement | null {
    return preElement.querySelector('code');
  }

  public getCodeLanguage(preElement: HTMLPreElement): string | undefined {
    // Check for 'language-' class in <pre> element
    const preElementLanguage = this.getLanguageFromClassList(preElement.classList);
    if (preElementLanguage) {
        return preElementLanguage;
    }

    // Check for 'language-' class in <code> element if <pre> does not contain it
    const codeElement = this.selectCodeElement(preElement);
    if (codeElement) {
        return this.getLanguageFromClassList(codeElement.classList);
    }

    // Return undefined if no language class found
    return undefined;
}

  private getLanguageFromClassList(classList: DOMTokenList): string | undefined {
    const classListArray = Array.from(classList);
    for (const className of classListArray) {
      if (className.startsWith('language-')) {
          return className.replace(/^language-/, '');
      }
    }
    return undefined;
  }

  public setPluginClass(preElement: HTMLElement, plugin: string | string[]): void {
    const classes = Array.isArray(plugin) ? plugin : [plugin];
    preElement.classList.add(...classes);
    preElement.classList.remove()
  }

  public removePluginClass(preElement: HTMLElement, classToRemove: string): void {
    preElement.classList.remove(classToRemove)
  }

  public setPluginOptions(preElement: HTMLElement, options: { [key: string]: number | string | string[] | undefined }): void {
    Object.keys(options).forEach(option => {
      const attributeValue = options[option];
      if (attributeValue !== undefined) {
        const attributeName = this.toLispCase(option);
        preElement.setAttribute(attributeName, attributeValue.toString());
      }
    });
  }

  private toLispCase(value: string): string {
    const upperChars = value.match(/([A-Z])/g);
    if (!upperChars) {
      return value;
    }
    let str = value.toString();
    for (let i = 0, n = upperChars.length; i < n; i++) {
      str = str.replace(new RegExp(upperChars[i]), '-' + upperChars[i].toLowerCase());
    }
    if (str.slice(0, 1) === '-') {
      str = str.slice(1);
    }
    return str;
  }

  public isObject(value : any) {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  }

  public isSimpleFuncPlugin(func: any): boolean {
    // Check if the item is a function
    return typeof func === 'function';
  }

  public istheRightPluginFuncbyName(func: any, funcName: string): boolean {
    return func.name === funcName;
  }

  public isSimpleFuncPluginbyName(func: any, funcName: string): boolean {
    return typeof func === 'function' && func.name === funcName;
  }
  
  public isArrayPluginbyName(plugin: any, funcName: string): boolean {
    // Check if plugin is an array and if any of its items match the function name
    return Array.isArray(plugin) && plugin.some(item => this.isSimpleFuncPluginbyName(item, funcName));
  }

  public applyPlugins_OptsinFunc(isPluginActive : boolean, PluginList : any[] , pluginIndex : number, pluginOpts? : Record<string, any>| undefined): void {
    if (isPluginActive) {
      // If PluginActive is true and you set New Plugin Options
      if(pluginOpts){
        PluginList[pluginIndex] = [PluginList[pluginIndex],pluginOpts]
      }
    }
    else {
      // If PluginActive is false, remove the Plugin
      PluginList.splice(pluginIndex, 1);
    }
  }

  public applyPlugins_OptsinArray(isPluginActive : boolean, PluginList : any[] , pluginIndex : number, pluginOpts? : Record<string, any> | undefined): void {
    if (isPluginActive) {
      // If PluginActive is true and you set New Plugin Options or update options for the Plugin
      if(pluginOpts){
        this.updateRemark_RehypePluginOptions(PluginList[pluginIndex], pluginOpts);
      }
    }
    else {
      // If PluginActive is false, remove the Plugin
      PluginList.splice(pluginIndex, 1);
    }
  }


  public applyPlugins_OptsinObject(isPluginActive : boolean, pluginName : string ,PluginList : any[] , pluginIndex : number, pluginOpts? : Record<string, any> | undefined): void {
    if (isPluginActive && PluginList[pluginIndex].pluginName === pluginName && pluginOpts) {
      if(PluginList[pluginIndex].pluginOptions){
        PluginList[pluginIndex] = [PluginList[pluginIndex].pluginFunc,{...PluginList[pluginIndex].pluginOptions,...pluginOpts}]
      }
      else{
        PluginList[pluginIndex] = [PluginList[pluginIndex].pluginFunc,pluginOpts]
      }
    }
    else if(isPluginActive && PluginList[pluginIndex].pluginName === pluginName && !pluginOpts){
      if(PluginList[pluginIndex].pluginOptions){
        PluginList[pluginIndex] = [PluginList[pluginIndex].pluginFunc,PluginList[pluginIndex].pluginOptions]
      }
      else{
        PluginList[pluginIndex] = PluginList[pluginIndex].pluginFunc
      }
    }
    else if (!isPluginActive && PluginList[pluginIndex].pluginName === pluginName){
      // If PluginActive is false, remove the Plugin
      PluginList.splice(pluginIndex, 1);
    }
  }

  public disablePlugin(isPluginActive : boolean,PluginList : any , pluginIndex : number): void {
    if (!isPluginActive) {
      PluginList.splice(pluginIndex, 1);
    }
  }

  public updateRemark_RehypePluginOptions(plugin: Array<any>, options: Record<string, any>): void {
    let itUpdated = false;
  
    plugin.forEach((item, index) => {
      if (item !== null && typeof item === 'object' && !Array.isArray(item)) {
        // Merge options into the existing item
        plugin[index] = { ...item, ...options };
        itUpdated = true;
      }
    });
  
    // If no existing item was updated, add the new options
    if (!itUpdated) {
      plugin.push(options);
    }
  }
}
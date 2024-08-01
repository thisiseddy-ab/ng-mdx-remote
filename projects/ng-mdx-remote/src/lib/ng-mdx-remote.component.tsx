import { Component, ElementRef, Input, AfterViewInit, OnChanges, OnDestroy, SimpleChanges,TemplateRef,Type } from '@angular/core';

import { Subscription,EMPTY } from 'rxjs';
import { switchMap } from 'rxjs/operators';


import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import * as mdx from '@mdx-js/react';

import { React_Component,Angular_Custom_Component} from './ng-mdx-remote.types';
import { NgMdxRemoteService} from './ng-mdx-remote.service';
import { SerializeOptions } from './ng-mdx-remote.interfaces';

// Plugin Options
import { KatexOptions } from './plugins/katex-options';
import { MermaidAPI } from './plugins/mermaid-options';
import { PrismPlugin,} from './plugins/prism-plugin';


@Component({
  selector: 'ng-mdx-remote-render',
  templateUrl: './ng-mdx-remote.component.html',
  styleUrls: ['./ng-mdx-remote.component.css'],
})
export class NgMdxRemoteComponent implements AfterViewInit, OnChanges, OnDestroy {

  protected static ngAcceptInputType_clipboard: boolean | '';
  protected static ngAcceptInputType_emoji: boolean | '';
  protected static ngAcceptInputType_katex: boolean | '';
  protected static ngAcceptInputType_mermaid: boolean | '';
  protected static ngAcceptInputType_lineHighlight: boolean | '';
  protected static ngAcceptInputType_lineNumbers: boolean | '';
  protected static ngAcceptInputType_commandLine: boolean | '';

  @Input() source!: string;
  @Input() sourceType: 'string' | 'url' | 'file' = 'string'; 
  @Input() options: SerializeOptions = {};
  @Input() reactComponents: React_Component = {}; 
  @Input() ngComponents: Angular_Custom_Component = {}; 

  // Plugin - clipboard
  @Input()
  get clipboard(): boolean { return this._clipboard; }
  set clipboard(value: boolean) { this._clipboard = this.coerceBooleanProperty(value); }

  @Input() clipboardButtonComponent: Type<unknown> | undefined;
  @Input() clipboardButtonTemplate: TemplateRef<unknown> | undefined;

  // Plugin - emoji
  @Input()
  get emoji(): boolean { return this._emoji; }
  set emoji(value: boolean) { this._emoji = this.coerceBooleanProperty(value); }

  // Plugin - katex
  @Input()
  get katex(): boolean { return this._katex; }
  set katex(value: boolean) { this._katex = this.coerceBooleanProperty(value); }

  @Input() katexOptions: KatexOptions | undefined;

  // Plugin - mermaid
  @Input()
  get mermaid(): boolean { return this._mermaid; }
  set mermaid(value: boolean) { this._mermaid = this.coerceBooleanProperty(value); }

  @Input() mermaidOptions: MermaidAPI.Config | undefined;

  // Plugin - lineHighlight
  @Input()
  get lineHighlight(): boolean { return this._lineHighlight; }
  set lineHighlight(value: boolean) { this._lineHighlight = this.coerceBooleanProperty(value); }

  @Input() line: string | string[] | undefined;
  @Input() lineOffset: number | undefined;

  // Plugin - lineNumbers
  @Input()
  get lineNumbers(): boolean { return this._lineNumbers; }
  set lineNumbers(value: boolean) { this._lineNumbers = this.coerceBooleanProperty(value); }

  @Input() start: number | undefined;

  // Plugin - commandLine
  @Input()
  get commandLine(): boolean { return this._commandLine; }
  set commandLine(value: boolean) { this._commandLine = this.coerceBooleanProperty(value); }

  @Input() filterOutput: string | undefined;
  @Input() host: string | undefined;
  @Input() prompt: string | undefined;
  @Input() output: string | undefined;
  @Input() user: string | undefined;

  private _clipboard = false;
  private _commandLine = false;
  private _disableSanitizer = false;
  private _emoji = false;
  private _inline = false;
  private _katex = false;
  private _lineHighlight = false;
  private _lineNumbers = false;
  private _mermaid = false;

  private reactRoot!: ReactDOM.Root;
  private serializeSubscription = new Subscription();

  

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private mdxService: NgMdxRemoteService
  ) {}

  ngAfterViewInit() {
    if (this.source) {
      // Initialize React rendering after Angular view initialization
      this.reactRoot = ReactDOM.createRoot(this.elementRef.nativeElement);
      
      if (this.ngComponents) {
        this.mdxService.convertNGComponents_FromObject(this.ngComponents)
      }
      
      this.renderMdx();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Re-render if input properties change
    if (changes['source'] || changes['options'] || changes['reactComponents']) {
      this.renderMdx();
    }
    else if(changes['source'] || changes['options'] || changes['reactComponents'] || changes['ngComponents']){
      this.mdxService.convertNGComponents_FromObject(this.ngComponents)
      this.renderMdx();
    }
  }

  ngOnDestroy() {
    // Cleanup React component on Angular component destruction
    if (this.reactRoot) {
      this.reactRoot.unmount();
    }
    // Unsubscribe from the observable to prevent memory leaks
    this.serializeSubscription.unsubscribe();
  }

  private coerceBooleanProperty(value: boolean | ''): boolean {
    return value != null && `${String(value)}` !== 'false';
  }

  private renderMdx(): void {
    if (!this.source) {
      return;
    }

    let serializeObservable;

    switch (this.sourceType) {
      case 'url':
        serializeObservable = this.mdxService.serializeFromUrl(this.source, this.options);
        break;
      case 'file':
        serializeObservable = this.mdxService.serializeFromFile(this.source, this.options);
        break;
      case 'string':
      default:
        serializeObservable = this.mdxService.serializeFromString(this.source, this.options);
        break;
    }

    this.serializeSubscription.add(
      serializeObservable.pipe(
        switchMap(({ compiledSource, scope, frontmatter }) => {
          const fullScope = { ...scope, frontmatter, opts: { ...mdx, jsx, jsxs, Fragment } };
          const keys = Object.keys(fullScope);
          const values = Object.values(fullScope);
          const validSource = `return (function() {${compiledSource}}).apply(null, [opts]);`;
          const hydrateFn = new Function(...keys, validSource);

          // Execute the function to get the React component
          const Content = hydrateFn(...values).default;

        
          // Render the React component into the container
          this.reactRoot.render(
            <React.StrictMode>
              <mdx.MDXProvider components={this.reactComponents}>
                <Content />
              </mdx.MDXProvider>
            </React.StrictMode>
          );
          
          this.applyPlugins();

          return EMPTY;
        })
      ).subscribe({
        error: (error) => {
          
          this.reactRoot.render(
            <React.StrictMode>
              <p style={{ color: 'red', fontWeight: 'bold', fontSize: '35px' }}>
                The rendered content is not a valid React MDX/MD Component.
              </p>
            </React.StrictMode>
          );

          console.error('Error rendering MDX/MD content:', error);
        }
      })
    );
  }

  private applyPlugins(): void {
    if (this.commandLine) {
      this.applyCommandLinePlugin({
        filterOutput: this.filterOutput,
        host: this.host,
        prompt: this.prompt,
        output: this.output,
        user: this.user,
      });
    }

    if (this.lineHighlight) {
      this.applyLineHighlightPlugin({ line: this.line, lineOffset: this.lineOffset });
    }

    if (this.lineNumbers) {
      this.applyLineNumbersPlugin({ start: this.start });
    }

    // Handle other plugins similarly if needed
  }

  private applyCommandLinePlugin(options?: { filterOutput?: string; host?: string; prompt?: string; output?: string; user?: string }): void {
    if (this.commandLine) {
      console.log('Applying CommandLine Plugin with options:', options); // Debugging log
      this.setPluginClass(this.elementRef.nativeElement, PrismPlugin.CommandLine);
      if (options) {
        this.setPluginOptions(this.elementRef.nativeElement, options);
      }
    }
  }

  private applyLineHighlightPlugin(options?: { line?: string | string[]; lineOffset?: number }): void {
    if (this.lineHighlight) {
      console.log('Applying LineHighlight Plugin with options:', options); // Debugging log
      this.setPluginClass(this.elementRef.nativeElement, PrismPlugin.LineHighlight);
      if (options) {
        this.setPluginOptions(this.elementRef.nativeElement, options);
      }
    }
  }

  private applyLineNumbersPlugin(options?: { start?: number }): void {
    if (this.lineNumbers) {
      console.log('Applying LineNumbers Plugin with options:', options); // Debugging log
      this.setPluginClass(this.elementRef.nativeElement, PrismPlugin.LineNumbers);
      if (options && typeof options.start === 'number') {
        const newOptions = {"data-start" : options.start,"tabindex" : 0,"style":`counter-reset: linenumber ${options.start-1}`}
        this.setPluginOptions(this.elementRef.nativeElement, newOptions);
      }
    }
  }

  private setPluginClass(element: HTMLElement, plugin: string | string[]): void {
    const preElements = element.querySelectorAll('pre');
    console.log(preElements)
    const classes = Array.isArray(plugin) ? plugin : [plugin];
    preElements.forEach(preElement => {
      console.log(preElement)
      preElement.classList.add(...classes);
      console.log(`Applied classes ${classes} to pre element`); // Debugging log
    });
  }

  private setPluginOptions(element: HTMLElement, options: { [key: string]: number | string | string[] | undefined }): void {
    const preElements = element.querySelectorAll('pre');
    preElements.forEach(preElement => {
      Object.keys(options).forEach(option => {
        const attributeValue = options[option];
        if (attributeValue !== undefined) {
          const attributeName = this.toLispCase(option);
          preElement.setAttribute(attributeName, attributeValue.toString());
          console.log(`Set attribute ${attributeName} with value ${attributeValue} to pre element`); // Debugging log
        }
      });
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

}
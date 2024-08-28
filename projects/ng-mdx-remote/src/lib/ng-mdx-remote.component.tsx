// Angular Librarys
import { 
  Component, 
  ElementRef, 
  ViewContainerRef,
  Input, 
  AfterViewInit, 
  OnChanges, 
  OnDestroy, 
  SimpleChanges,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import {NgMDXNestedCodeComponent} from './ng-mdx-nested-code.component'

// React Librarys //
import * as ReactDOM from 'react-dom/client';

// Services //
import { NgMdxRemoteService} from './ng-mdx-remote.service';

// Types //
import { React_Component,Angular_Custom_Component} from './ng-mdx-remote.types';

// Interfaces //
import { Input_SerializeOptions,Render_Options} from './ng-mdx-remote.interfaces';

//Plugin Librarys & Options ////
// PrismJS //
import Prism from 'prismjs'
// remark-emoji //
import {RemarkEmojiOptions} from './plugins/remark-emoji-options'
import {PrismPlug_matchBraces_Options,PrismPlug_NormalizeWhitespace_Options,} from './plugins/prism-plugin';
// Rehype Twemoji //
import {RehypeTwemojiOptions} from './plugins/rehype-twemoji-options'
// Rehype katex //
import { KatexOptions } from './plugins/katex-options';
// rehypeMermaid //
import { RehypeMermaidOptions } from './plugins/rehype-mermaid-options';
// clipboard //
import {ClipboardRenderOptions} from './plugins/clipboard-options'



@Component({
  selector: 'ng-mdx-remote-render',
  standalone : true,
  imports: [CommonModule,HttpClientModule],
  providers: [NgMdxRemoteService],
  templateUrl: './ng-mdx-remote.component.html',
  styleUrls: ['./ng-mdx-remote.component.css'],
})
export class NgMdxRemoteComponent implements AfterViewInit, OnChanges, OnDestroy {
  
  protected static ngAcceptInputType_nested_code: boolean | '';
  protected static ngAcceptInputType_clipboard: boolean | '';
  protected static ngAcceptInputType_gemoji: boolean | '';
  protected static ngAcceptInputType_twemoji: boolean | '';
  protected static ngAcceptInputType_katex: boolean | '';
  protected static ngAcceptInputType_mermaid: boolean | '';
  
  // PrismJS Plugin
  protected static ngAcceptInputType_prismjs: boolean | '';
  protected static ngAcceptInputType_line_highlight: boolean | '';
  protected static ngAcceptInputType_line_numbers: boolean | '';
  protected static ngAcceptInputType_command_line: boolean | '';
  protected static ngAcceptInputType_diff_highlight: boolean | '';
  protected static ngAcceptInputType_match_braces : boolean | '';

  @Input() source!: string;
  @Input() sourceType: 'string' | 'url' | 'file' = 'string'; 
  @Input() options: Input_SerializeOptions = {};
  @Input() reactComponents: React_Component = {}; 
  @Input() ngComponents: Angular_Custom_Component = {}; 

  @Input()
  get nested_code(): boolean { return this._nested_code; }
  set nested_code(value: boolean) { this._nested_code = this.coerceBooleanProperty(value); }


  // Plugin - clipboard
  @Input()
  get clipboard(): boolean { return this._clipboard; }
  set clipboard(value: boolean) { this._clipboard = this.coerceBooleanProperty(value); }

  @Input() clipboard_options: ClipboardRenderOptions = {buttonComponent: undefined};
 

  // Plugin - Remark Gemoji
  @Input()
  get gemoji(): boolean { return this._gemoji; }
  set gemoji(value: boolean) { this._gemoji = this.coerceBooleanProperty(value); }

  @Input() gemoji_options:  RemarkEmojiOptions | undefined;

  // Plugin - Rehype Twemoji //

  @Input()
  get twemoji(): boolean { return this._twemoji; }
  set twemoji(value: boolean) { this._twemoji = this.coerceBooleanProperty(value); }

  @Input() twemoji_options:  RehypeTwemojiOptions | undefined;
 
  // Plugin - Rehype katex
  @Input()
  get katex(): boolean { return this._katex; }
  set katex(value: boolean) { this._katex = this.coerceBooleanProperty(value); }

  @Input() katex_options: KatexOptions | undefined;

  // Plugin - rehypeMermaid
  @Input()
  get mermaid(): boolean { return this._mermaid; }
  set mermaid(value: boolean) { this._mermaid = this.coerceBooleanProperty(value); }

  @Input() mermaid_options: RehypeMermaidOptions | undefined;

  // PrismJS (Main) (Actiavte Disable Prismjs with all Plugins)
  @Input()
  get prismjs(): boolean { return this._prismjs; }
  set prismjs(value: boolean) { this._prismjs = this.coerceBooleanProperty(value); }

  // PrismJS Plugin - lineHighlight
  @Input()
  get line_highlight(): boolean { return this._line_highlight; }
  set line_highlight(value: boolean) { this._line_highlight = this.coerceBooleanProperty(value); }

  @Input() line: string | string[] | undefined;
  @Input() line_offset: number | undefined;

  // PrismJS Plugin - lineNumbers
  @Input()
  get line_numbers(): boolean { return this._line_numbers; }
  set line_numbers(value: boolean) { this._line_numbers = this.coerceBooleanProperty(value); }

  @Input() start: number | undefined;

  // PrismJS Plugin - commandLine
  @Input()
  get command_line(): boolean { return this._command_line; }
  set command_line(value: boolean) { this._command_line = this.coerceBooleanProperty(value); }

  @Input() filter_output: string | undefined;
  @Input() host: string | undefined;
  @Input() prompt: string | undefined;
  @Input() output: string | undefined;
  @Input() user: string | undefined;

  // PrismJS Plugin - DiffHighlight 
  @Input()
  get diff_highlight(): boolean { return this._diff_highlight; }
  set diff_highlight(value: boolean) { this._diff_highlight = this.coerceBooleanProperty(value); }

  // PrismJS Plugin - Match Braces

  @Input()
  get match_braces(): boolean { return this._match_braces; }
  set match_braces(value: boolean) { this._match_braces = this.coerceBooleanProperty(value); }

  private _matchBracesOptions: PrismPlug_matchBraces_Options | undefined;
  
  @Input()
  set match_braces_options(value: string | PrismPlug_matchBraces_Options | undefined) {
    if (typeof value === 'string') {
      try {
        this._matchBracesOptions = JSON.parse(value);
      } catch (error) {
        console.error('Invalid JSON string passed to match_braces_options:', error);
        this._matchBracesOptions = undefined; 
      }
    } else {
      this._matchBracesOptions = value;
    }
  }

  get match_braces_options(): PrismPlug_matchBraces_Options | undefined {
    return this._matchBracesOptions;
  }

  // PrismJS Plugin - Normalize Whitespace
  
  private _normalizeWhitespaceOptions: PrismPlug_NormalizeWhitespace_Options | undefined;

  @Input()
  set normalize_whitespace_options(value: string | PrismPlug_NormalizeWhitespace_Options | undefined) {
    if (typeof value === 'string') {
      try {
        this._normalizeWhitespaceOptions = JSON.parse(value);
      } catch (error) {
        console.error('Invalid JSON string passed to normalize_whitespace_options:', error);
        this._normalizeWhitespaceOptions = undefined; // Reset to undefined on error
      }
    } else {
      this._normalizeWhitespaceOptions = value;
    }
  }

  get normalize_whitespace_options(): PrismPlug_NormalizeWhitespace_Options | undefined {
    return this._normalizeWhitespaceOptions;
  }

  // Remark-Rehype Plugins //
  private _nested_code = false;
  private _clipboard = false;
  private _gemoji = false;
  private _twemoji = false;
  private _katex = false;
  private _mermaid = false;

  // PrismJS Plugin
  private _prismjs = false;
  private _line_highlight = false;
  private _line_numbers = false;
  private _command_line = false;
  private _diff_highlight = false;
  private _match_braces = false;

  private reactRoot!: ReactDOM.Root;
  private isFirstChange = true;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    public viewContainerRef: ViewContainerRef,
    private mdxService: NgMdxRemoteService
  ) {}

  async ngAfterViewInit() {
    if (this.source) {
      this.reactRoot = ReactDOM.createRoot(this.elementRef.nativeElement);

      if (this.ngComponents) {
        if(this.nested_code){
          this.ngComponents = {
            ...this.ngComponents,
            ...{"ng-mdx-nested-code" : NgMDXNestedCodeComponent}
          }
        }
        this.mdxService.convertNGComponents_FromObject(this.ngComponents);
      }
      await this.mdxService.renderMdx(this.source, this.sourceType, this.reactRoot, this.elementRef, this.viewContainerRef, this.options , this.createRenderOptions(), this.reactComponents);
    }
  }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if (this.isFirstChange) {
        this.isFirstChange = false;
        return;
    }

    if (changes['source'] || changes['options'] || changes['reactComponents']) {
        try {
          await this.mdxService.renderMdx(this.source, this.sourceType, this.reactRoot, this.elementRef, this.viewContainerRef, this.options , this.createRenderOptions(), this.reactComponents);
        } catch (error) {
            console.error('Error rendering MDX:', error);
        }
    } else if (changes['ngComponents']) {
        try {
            this.mdxService.convertNGComponents_FromObject(this.ngComponents);
            await this.mdxService.renderMdx(this.source, this.sourceType, this.reactRoot, this.elementRef, this.viewContainerRef, this.options , this.createRenderOptions(), this.reactComponents);
        } catch (error) {
            console.error('Error converting NG components or rendering MDX:', error);
        }
    }
  }

  ngOnDestroy() {
    if (this.reactRoot) {
      this.reactRoot.unmount();
    }
  }

  private coerceBooleanProperty(value: boolean | ''): boolean {
    return value != null && `${String(value)}` !== 'false';
  }

  private createRenderOptions(): Render_Options {
    return {
      clipboard : this.clipboard,
      clipboard_options : this.clipboard_options,
      gemoji : this.gemoji,
      gemoji_options : this.gemoji_options,
      twemoji : this.twemoji,
      twemoji_options : this.twemoji_options,
      katex : this.katex,
      katex_options : this.katex_options,
      mermaid : this.mermaid,
      mermaid_options : this.mermaid_options,
      prismjs : this.prismjs,
      line_highlight: this.line_highlight,
      line_highlight_options: { line: this.line, lineOffset: this.line_offset },
      line_numbers: this.line_numbers,
      line_numbers_options: { start: this.start },
      command_line: this.command_line,
      command_line_options: {
          filter_output: this.filter_output,
          host: this.host,
          prompt: this.prompt,
          output: this.output,
          user: this.user,
      },
      diff_highlight: this.diff_highlight,
      match_braces: this.match_braces,
      match_braces_options: this.match_braces_options,
      normalize_whitespace_options: this.normalize_whitespace_options,
    }
  }
}


// Angular Librarys
import { 
    Component, 
    ElementRef, 
    Input, 
    AfterViewInit,  
    ChangeDetectorRef,

  } from '@angular/core';
  
  import { CommonModule } from '@angular/common';
  
  // Services //
  import { NgMdxRemoteService} from './ng-mdx-remote.service';
  
  // Interfaces //
  import {Nested_Code_Render_Options} from './ng-mdx-remote.interfaces';
  
  //Plugin Librarys & Options ////
  // PrismJS //
  import Prism from 'prismjs'
  // remark-emoji //
  import {PrismPlug_matchBraces_Options,PrismPlug_NormalizeWhitespace_Options,} from './plugins/prism-plugin';
  
  @Component({
    selector: 'ng-mdx-nested-code',
    standalone : true,
    imports: [CommonModule],
    providers: [NgMdxRemoteService],
    templateUrl: './ng-mdx-nested-code.component.html',
    styleUrls: ['./ng-mdx-nested-code.component.css'],
  })
  export class NgMDXNestedCodeComponent implements AfterViewInit{

    // PrismJS Plugin
    protected static ngAcceptInputType_prismjs: boolean | '';
    protected static ngAcceptInputType_line_highlight: boolean | '';
    protected static ngAcceptInputType_line_numbers: boolean | '';
    protected static ngAcceptInputType_command_line: boolean | '';
    protected static ngAcceptInputType_diff_highlight: boolean | '';
    protected static ngAcceptInputType_match_braces : boolean | '';
  
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
  
    // PrismJS Plugin
    private _prismjs = false;
    private _line_highlight = false;
    private _line_numbers = false;
    private _command_line = false;
    private _diff_highlight = false;
    private _match_braces = false;

    constructor(
      private elementRef: ElementRef<HTMLElement>,
      private mdxService: NgMdxRemoteService,
      private cdr: ChangeDetectorRef,
    ) {
    }

    ngAfterViewInit(){
      this.cdr.detectChanges();
      if(this.prismjs){
        this.applyPrismJS();
      }
    }

    private coerceBooleanProperty(value: boolean | ''): boolean {
      return value != null && `${String(value)}` !== 'false';
    }

    private createRenderOptions(): Nested_Code_Render_Options {
      return {
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
      };
  }

    private applyPrismJS() {
      
      const PreElement = this.elementRef.nativeElement.querySelector('pre');
      const CodeElement = PreElement?.querySelector('code');
      
      if (PreElement && CodeElement) {
        
        const lang = this.mdxService.getCodeLanguage(PreElement);   
        
        if (lang) {
          PreElement.classList.add(`language-${lang}`);
          PreElement.classList.add('nested-code-block-pre');  
          
          this.mdxService.applyPrismPlugins(PreElement,this.createRenderOptions())
          Prism.highlightElement(CodeElement);
        }
      }
    }
}
  
  
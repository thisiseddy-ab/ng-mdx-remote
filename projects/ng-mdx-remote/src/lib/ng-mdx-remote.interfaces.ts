
import {CompileOptions } from '@mdx-js/mdx';
import { PluggableList } from 'unified';

import {ClipboardRenderOptions} from './plugins/clipboard-options'
import {RemarkEmojiOptions} from './plugins/remark-emoji-options'
import {RehypeTwemojiOptions} from './plugins/rehype-twemoji-options'
import {KatexOptions} from './plugins/katex-options'
import {RehypeMermaidOptions} from './plugins/rehype-mermaid-options'
import {
  PrismPlug_matchBraces_Options,
  PrismPlug_NormalizeWhitespace_Options } 
  from './plugins/prism-plugin'

import {MDXFormat} from './ng-mdx-remote.types'

export interface NG_Remote_MDX_Plugin_Obj {
  pluginName: string;
  pluginFunc: (...args: any[]) => any; // Generic callable signature
  pluginOptions?: Record<string, any>;
}


export interface Input_SerializeOptions {
    scope?: Record<string, unknown>;
    mdxOptions?: Omit<CompileOptions, 'outputFormat' | 'providerImportSource'> | & {
      useDynamicImport?: boolean;
      format?: MDXFormat;
      remarkPlugins?: PluggableList | NG_Remote_MDX_Plugin_Obj[] | null | undefined
      rehypePlugins?: PluggableList | NG_Remote_MDX_Plugin_Obj[] | null | undefined
    };
    parseFrontmatter?: boolean;
}

export interface Compile_SerializeOptions {
  scope?: Record<string, unknown>;
  mdxOptions?: Omit<CompileOptions, 'outputFormat' | 'providerImportSource'> | & {
    useDynamicImport?: boolean;
    format?: MDXFormat;
    remarkPlugins?: PluggableList | null | undefined
    rehypePlugins?: PluggableList | null | undefined
  };
  parseFrontmatter?: boolean;
}

export interface MDXRemoteSerializeResult<TScope = Record<string, unknown>, TFrontmatter = Record<string, unknown>> {
  compiledSource: string;
  scope: TScope;
  frontmatter: TFrontmatter;
}

export interface Render_Options {
  clipboard : boolean;
  clipboard_options? : ClipboardRenderOptions;
  gemoji : boolean;
  gemoji_options? : RemarkEmojiOptions;
  twemoji : boolean;
  twemoji_options? : RehypeTwemojiOptions;
  katex : boolean;
  katex_options? : KatexOptions;
  mermaid : boolean;
  mermaid_options? : RehypeMermaidOptions;
  prismjs : boolean;
  line_highlight : boolean;
  line_highlight_options? : {line? : string | string[], lineOffset? : number};
  line_numbers : boolean;
  line_numbers_options? : {start? : number};
  command_line : boolean;
  command_line_options? : {
    filter_output? : string,
    host? : string,
    prompt? : string,
    output?: string,
    user? : string,
  },
  diff_highlight : boolean,
  match_braces : boolean,
  match_braces_options? : PrismPlug_matchBraces_Options,
  normalize_whitespace_options? : PrismPlug_NormalizeWhitespace_Options
}

export interface Nested_Code_Render_Options {
  line_highlight : boolean;
  line_highlight_options? : {line? : string | string[], lineOffset? : number};
  line_numbers : boolean;
  line_numbers_options? : {start? : number};
  command_line : boolean;
  command_line_options? : {
    filter_output? : string,
    host? : string,
    prompt? : string,
    output?: string,
    user? : string,
  },
  diff_highlight : boolean,
  match_braces : boolean,
  match_braces_options? : PrismPlug_matchBraces_Options,
  normalize_whitespace_options? : PrismPlug_NormalizeWhitespace_Options
}





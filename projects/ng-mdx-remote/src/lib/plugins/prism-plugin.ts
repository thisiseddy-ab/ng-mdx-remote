import {BasePluginOptions} from './BaseOptions'

export enum PrismPlugin {
  CommandLine = 'command-line',
  DiffHighlight = 'diff-highlight',
  LineHighlight = 'line-highlight',
  LineNumbers = 'line-numbers',
  MatchBraces = "match-braces",
}


export interface PrismPlug_CommandLine_Options {
  [key: string]: string | undefined;
  'data-filterOutput'?: string;
  'data-host'?: string;
  'data-prompt'?: string;
  'data-output'?: string;
  'data-user'?: string;
}

export interface PrismPlug_LineHighlight_Options {
  [key: string]: string | number | string[] | undefined;
  'data-line'?: string | string[];
  'data-lineOffset'?: number;
}

export interface PrismPlug_matchBraces_Options {
  'rainbow-braces'?: boolean; 
  'no-brace-hover'?: boolean; 
  'no-brace-select'?: boolean;
}

export interface PrismPlug_NormalizeWhitespace_Options {
  "remove-trailing"?: boolean;
  "remove-indent"?: boolean;
  "left-trim"?: boolean;
  "right-trim"?: boolean;
  "break-lines"?: number;
  "indent"?: number;
  "remove-initial-line-feed"?: boolean;
  "tabs-to-spaces"?: number;
  "spaces-to-tabs"?: number;
}

import {BasePluginOptions} from './BaseOptions'

export enum PrismPlugin {
  CommandLine = 'command-line',
  LineHighlight = 'line-highlight',
  LineNumbers = 'line-numbers',
}

export interface CommandLine_Options extends BasePluginOptions {
  filterOutput?: string;
  host?: string;
  prompt?: string;
  output?: string;
  user?: string;
}

export interface LineHighlight_Options extends BasePluginOptions {
  line?: string | string[];
  lineOffset?: number;
}

export interface LineNumbers_Options extends BasePluginOptions {
  start?: number;
}
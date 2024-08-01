
import {CompileOptions } from '@mdx-js/mdx';

import {MDXFormat} from './ng-mdx-remote.types'


export interface SerializeOptions {
    scope?: Record<string, unknown>;
    mdxOptions?: Omit<CompileOptions, 'outputFormat' | 'providerImportSource'> & {
      useDynamicImport?: boolean;
      format?: MDXFormat;
    };
    parseFrontmatter?: boolean;
  }

export interface MDXRemoteSerializeResult<TScope = Record<string, unknown>, TFrontmatter = Record<string, unknown>> {
  compiledSource: string;
  scope: TScope;
  frontmatter: TFrontmatter;
}
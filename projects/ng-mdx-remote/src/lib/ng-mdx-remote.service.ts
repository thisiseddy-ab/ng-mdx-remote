import { Injectable, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { HttpClient } from '@angular/common/http';

import { Observable, from } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

import { compile, CompileOptions } from '@mdx-js/mdx';
import { VFile} from 'vfile';
import { matter } from 'vfile-matter';

import {Angular_Custom_Component} from './ng-mdx-remote.types';
import { SerializeOptions, MDXRemoteSerializeResult } from './ng-mdx-remote.interfaces';



@Injectable({
  providedIn: 'root',
})
export class NgMdxRemoteService {
  
  constructor(private injector: Injector, private http: HttpClient) {}

  public serializeFromString<TScope = Record<string, unknown>, TFrontmatter = Record<string, unknown>>(
    source: string,
    options: SerializeOptions = {}
  ): Observable<MDXRemoteSerializeResult<TScope, TFrontmatter>> {
    return this.serialize<TScope, TFrontmatter>(new VFile(source), options);
  }

  public serializeFromUrl<TScope = Record<string, unknown>, TFrontmatter = Record<string, unknown>>(
    url: string,
    options: SerializeOptions = {}
  ): Observable<MDXRemoteSerializeResult<TScope, TFrontmatter>> {
    return from(fetch(url).then(response => response.text()).then(content => new VFile(content))).pipe(
      switchMap(vfile => this.serialize<TScope, TFrontmatter>(vfile, options))
    );
  }

  public serializeFromFile<TScope = Record<string, unknown>, TFrontmatter = Record<string, unknown>>(
    filePath: string,
    options: SerializeOptions = {}
  ): Observable<MDXRemoteSerializeResult<TScope, TFrontmatter>> {
    return this.http.get(filePath, { responseType: 'text' }).pipe(
      map(content => new VFile(content)),
      switchMap(vfile => this.serialize<TScope, TFrontmatter>(vfile, options)),
      catchError((error: any) => {
        throw new Error(error instanceof Error ? `Error fetching MDX content: ${error.message}` : 'An unknown error occurred while fetching MDX content');
      })
    );
  }

  private serialize<TScope = Record<string, unknown>, TFrontmatter = Record<string, unknown>>(
    vfile: VFile,
    options: SerializeOptions = {}
  ): Observable<MDXRemoteSerializeResult<TScope, TFrontmatter>> {
    if (options.parseFrontmatter) {
      matter(vfile, { strip: true });
    }

    const compileOptions: CompileOptions = {
      ...options.mdxOptions,
      outputFormat: 'function-body',
      providerImportSource: '@mdx-js/react',
    };

    return from(compile(vfile, compileOptions)).pipe(
      map((compiledMdx: VFile) => {
        const compiledSource = String(compiledMdx);
        return {
          compiledSource,
          frontmatter: (vfile.data["matter"] ?? {}) as TFrontmatter,
          scope: options.scope as TScope,
        };
      }),
      catchError((error: any) => {
        throw new Error(error instanceof Error ? `Error compiling MDX: ${error.message}` : 'An unknown error occurred while compiling MDX');
      })
    );
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

  public convertNGComponents_FromObject(components : Angular_Custom_Component): void {
    const componentArray = Object.keys(components).map(tagName => ({
      component: components[tagName],
      tagName
    }));
    this.convertNGComponents_FromArray(componentArray);
  }
}
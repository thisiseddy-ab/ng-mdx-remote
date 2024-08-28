import { Component} from '@angular/core';

import { NgMdxRemoteModule, Input_SerializeOptions} from 'ng-mdx-remote';

import {KatexOptions} from 'ng-mdx-remote';
import rehypeKatex from 'rehype-katex';

@Component({
  selector: 'ex-012',
  standalone: true,
  imports: [NgMdxRemoteModule],
  templateUrl: './ex-012.component.html',
  styleUrls: ['./ex-012.component.css'],
})
export class EX_012_Component  {


  mdxOptions: Input_SerializeOptions = {
    scope: {},
    mdxOptions: {
      remarkPlugins: [
      ], 
      rehypePlugins: [
        {pluginName: 'rehypeKatex', pluginFunc: rehypeKatex, pluginOptions: {displayMode : false, output : "mathml",throwOnError : true, } satisfies KatexOptions},
      ],
      format: 'mdx',
      development: false
    },
    parseFrontmatter: true,
  };

  reactComponents = {
  };

  ngComponents = {
  };
}
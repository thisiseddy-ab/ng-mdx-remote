import { Component} from '@angular/core';

import { NgMdxRemoteModule, Input_SerializeOptions} from 'ng-mdx-remote';

import {RehypeMermaidOptions} from 'ng-mdx-remote';
import rehypeMermaid from 'rehype-mermaid'

@Component({
  selector: 'ex-013',
  standalone: true,
  imports: [NgMdxRemoteModule],
  templateUrl: './ex-013.component.html',
  styleUrls: ['./ex-013.component.css'],
})
export class EX_013_Component  {


  mdxOptions: Input_SerializeOptions = {
    scope: {},
    mdxOptions: {
      remarkPlugins: [
      ], 
      rehypePlugins: [
        {pluginName: 'rehypeMermaid', pluginFunc: rehypeMermaid, pluginOptions: {strategy: 'inline-svg'} satisfies RehypeMermaidOptions},
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
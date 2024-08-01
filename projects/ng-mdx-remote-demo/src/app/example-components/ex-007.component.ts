import { Component, OnInit } from '@angular/core';

import { NgMdxRemoteModule, SerializeOptions } from 'ng-mdx-remote';

import rehypeKatex from 'rehype-katex';

import rehypePrism from 'rehype-prism'

@Component({
  selector: 'ex-007',
  standalone: true,
  imports: [NgMdxRemoteModule],
  templateUrl: './ex-007.component.html',
  styleUrls: ['./ex-007.component.css'],
})
export class EX_007_Component  {


  mdxOptions: SerializeOptions = {
    scope: {},
    mdxOptions: {
      remarkPlugins: [
      ], 
      rehypePlugins: [
        [rehypeKatex],
        [rehypePrism, {plugins: ['line-numbers'] }]
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
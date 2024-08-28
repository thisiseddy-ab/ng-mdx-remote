import { Component} from '@angular/core';

import { NgMdxRemoteModule, Input_SerializeOptions} from 'ng-mdx-remote';

import {RehypeTwemojiOptions} from 'ng-mdx-remote';

import remarkGemoji from 'remark-gemoji'
import { rehypeTwemoji } from 'rehype-twemoji'


@Component({
  selector: 'ex-011',
  standalone: true,
  imports: [NgMdxRemoteModule],
  templateUrl: './ex-011.component.html',
  styleUrls: ['./ex-011.component.css'],
})
export class EX_011_Component  {


  mdxOptions: Input_SerializeOptions = {
    scope: {},
    mdxOptions: {
      remarkPlugins: [
        {pluginName: 'remarkGemoji', pluginFunc: remarkGemoji}
      ], 
      rehypePlugins: [
        {pluginName: 'rehypeTwemoji', pluginFunc: rehypeTwemoji, pluginOptions: {format: 'svg',source: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest'} satisfies RehypeTwemojiOptions},
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
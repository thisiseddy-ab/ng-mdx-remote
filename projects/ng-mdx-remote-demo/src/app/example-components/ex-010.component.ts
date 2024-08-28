import { Component} from '@angular/core';

import { NgMdxRemoteModule, Input_SerializeOptions} from 'ng-mdx-remote';

import remarkGemoji from 'remark-gemoji'


@Component({
  selector: 'ex-010',
  standalone: true,
  imports: [NgMdxRemoteModule],
  templateUrl: './ex-010.component.html',
  styleUrls: ['./ex-010.component.css'],
})
export class EX_010_Component  {


  mdxOptions: Input_SerializeOptions = {
    scope: {},
    mdxOptions: {
      remarkPlugins: [
        {pluginName: 'remarkGemoji', pluginFunc: remarkGemoji}
      ], 
      rehypePlugins: [
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
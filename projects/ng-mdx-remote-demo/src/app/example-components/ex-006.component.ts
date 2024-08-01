import { Component,} from '@angular/core';

import {NgMdxRemoteModule,SerializeOptions} from 'ng-mdx-remote'

import { MarkdownModule } from 'ngx-markdown';


@Component({
  selector: 'ex-006',
  standalone: true,
  imports: [MarkdownModule],
  templateUrl: './ex-006.component.html',
  styleUrl: './ex-006.component.css',
})
export class EX_006_Component {
  
  mdxOptions: SerializeOptions = {
    scope: {},
    mdxOptions: {
      remarkPlugins: [
      ], 
      rehypePlugins: [
      ],
      format: 'mdx',
      development: false
    },
    parseFrontmatter: true,
  };

  reactComponents = {
  }

  ngComponents = {
  }
}
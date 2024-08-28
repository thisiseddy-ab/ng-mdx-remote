import { Component,} from '@angular/core';

import {NgMdxRemoteModule,Input_SerializeOptions} from 'ng-mdx-remote'


@Component({
  selector: 'ex-001',
  standalone: true,
  imports: [NgMdxRemoteModule],
  templateUrl: './ex-001.component.html',
  styleUrl: './ex-001.component.css',
})
export class EX_001_Component {
  
  mdxOptions: Input_SerializeOptions = {
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
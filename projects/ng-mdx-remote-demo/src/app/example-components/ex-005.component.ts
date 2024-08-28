import { Component,} from '@angular/core';

import {NgMdxRemoteModule,Input_SerializeOptions} from 'ng-mdx-remote'


@Component({
  selector: 'ex-005',
  standalone: true,
  imports: [NgMdxRemoteModule],
  templateUrl: './ex-005.component.html',
  styleUrl: './ex-005.component.css',
})
export class EX_005_Component {
  
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
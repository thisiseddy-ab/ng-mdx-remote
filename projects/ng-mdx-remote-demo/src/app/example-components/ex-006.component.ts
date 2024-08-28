import { Component,} from '@angular/core';

import {NgMdxRemoteModule,Input_SerializeOptions} from 'ng-mdx-remote'


@Component({
  selector: 'ex-005',
  standalone: true,
  imports: [NgMdxRemoteModule],
  templateUrl: './ex-006.component.html',
  styleUrl: './ex-006.component.css',
})
export class EX_006_Component {
  
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
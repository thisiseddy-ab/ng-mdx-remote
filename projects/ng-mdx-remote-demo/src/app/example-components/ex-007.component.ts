import { Component} from '@angular/core';

import { NgMdxRemoteModule, Input_SerializeOptions} from 'ng-mdx-remote';


@Component({
  selector: 'ex-007',
  standalone: true,
  imports: [NgMdxRemoteModule],
  templateUrl: './ex-007.component.html',
  styleUrls: ['./ex-007.component.css'],
})
export class EX_007_Component  {


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
  };

  ngComponents = {
  };
}
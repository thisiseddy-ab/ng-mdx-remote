import { Component} from '@angular/core';

import { NgMdxRemoteModule, Input_SerializeOptions} from 'ng-mdx-remote';


@Component({
  selector: 'ex-009',
  standalone: true,
  imports: [NgMdxRemoteModule],
  templateUrl: './ex-009.component.html',
  styleUrls: ['./ex-009.component.css'],
})
export class EX_009_Component  {


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
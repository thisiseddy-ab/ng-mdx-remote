import { Component} from '@angular/core';

import { NgMdxRemoteModule, Input_SerializeOptions} from 'ng-mdx-remote';


@Component({
  selector: 'ex-008',
  standalone: true,
  imports: [NgMdxRemoteModule],
  templateUrl: './ex-008.component.html',
  styleUrls: ['./ex-008.component.css'],
})
export class EX_008_Component  {


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
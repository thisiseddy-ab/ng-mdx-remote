import { Component } from '@angular/core';

import {NgMdxRemoteModule,Input_SerializeOptions} from 'ng-mdx-remote'

@Component({
  selector: 'home-main',
  standalone: true,
  imports: [NgMdxRemoteModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeMainComponent {

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

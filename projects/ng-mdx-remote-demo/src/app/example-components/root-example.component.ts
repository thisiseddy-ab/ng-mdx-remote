import { Component} from '@angular/core';

import {NgMdxRemoteModule,SerializeOptions} from 'ng-mdx-remote'


@Component({
  selector: 'root-example',
  standalone: true,
  imports: [NgMdxRemoteModule],
  templateUrl: './root-example.component.html',
  styleUrl: './root-example.component.css',
})
export class RootExampleComponent {
  
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
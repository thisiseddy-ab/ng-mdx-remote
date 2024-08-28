import { Component,} from '@angular/core';

import {NgMdxRemoteModule,Input_SerializeOptions} from 'ng-mdx-remote'

import { ng_GreetingComponent } from '../ng-mdx-components/ng-Greeting.component';
import { ng_ButtonComponent } from '../ng-mdx-components/ng-button.component';
import { ng_InfoCardComponent } from '../ng-mdx-components/ng-info-card.component';
import { ng_AlertBoxComponent } from '../ng-mdx-components/ng-alert-box.component';


@Component({
  selector: 'ex-003',
  standalone: true,
  imports: [NgMdxRemoteModule],
  templateUrl: './ex-003.component.html',
  styleUrl: './ex-003.component.css',
})
export class EX_003_Component {
  
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
    "ng-greeting" : ng_GreetingComponent,
    "ng-button" : ng_ButtonComponent,
    "ng-info-card" : ng_InfoCardComponent,
    "ng-alert-box" : ng_AlertBoxComponent,
  }
}
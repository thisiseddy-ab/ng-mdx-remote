import { Component} from '@angular/core';

import {NgMdxRemoteModule,Input_SerializeOptions} from 'ng-mdx-remote'

import Greeting from '../rc-mdx-components/Greeting'
import Button from '../rc-mdx-components/Button'
import AlertBox from '../rc-mdx-components/AlertBox'
import InfoCard from '../rc-mdx-components/InfoCard'

type ReactComponents = {
  [key: string]: React.ComponentType<any>;
};


@Component({
  selector: 'ex-002',
  standalone: true,
  imports: [NgMdxRemoteModule],
  templateUrl: './ex-002.component.html',
  styleUrl: './ex-002.component.css',
})
export class EX_002_Component {
  
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

  reactComponents : ReactComponents = {
    Greeting : Greeting,
    Button : Button,
    AlertBox : AlertBox,
    InfoCard : InfoCard
  }

  ngComponents = {
  }
}
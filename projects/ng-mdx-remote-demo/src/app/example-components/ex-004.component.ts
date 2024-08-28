import { Component,} from '@angular/core';

import {NgMdxRemoteModule,Input_SerializeOptions} from 'ng-mdx-remote'

// React Componetns
import Greeting from '../rc-mdx-components/Greeting'
import Button from '../rc-mdx-components/Button'
import AlertBox from '../rc-mdx-components/AlertBox'
import InfoCard from '../rc-mdx-components/InfoCard'

// Angualr Components
import { ng_GreetingComponent } from '../ng-mdx-components/ng-Greeting.component';
import { ng_ButtonComponent } from '../ng-mdx-components/ng-button.component';
import { ng_InfoCardComponent } from '../ng-mdx-components/ng-info-card.component';
import { ng_AlertBoxComponent } from '../ng-mdx-components/ng-alert-box.component';

type ReactComponents = {
  [key: string]: React.ComponentType<any>;
};


@Component({
  selector: 'ex-004',
  standalone: true,
  imports: [NgMdxRemoteModule],
  templateUrl: './ex-004.component.html',
  styleUrl: './ex-004.component.css',
})
export class EX_004_Component {
  
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
    "ng-greeting" : ng_GreetingComponent,
    "ng-button" : ng_ButtonComponent,
    "ng-info-card" : ng_InfoCardComponent,
    "ng-alert-box" : ng_AlertBoxComponent,
  }
}
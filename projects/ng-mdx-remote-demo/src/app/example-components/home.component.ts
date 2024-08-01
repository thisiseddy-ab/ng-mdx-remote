import { Component } from '@angular/core';

import {ExampleCardCompoent} from '../card/ex-card.component'

@Component({
  selector: 'home-main',
  standalone: true,
  imports: [ExampleCardCompoent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeMainComponent {

  exampleList = [
    {
      Id : "1",
      Title : "Introduction to MDX: Combining Markdown and JSX",
      Description : "Welcome to this comprehensive guide on MDX, a powerful tool that merges Markdown with JSX. This document will walk you through the essential features of MDX, including how to write Markdown content, embed JSX components, and integrate dynamic elements into your documentation. "
    },
    {
      Id : "2",
      Title : "Introduction to Using React Components in MDX",
      Description : "MDX allows you to seamlessly integrate React components with Markdown content, enabling you to create rich, interactive documents. This guide will explain how to use React components within MDX and provide examples of custom components you can incorporate into your MDX files."
    },
    {
      Id : "3",
      Title : "Integrating Angular Components with Markdown",
      Description : "Angular components can be integrated into Markdown content by converting them into custom web components. This guide explains how to use Angular components within Markdown and provides examples of how to set it up."
    }
  ]

}

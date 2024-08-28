import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ExampleCardCompoent} from '../card/ex-card.component'

@Component({
  selector: 'examples-main',
  standalone: true,
  imports: [CommonModule,ExampleCardCompoent],
  templateUrl: './examples.component.html',
  styleUrl: './examples.component.css'
})
export class ExamplesComponent {

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
    },
    {
      Id : "4",
      Title : "Integrating Angular and React Components with Markdown",
      Description : "Integrating Angular and React components into Markdown (MDX) content allows for creating rich, interactive documents. This guide explains how to use Angular and React components within Markdown and provides examples to set it up."
    },
    {
      Id : "5",
      Title : "Use Build-in PrismJS",
      Description : "PrismJS is a versatile and lightweight syntax highlighting library designed to enhance the readability and presentation of code snippets within web applications. Its primary function is to provide visually distinct formatting for different programming languages, making code easier to read and understand, especially in documentation, blogs, tutorials, and developer tools."
    },
    {
      Id : "6",
      Title : "Use PrismJS Plugins",
      Description : "Plugins in PrismJS are powerful additional scripts and stylesheets (CSS) that extend the core functionality of the library, providing a wide array of features that enhance how code snippets are displayed and interacted with. These plugins are designed to be modular, meaning you can choose to include only the ones that are relevant to your needs, keeping the Prism Core lightweight and optimized for performance."
    },
    {
      Id : "7",
      Title : "Using PrismJS Nested Code Block",
      Description : "Incorporate advanced syntax highlighting and customizations into your MDX files by utilizing PrismJS nested code blocks. This feature allows you to fine-tune the appearance and functionality of code blocks within your documentation or content, offering enhanced control over syntax highlighting and code presentation."
    },
    {
      Id : "8",
      Title : "Using the Built-In Clipboard Plugin for Code Blocks",
      Description : "The built-in Clipboard plugin offers a streamlined way to enhance your documentation or web applications by adding copy-to-clipboard functionality to your code blocks. This feature allows users to easily copy code snippets with a single click, improving usability and accessibility. Whether you are working with markdown components or directives, integrating the Clipboard plugin is straightforward and provides a seamless user experience."
    },
   {
      Id : "9",
      Title : "Use remark and rehype Plugins",
      Description : "Incorporating Remark and Rehype plugins into your MDX (Markdown for JSX) workflow provides powerful tools for transforming and enhancing your Markdown content. These plugins offer extensive customization options for parsing and manipulating your Markdown and HTML content, enabling you to tailor your documentation or blog posts to meet your specific needs."
    },
    {
      Id : "10",
      Title : "Usin Remark Gemoji Plugin",
      Description : "The remark-gemoji plugin is a powerful tool for enhancing Markdown content by automatically converting GitHub-style emoji shortcodes into their corresponding emoji characters. This plugin is part of the Remark ecosystem, a collection of tools for parsing, transforming, and serializing Markdown. With remark-gemoji, you can easily add expressive and visually engaging emojis to your Markdown documents using simple text-based codes."
    },
    {
      Id : "11",
      Title : "Usin Rehype Twemoji Plugin",
      Description : "The rehype-twemoji plugin is a powerful tool within the Rehype ecosystem that enhances HTML content by transforming standard Unicode emojis into Twitter-style emoji images (SVG or PNG). This plugin allows you to maintain a consistent, high-quality emoji appearance across all platforms, making your content visually appealing and easily recognizable."
    },
    {
      Id : "12",
      Title : "Usin Rehype Katex Plugin",
      Description : "The rehype-katex plugin is a powerful tool that enables the rendering of LaTeX math equations in HTML content. By integrating this plugin into your Rehype processing pipeline, you can seamlessly convert LaTeX math expressions within your Markdown or HTML files into beautifully formatted mathematical notation, using the popular KaTeX library."
    },
    {
      Id : "13",
      Title : "Usin Rehype Mermaid Plugin",
      Description : "The Mermaid plugin is a powerful tool that enables the creation of diagrams and flowcharts directly within Markdown or HTML content. By integrating this plugin into your workflow, you can seamlessly convert text-based descriptions of diagrams into beautifully rendered visualizations. This is particularly useful for documentation, technical writing, and any content where clear, concise diagrams can enhance understanding."
    },
  ]

}

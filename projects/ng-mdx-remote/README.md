# Introduction

**ng-mdx-remote** ***(Angular MDX Remote)*** is inspired from [**next-mdx-remote**](https://github.com/hashicorp/next-mdx-remote) and [**ngx-markdown**](https://github.com/jfcere/ngx-markdown), designed to bring the power and flexibility of MDX to Angular applications. With ng-mdx-remote, you can seamlessly integrate MDX content into your Angular projects, enabling rich, interactive documentation and content-driven applications.

Although this library allows you to leverage MDX within Angular, it is important to note for now that it still utilizes React under the hood. Therefore, it effectively creates a hybrid Angular/React environment, combining the best of both worlds.

### Key Features

- **MDX Integration**: Write your content in MDX and use it directly in your Angular components.
- **Hybrid Approach**: Combines Angular's robust framework with React's powerful rendering capabilities.
- **Ease of Use**: Simple APIs to serialize and render MDX content within Angular components.

### Why Use ng-mdx-remote?

Integrating MDX into Angular applications opens up a plethora of possibilities for creating interactive and rich content. Whether you are building documentation sites, blogs, or content-driven applications, ng-mdx-remote offers a streamlined way to bring the dynamic capabilities of MDX to your Angular projects.

## Installation

First we need to install the **ng-mdx-remote** from GitHub Releaseas (no NPM Package for Now).

```bash
# npm install https://github.com/thisiseddy-ab/ng-mdx-remote/releases/download/tag-name/file-name.tgz
npm install https://github.com/thisiseddy-ab/ng-mdx-remote/releases/download/v1.0.0/ng-mdx-remote-1.0.0.tgz 
```

Second we need to install this React and Mdx Packages ***npm install react react-dom @mdx-js/mdx @mdx-js/react vfile vfile-matter prismjs clipboard***.

```bash
npm install react react-dom @mdx-js/mdx @mdx-js/react vfile vfile-matter prismjs clipboard
```
Import ***NgMdxRemoteModule, SerializeOptions,*** somewhere where you need to Render, for me is the **app.component**, see the code in that component:

#### app.component.html

sourceType can be string,url,file

```html
<ng-mdx-remote-render [source]="mdxContent" sourceType="string" [options]="mdxOptions" ></ng-mdx-remote-render>
```

#### app.component.ts

```typescript
import {NgMdxRemoteModule,Input_SerializeOptions} from 'ng-mdx-remote'

@Component({
  selector: 'app-root',
  standalone: true,
  
  imports: [RouterOutlet,NgMdxRemoteModule],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
    mdxContent = `
    # Hello, MDX!

    This is a simple MDX file.

    ## Features

    - **Markdown:** Write Markdown content directly.
    - **JSX Support:** Embed JSX in Markdown.
    `;

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

}
```

Make Sure that this are in you tsconfig.json ***"types": ["node", "react", "react-dom"],"jsx": "react-jsx","jsxImportSource": "react"***.

#### tsconfig.json

```json
{
  "compileOnSave": false,
  "compilerOptions": {
    "outDir": "./dist/out-tsc",
    "types": ["node", "react", "react-dom"],
    "jsx": "react-jsx",
    "jsxImportSource": "react",
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": "./src",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "sourceMap": true,
    "declaration": false,
    "experimentalDecorators": true,
    "moduleResolution": "node",
    "importHelpers": true,
    "target": "ES2022",
    "module": "ES2022",
    "useDefineForClassFields": false,
    "lib": [
      "ES2022",
      "dom"
    ]
  },
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "strictTemplates": true
  }
}
```

#### tsconfig.app.json

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/app",
    "types": []
  },
  "files": [
    "src/main.ts",
  ],
  "include": [
    "src/**/*.d.ts",
    "src/**/*.tsx",
    "src/**/*.d.ts"
  ]
}
```
## Having React and Angular Components in an MDX File

Integrating React components into an MDX file is straightforward; you just need to import them and pass them like this: ***[reactComponents]="reactComponents"***.

However, for Angular components, the process requires an additional step. First, you need to convert your Angular components into custom web components. Don't worry, **NgMdxRemoteComponent** handles this automatically for you. You just need to pass your Angular components like this: ***[ngComponents]="ngComponents"***.

By leveraging **NgMdxRemoteComponent**, you can seamlessly blend both React and Angular components within your MDX files, providing a powerful way to create rich, interactive content. This hybrid approach allows you to utilize the strengths of both frameworks, offering greater flexibility and functionality in your applications.

#### Create an React Component

```typescript
import React from 'react';

// Define props interface
interface GreetingProps {
name: string;
}

// Define the Greeting component
const Greeting: React.FC<GreetingProps> = ({ name }) => {
return (
    <div>
    <h1>Hello, {name}!</h1>
    <p>Welcome to the MDX React Component.</p>
    </div>
);
};

export default Greeting;
```

#### Create an Angular Component

####  ng-Greeting.component.ts

```typescript
import { Component, Input } from '@angular/core';

@Component({
  selector: 'ng-greeting',
  templateUrl: './ng-Greeting.component.html',
  styleUrls: ['./ng-Greeting.component.css']
})
export class ng_GreetingComponent {
  @Input() name!: string;
}
```

#### ng-Greeting.component.html

```html
<div>
    <h1>Hello, {{ name }}!</h1>
    <p>Welcome to the Angular MDX Component.</p>
</div>
```

#### Importing and Seting the Components

Import the Components

```typescript
import {ng_GreetingComponent} from './angular-mdx-components/ng-Greeting.component'
import Greeting from './react-mdx-components/Greeting'
```

Set reactComponents,ngComponents Variables with particualr Component,then add those Components in MDX File.

```typescript
mdxContent = `
# Hello, MDX!

This is a simple MDX file.

## Features

- **Markdown:** Write Markdown content directly.
- **JSX Support:** Embed JSX in Markdown.
<Greeting name="Edin Abdiu" />
<ng-greeting name="Edin Abdiu"></ng-greeting>
`;

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
    "Greeting" : Greeting,
}

ngComponents = {
    "ng-greeting" : ng_GreetingComponent,
}
```

Set the inputs in ng-mdx-remote-render Component Html

```html
  <ng-mdx-remote-render [source]="mdxContent" sourceType="string" [options]="mdxOptions" [reactComponents]="reactComponents" [ngComponents]="ngComponents"></ng-mdx-remote-render>
```

##  Use Build-in PrismJS Plugin


To use PrismJS, simply activate it with the 'prismjs' property. The existing Remark/Rehype plugins for PrismJS don't work as expected, so I implemented a custom solution.

```html
  <ng-mdx-remote-render 
  [source]="mdxContent" 
  sourceType="string" 
  [options]="mdxOptions" 
  prismjs
  ></ng-mdx-remote-render>
```
### How to Configure Prism.js in angular.json

To activate [Prism.js](http://prismjs.com/) syntax highlight you will need to include...
- a highlight css theme - from `node_modules/prismjs/themes` directory
- desired code language syntax files - from `node_modules/prismjs/components` directory
- desired plugin file - from `node_modules/prismjs/plugins` directory

#### Step 1: Add a CSS Theme

The CSS theme controls how the code appears visually when it's highlighted. To include a theme:

  * Find the desired theme in node_modules/prismjs/themes.
  * Add the path to this CSS file in the styles array of your angular.json file.

```diff

"styles": [
  "styles.css",
+ "node_modules/prismjs/themes/prism-okaidia.css"
],

```
#### Step 2: Add Syntax Files

Syntax files are necessary for highlighting specific programming languages. To include them:
  * Find the desired language files in node_modules/prismjs/components.
  * Add the path to these files in the scripts array of your angular.json file.

```diff

"scripts": [
+ "node_modules/prismjs/components/prism-javascript.min.js",
+ "node_modules/prismjs/components/prism-typescript.min.js",
+ "node_modules/prismjs/components/prism-python.min.js",
+ "node_modules/prismjs/components/prism-css.min.js",
]

```
#### 3. Potential Issue: Scripts Not Loading

If you find that the Prism.js scripts are not loading properly when added via angular.json, there might be an issue with how Angular loads external scripts.

#### 4. Alternative Solution: Import Scripts in main.ts

If the scripts are not loading as expected through angular.json, you can directly import them in your main.ts file:

```typescript

import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-css';

```

### Use PrismJS lineHighlight Plugin 

This plugin allows specific lines or ranges of lines to be highlighted, drawing attention to important parts of the code. It’s particularly useful in tutorials or examples where you want to emphasize certain sections.

To use the line highlight plugin that highlights specific lines and/or line ranges in code blocks, in addition to Prism.js configuration files, you will need to include the following files from prismjs/plugins/line-highlight directory to your application:

  * CSS styling for line highlight - prism-line-highlight.css
  * line highlight plugin script - prism-line-highlight.js

#### Step 1: Add a Plugins CSS Style

```diff

"styles": [
  "styles.css",
+ "node_modules/prismjs/plugins/line-highlight/prism-line-highlight.css"
],

```
#### Step 2: Add Plugins Script

```diff

"scripts": [
+ "node_modules/prismjs/plugins/line-highlight/prism-line-highlight.js",
]

```
#### 3. Potential Issue: Scripts Not Loading

If you find that the Prism.js scripts are not loading properly when added via angular.json, there might be an issue with how Angular loads external scripts.

#### 4. Alternative Solution: Import Scripts in main.ts

If the scripts are not loading as expected through angular.json, you can directly import them in your main.ts file:

```typescript

// JS
import 'prismjs/plugins/line-highlight/prism-line-highlight';

```

Using ng-mdx-remote-render component, you will be able to use the line_highlight property to activate the plugin.

Use line input property to specify the line(s) to highlight and optionally there is a lineOffset property to specify the starting line of code your snippet represents.


```html
  <ng-mdx-remote-render 
  [source]="mdxContent" 
  sourceType="string" 
  [options]="mdxOptions" 
  prismjs
  line_highlight
  [line]="'6, 10-16'"
  [lineOffset]="5"
  ></ng-mdx-remote-render>
```

### Use PrismJS Line Numbers Plugin 

This popular plugin adds line numbers to each line of the code block, making it easier for users to reference specific lines, particularly in educational content or documentation.

To use the line numbers plugin that shows line numbers in code blocks, in addition to Prism.js configuration files, you will need to include the following files from prismjs/plugins/line-numbers directory to your application:

  * CSS styling for line numbers - prism-line-numbers.css
  * line numbers plugin script - prism-line-numbers.js

#### Step 1: Add a Plugins CSS Style

```diff

"styles": [
  "styles.css",
+ "node_modules/prismjs/plugins/line-numbers/prism-line-numbers.css"
],

```
#### Step 2: Add Plugins Script

```diff

"scripts": [
+ "node_modules/prismjs/plugins/line-numbers/prism-line-numbers.js",
]

```
#### 3. Potential Issue: Scripts Not Loading

If you find that the Prism.js scripts are not loading properly when added via angular.json, there might be an issue with how Angular loads external scripts.

#### 4. Alternative Solution: Import Scripts in main.ts

If the scripts are not loading as expected through angular.json, you can directly import them in your main.ts file:

```typescript

// JS
import 'prismjs/plugins/line-numbers/prism-line-numbers';

```

Using ng-mdx-remote-render component, you will be able to use the line_numbers property to activate the plugin.

Additionally, you can use start input property to specify the offset number for the first display line.

```html
  <ng-mdx-remote-render 
  [source]="mdxContent" 
  sourceType="string" 
  [options]="mdxOptions" 
  prismjs
  line_numbers
  [start]="5"
  ></ng-mdx-remote-render>
```

### Use PrismJS Command Line Plugin

The Command Line Plugin for PrismJS is a specialized extension designed to enhance the presentation of command-line interface (CLI) code snippets. This plugin simulates the look and feel of a terminal or command prompt, making it easier for users to distinguish between commands, output, and other elements typically seen in a CLI environment.

To use the command line plugin that displays a command line with a prompt and, optionally, the output/response from the commands, you will need to include the following files from prismjs/plugins/command-line directory to your application:

  * CSS styling for command line - prism-command-line.css
  * command line plugin script - prism-command-line.js

#### Step 1: Add a Plugins CSS Style

```diff

"styles": [
  "styles.css",
+ "node_modules/prismjs/plugins/command-line/prism-command-line.css"
],

```
#### Step 2: Add Plugins Script

```diff

"scripts": [
+ "node_modules/prismjs/plugins/command-line/prism-command-line.js",
]

```
#### 3. Potential Issue: Scripts Not Loading

If you find that the Prism.js scripts are not loading properly when added via angular.json, there might be an issue with how Angular loads external scripts.

#### 4. Alternative Solution: Import Scripts in main.ts

If the scripts are not loading as expected through angular.json, you can directly import them in your main.ts file:

```typescript

// JS
import 'prismjs/plugins/command-line/prism-command-line';

```

Using ng-mdx-remote-render component, you will be able to use the command_line property to activate the plugin.

You may also specify the lines to be presented as output (no prompt and no highlighting) through the output property in the following simple format:

  * A single number refers to the line with that number
  * Ranges are denoted by two numbers, separated with a hyphen (-)
  * Multiple line numbers or ranges are separated by commas
  * Whitespace is allowed anywhere and will be stripped off

```html
  <ng-mdx-remote-render 
  [source]="mdxContent" 
  sourceType="string" 
  [options]="mdxOptions" 
  prismjs
  command_line
  [user]="'chris'"
  [host]="'remotehost'"
  [output]="'2, 4-8'"
  ></ng-mdx-remote-render>
```

Maybe there's something wrong with my implementation or with the plugin, but you need to put this CSS in the global style.css file:

```css
ng-mdx-remote-render * .command,.output {
  display: block;
  float: left;
  font-size: 100%;
  letter-spacing: -1px;
  margin-right: 1em;
  pointer-events: none;
  text-align: right;
}
```

### Use PrismJS DiffHighlight Plugin 

The Diff Highlight Plugin for PrismJS is a powerful extension that enhances code snippets by visually highlighting differences between two or more versions of code. It’s particularly useful for showcasing changes, such as additions, deletions, and modifications, in side-by-side code comparisons or inline diff views. This plugin is ideal for developers, technical writers, and educators who need to present code changes clearly and effectively in documentation, tutorials, or code reviews.

To use the DiffHighlight plugin that Highlights the code inside diff blocks, you will need to include the following files from prismjs/plugins/diff-highlight directory to your application:

  * CSS styling for line highlight - prism-diff-highlight.css
  * line highlight plugin script - prism-diff-highlight.js

#### Step 1: Add a Plugins CSS Style

```diff

"styles": [
  "styles.css",
+ "node_modules/prismjs/plugins/diff-highlight/prism-diff-highlight.css"
],

```
#### Step 2: Add Plugins Script

```diff

"scripts": [
+ "node_modules/prismjs/plugins/diff-highlight/prism-diff-highlight.js",
]

```
#### 3. Potential Issue: Scripts Not Loading

If you find that the Prism.js scripts are not loading properly when added via angular.json, there might be an issue with how Angular loads external scripts.

#### 4. Alternative Solution: Import Scripts in main.ts

If the scripts are not loading as expected through angular.json, you can directly import them in your main.ts file:

```typescript

// JS
import 'prismjs/plugins/diff-highlight/prism-diff-highlight';

```

Using ng-mdx-remote-render component, you will be able to use the diff_highlight property to activate the plugin.

```html
  <ng-mdx-remote-render 
  [source]="mdxContent" 
  sourceType="string" 
  [options]="mdxOptions" 
  prismjs
  diff_highlight
  ></ng-mdx-remote-render>
```

### Use PrismJS Match Braces Plugin 

The Match Braces Plugin for PrismJS is a specialized extension designed to enhance the readability of code by visually emphasizing matching pairs of braces, brackets, and parentheses. This plugin is particularly useful for developers working with code that involves complex or nested structures, such as in programming languages like JavaScript, C++, or Python. By highlighting the corresponding pairs of these delimiters, the Match Braces Plugin helps users quickly identify and navigate through the logical structure of the code.

To use the Match Braces plugin that Highlights the matching braces, you will need to include the following files from prismjs/plugins/match-braces directory to your application:

  * CSS styling for line highlight - prism-match-braces.css
  * line highlight plugin script - prism-match-braces.js

#### Step 1: Add a Plugins CSS Style

```diff

"styles": [
  "styles.css",
+ "node_modules/prismjs/plugins/match-braces/prism-match-braces.css"
],

```
#### Step 2: Add Plugins Script

```diff

"scripts": [
+ "node_modules/prismjs/plugins/match-braces/prism-match-braces.js",
]

```
#### 3. Potential Issue: Scripts Not Loading

If you find that the Prism.js scripts are not loading properly when added via angular.json, there might be an issue with how Angular loads external scripts.

#### 4. Alternative Solution: Import Scripts in main.ts

If the scripts are not loading as expected through angular.json, you can directly import them in your main.ts file:

```typescript

// JS
import 'prismjs/plugins/match-braces/prism-match-braces';

```

Using ng-mdx-remote-render component, you will be able to use the match_braces property to activate the plugin and match_braces_options.


```html
  <ng-mdx-remote-render 
  [source]="mdxContent" 
  sourceType="string" 
  [options]="mdxOptions" 
  prismjs
  match_braces
  [match_braces_options]="{ 'rainbow-braces': false, 'no-brace-hover': true, 'no-brace-select': false }"
  ></ng-mdx-remote-render>

```

### Use PrismJS Normalize Whitespace Plugin 

The Normalize Whitespace Plugin for PrismJS is a utility-focused extension designed to standardize and clean up the whitespace within code snippets. This plugin is particularly useful for developers and technical writers who want to ensure consistent formatting across code examples, regardless of variations in whitespace, such as extra spaces or tabs.

To use the Normalize Whitespace plugin that Supports multiple operations to normalize whitespace in code blocks, you will need to include the following files from prismjs/plugins/normalize-whitespace directory to your application:

  * line highlight plugin script - prism-normalize-whitespace.js

#### Step 1: Add Plugins Script

```diff

"scripts": [
+ "node_modules/prismjs/plugins/normalize-whitespace/prism-normalize-whitespace.js",
]

```
#### 2. Potential Issue: Scripts Not Loading

If you find that the Prism.js scripts are not loading properly when added via angular.json, there might be an issue with how Angular loads external scripts.

#### 3. Alternative Solution: Import Scripts in main.ts

If the scripts are not loading as expected through angular.json, you can directly import them in your main.ts file:

```typescript

// JS
import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace';

```

Using ng-mdx-remote-render component, you will be able to use the ormalize_whitespace_options property to activate the plugin.

Here are The Options u can change:

```typescript
{
  "remove-trailing"?: boolean;
  "remove-indent"?: boolean;
  "left-trim"?: boolean;
  "right-trim"?: boolean;
  "break-lines"?: number;
  "indent"?: number;
  "remove-initial-line-feed"?: boolean;
  "tabs-to-spaces"?: number;
  "spaces-to-tabs"?: number;
}

```

```html
  <ng-mdx-remote-render 
  [source]="mdxContent" 
  sourceType="string" 
  [options]="mdxOptions" 
  prismjs
  [normalize_whitespace_options]="{'remove-trailing': true, 'remove-indent': false, 'left-trim': true}"
  ></ng-mdx-remote-render>

```

### Using Other PrismJS Plugins

For other PrismJS Plugins there is not special attribute or i forgot to implement, i will give just one Example to add Treeview Plugin.


  * CSS styling for line highlight - prism-treeview.css
  * line highlight plugin script - prism-treeview.js

#### Step 1: Add a Plugins CSS Style

```diff

"styles": [
  "styles.css",
+ "node_modules/prismjs/plugins/treeview/prism-treeview.css"
],

```
#### Step 2: Add Plugins Script

```diff

"scripts": [
+ "node_modules/prismjs/plugins/treeview/prism-treeview.js",
]

```
#### 3. Potential Issue: Scripts Not Loading

If you find that the Prism.js scripts are not loading properly when added via angular.json, there might be an issue with how Angular loads external scripts.

#### 4. Alternative Solution: Import Scripts in main.ts

If the scripts are not loading as expected through angular.json, you can directly import them in your main.ts file:

```typescript

// JS
import 'prismjs/plugins/treeview/prism-treeview';

```

```markdown

```treeview
root_folder
|-- a first folder
|   |-- holidays.mov
|   |-- javascript-file.js
|   `-- some_picture.jpg
|-- .htaccess
|-- .npmignore
|-- archive 1.zip
|-- archive 2.tar.gz
|-- logo.svg
`-- README.md

```

## Using PrismJS Nested Code Block inside MDX File

Incorporate advanced syntax highlighting and customizations into your MDX files by utilizing PrismJS nested code blocks. This feature allows you to fine-tune the appearance and functionality of code blocks within your documentation or content, offering enhanced control over syntax highlighting and code presentation.

### Step-by-Step Integration

  1. Activate the Nested Code Feature: To enable nested code blocks, first, activate the nested_code property in the parent ng-mdx-remote-render component. This component is responsible for rendering your MDX content with support for nested code blocks. Here’s an example configuration.
    
  2. Add Nested Code Blocks in MDX: Within your MDX file, you can now use the **ng-mdx-nested-code** component to specify different PrismJS options for each code block. Customize code blocks with various features such as line numbers, line highlighting, and more. Here’s how to integrate nested code blocks.

First Activate the "nested_code" Property in Parent "ng-mdx-remote-render"  Component

```html

  <ng-mdx-remote-render 
  [source]="mdxContent" 
  sourceType="string" 
  [options]="mdxOptions" 
  nested_code
  ></ng-mdx-remote-render>

```
In you MDX File you can Add the Nested Code:

```markdown
<ng-mdx-nested-code
prismjs
line_numbers
start="4"
line_highlight
line="6, 10-16"
line_offset="5"
>
```css
/* Basic CSS styling for a webpage */
body {
  background-color: #f0f0f0;
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

h1 {
  color: #333;
  text-align: center;
  margin-top: 50px;
}

</ng-mdx-nested-code>

<ng-mdx-nested-code
prismjs
line_numbers
line_highlight
line="2, 4-7"
>
```javascript

// A simple JavaScript function to greet a user
const greet = (name) => {
  return `Hello, ${name}!`;
};

// Use the function to greet the user
const greeting = greet("World");
console.log(greeting);

// Create an array and filter even numbers
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evenNumbers = numbers.filter((num) => num % 2 === 0);
console.log("Even Numbers:", evenNumbers);

</ng-mdx-nested-code>

```

## Using Build-in Clipboard Plugin

Using markdown component and/or directive, you will be able to use the clipboard property to activate Clipboard plugin that enable copy-to-clipboard for code block from a single click.

```html

  <ng-mdx-remote-render 
  [source]="mdxContent" 
  sourceType="string" 
  [options]="mdxOptions" 
  clipboard
  ></ng-mdx-remote-render>

```

#### Default button

The clipboard plugin provide an unstyled default button with a default behavior out of the box if no alternative is used.

#### Customize button toolbar
The clipboard button is placed inside a wrapper element that can be customize using the .ng-mdx-remote-clipboard-toolbar CSS selector in your global styles.css/scss file.

This allows to override the default positionning of the clipboard button and play with the visibility of the button using the .hover CSS selector that is applied on the toolbar when the mouse cursor enters and leaves the code block element.

#### Customize default button

To customize the default button styling, use the .ng-mdx-remote-clipboard-button CSS selector in your global styles.css/scss file. You can also customized the "copied" state happening after the button is clicked using the .copied CSS selector.

#### Use Custom Button Coponent/Template

```typescript

import {Input_SerializeOptions, ClipboardRenderOptions} from 'ng-mdx-remote';
import {Custom_Clipboard_Component} from './custom/clipboard.component';

clipboardrOptions : ClipboardRenderOptions = {
  buttonTemplate: Custom_Clipboard_Component
}

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

```

```html

  <ng-mdx-remote-render 
  [source]="mdxContent" 
  sourceType="string" 
  [options]="mdxOptions" 
  clipboard
  [clipboard_options] = "clipboardrOptions"
  ></ng-mdx-remote-render>

```

## Use Remark and Rehype Plugins

Incorporating Remark and Rehype plugins into your MDX (Markdown for JSX) workflow provides powerful tools for transforming and enhancing your Markdown content. These plugins offer extensive customization options for parsing and manipulating your Markdown and HTML content, enabling you to tailor your documentation or blog posts to meet your specific needs.

### Overview

MDX allows you to write JSX directly within Markdown files, combining the simplicity of Markdown with the power of React components. By leveraging Remark and Rehype plugins, you can extend this functionality further, enabling advanced transformations and integrations that enhance both the formatting and interactivity of your content.

```bash
npm install rehype_plugin
```

```typescript
mdxOptions: Input_SerializeOptions = {
    scope: {},
    mdxOptions: {
      remarkPlugins: [
      ], 
      rehypePlugins: [
        rehype_plugin
      ],
      format: 'mdx',
      development: false
    },
    parseFrontmatter: true,
  };
```

If the Plugin, has Options you can pass it like this:

```typescript
mdxOptions: Input_SerializeOptions = {
    scope: {},
    mdxOptions: {
      remarkPlugins: [
      ], 
      rehypePlugins: [
        [rehype_plugin,{opt_1: true,opt_2: false}]
      ],
      format: 'mdx',
      development: false
    },
    parseFrontmatter: true,
  };
```

## Using Remark and Rehype Plugins that are Built-in

Because some plugin have the same Function Name ore the Function Name is just "plugin", i made an new way to add the build in Remark/Rehype Plugins os it has specific name:

### Using Remark Gemoji Plugin

The remark-gemoji plugin is a powerful tool for enhancing Markdown content by automatically converting GitHub-style emoji shortcodes into their corresponding emoji characters. This plugin is part of the Remark ecosystem, a collection of tools for parsing, transforming, and serializing Markdown. With remark-gemoji, you can easily add expressive and visually engaging emojis to your Markdown documents using simple text-based codes.

#### Key Features

  * Automatic Emoji Conversion: The plugin detects GitHub-style emoji shortcodes within your Markdown text and replaces them with the corresponding emoji characters.

  * Support for a Wide Range of Emojis: The plugin supports all standard GitHub emoji shortcodes, giving you access to a vast library of emojis.

  * Seamless Integration: remark-gemoji integrates easily into your existing Remark setup, allowing you to add emoji conversion to your Markdown processing pipeline without hassle.

```bash
# https://www.npmjs.com/package/remark-gemoji
npm install remark-gemoji
```

The "pluginName" needs to be exactly "remarkGemoji"

```typescript

import {Input_SerializeOptions} from 'ng-mdx-remote';
import remarkGemoji from 'remark-gemoji'

mdxOptions: Input_SerializeOptions = {
    scope: {},
    mdxOptions: {
      remarkPlugins: [
        {pluginName: 'remarkGemoji', pluginFunc: remarkGemoji}
      ], 
      rehypePlugins: [
      ],
      format: 'mdx',
      development: false
    },
    parseFrontmatter: true,
  };

```

You need to activate the plugin in Component

```html

  <ng-mdx-remote-render 
  [source]="mdxContent" 
  sourceType="string" 
  [options]="mdxOptions" 
  gemoji
  ></ng-mdx-remote-render>

```

### Using Remark Emoji Plugin

The remark-emoji plugin is a useful tool within the Remark ecosystem that enhances Markdown documents by converting emoji shortcodes into their corresponding Unicode emoji characters. This plugin makes it easy to add visual interest and expressiveness to your Markdown content, ensuring that emojis are displayed correctly across different platforms and devices.

#### Key Features
  * Automatic Emoji Conversion: Converts common emoji shortcodes into their corresponding Unicode emoji characters within your Markdown content.

  * Broad Emoji Support: Includes a wide range of emoji shortcodes, ensuring that you have access to a diverse set of emojis to enhance your content.

  * Seamless Integration: Easily integrates into your existing Remark processing pipeline, requiring minimal configuration.

This plugin will Raise an Error in normal Angular App, but will work in AnalogJS

```bash
# https://www.npmjs.com/package/remark-emoji
npm install remark-emoji
```

The "pluginName" needs to be exactly "remark-emoji"

```typescript

import {Input_SerializeOptions, RemarkEmojiOptions} from 'ng-mdx-remote';
import emoji from 'remark-emoji';

mdxOptions: Input_SerializeOptions = {
    scope: {},
    mdxOptions: {
      remarkPlugins: [
        {pluginName: 'remark-emoji', pluginFunc: emoji, pluginOptions: {accessible: true, padSpaceAfter: true, emoticon: true} satisfies RemarkEmojiOptions}
      ], 
      rehypePlugins: [
      ],
      format: 'mdx',
      development: false
    },
    parseFrontmatter: true,
  };

```

You need to activate the plugin in the component, and you can update the options. Each component can have different options.

```html

  <ng-mdx-remote-render 
  [source]="mdxContent" 
  sourceType="string" 
  [options]="mdxOptions" 
  gemoji
  [gemoji_options]="{accessible: false, padSpaceAfter: true, emoticon: false}"
  ></ng-mdx-remote-render>

```

### Using Rehype Twemoji Plugin

The rehype-twemoji plugin is a powerful tool within the Rehype ecosystem that enhances HTML content by transforming standard Unicode emojis into Twitter-style emoji images (SVG or PNG). This plugin allows you to maintain a consistent, high-quality emoji appearance across all platforms, making your content visually appealing and easily recognizable.

#### Key Features

  * Twitter-Style Emojis: Converts standard Unicode emojis into Twitter’s Twemoji images, available in both SVG and PNG formats.

  * Consistent Rendering: Ensures that emojis are displayed consistently across all platforms and devices, regardless of native emoji support or rendering differences.

  * Customization Options: Allows for customization of the emoji format (SVG or PNG) and provides options for setting the size and styling of the emojis.

```bash
# https://www.npmjs.com/package/rehype-twemoji
npm install rehype-twemoji
```

The "pluginName" needs to be exactly "rehype-twemoji"

```typescript

import {Input_SerializeOptions, RehypeTwemojiOptions} from 'ng-mdx-remote';
import { rehypeTwemoji } from 'rehype-twemoji'

mdxOptions: Input_SerializeOptions = {
    scope: {},
    mdxOptions: {
      remarkPlugins: [
      ], 
      rehypePlugins: [
        {pluginName: 'rehypeTwemoji', pluginFunc: rehypeTwemoji, pluginOptions: {format: 'svg', source: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest'} satisfies RehypeTwemojiOptions},
      ],
      format: 'mdx',
      development: false
    },
    parseFrontmatter: true,
  };

```

You need to activate the plugin in the component, and you can update the options. Each component can have different options.

```html

  <ng-mdx-remote-render 
  [source]="mdxContent" 
  sourceType="string" 
  [options]="mdxOptions" 
  twemoji
  [twemoji_options]="{format: 'png'}"
  ></ng-mdx-remote-render>

```

To avoid oversized SVG emojis, be sure to set the width and height in your global style.css file. Without these settings, the SVG emojis might appear much larger than intended.

```css

ng-mdx-remote-render * img[data-twemoji] {
  width: 20px;  /* Set the desired width */
  height: 20px; /* Set the desired height */
}

```

### Using Rehype Katex Plugin

The rehype-katex plugin is a powerful tool that enables the rendering of LaTeX math equations in HTML content. By integrating this plugin into your Rehype processing pipeline, you can seamlessly convert LaTeX math expressions within your Markdown or HTML files into beautifully formatted mathematical notation, using the popular KaTeX library.

#### Key Features

  * LaTeX to KaTeX Conversion: Converts LaTeX math expressions, both inline ($...$) and display ($$...$$), into KaTeX-rendered HTML, providing high-quality mathematical typesetting.

  * Fast and Reliable Rendering: KaTeX is known for its speed and reliability, making it ideal for rendering complex equations without performance issues.

  * Customizable Output: The plugin allows for customization of the KaTeX output, including options for macros, display modes, and other KaTeX settings.

  * No Dependencies on External Libraries: The plugin can operate entirely within your Rehype processing pipeline, without requiring external JavaScript or CSS files during runtime, making it a lightweight and efficient solution.

```bash
# https://www.npmjs.com/package/rehype-katex
npm install rehype-katex
```

The "pluginName" needs to be exactly "rehypeKatex"

```typescript

import {Input_SerializeOptions, KatexOptions} from 'ng-mdx-remote';
import rehypeKatex from 'rehype-katex';

mdxOptions: Input_SerializeOptions = {
    scope: {},
    mdxOptions: {
      remarkPlugins: [
      ], 
      rehypePlugins: [
        {pluginName: 'rehypeKatex', pluginFunc: rehypeKatex, pluginOptions: {displayMode : false, output : "mathml",throwOnError : true, } satisfies KatexOptions},
      ],
      format: 'mdx',
      development: false
    },
    parseFrontmatter: true,
  };

```

You need to activate the plugin in the component, and you can update the options. Each component can have different options.

```html

  <ng-mdx-remote-render 
  [source]="mdxContent" 
  sourceType="string" 
  [options]="mdxOptions" 
  katex
  [katex_options]="{displayMode : false, output : 'html'}"
  ></ng-mdx-remote-render>

```

### Using Rehype Mermaid Plugin

The Mermaid plugin is a powerful tool that enables the creation of diagrams and flowcharts directly within Markdown or HTML content. By integrating this plugin into your workflow, you can seamlessly convert text-based descriptions of diagrams into beautifully rendered visualizations. This is particularly useful for documentation, technical writing, and any content where clear, concise diagrams can enhance understanding.

### Key Features

  * Text-Based Diagram Creation: Allows you to define complex diagrams using an intuitive, text-based syntax within your Markdown or HTML files.

  * Wide Range of Diagram Types: Supports various types of diagrams including flowcharts, sequence diagrams, class diagrams, state diagrams, Gantt charts, and more.

  * Live Rendering: Automatically converts the Mermaid syntax into SVG diagrams during the content processing stage, ensuring that the diagrams are rendered consistently across different platforms.

  * Customizable: Offers extensive customization options for styling and configuring the appearance of diagrams, allowing you to tailor the visuals to match your content’s design.

```bash
# https://www.npmjs.com/package/rehype-mermaid
npm install rehype-mermaid
```

The "pluginName" needs to be exactly "rehypeMermaid"

```typescript

import {Input_SerializeOptions, KatexOptions} from 'ng-mdx-remote';
import rehypeMermaid from 'rehype-mermaid'

mdxOptions: Input_SerializeOptions = {
    scope: {},
    mdxOptions: {
      remarkPlugins: [
      ], 
      rehypePlugins: [
        {pluginName: 'rehypeMermaid', pluginFunc: rehypeMermaid, pluginOptions: {strategy: 'img-svg'} satisfies RehypeMermaidOptions},
      ],
      format: 'mdx',
      development: false
    },
    parseFrontmatter: true,
  };

```

You need to activate the plugin in the component, and you can update the options. Each component can have different options.

```html

  <ng-mdx-remote-render 
  [source]="mdxContent" 
  sourceType="string" 
  [options]="mdxOptions" 
  mermaid
  [mermaid_options]="{strategy: 'inline-svg'}"
  ></ng-mdx-remote-render>

```


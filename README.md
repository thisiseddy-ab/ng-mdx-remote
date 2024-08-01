# Introduction

**ng-mdx-remote** ***(Angular MDX Remote)*** is a fork of [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote), designed to bring the power and flexibility of MDX to Angular applications. With ng-mdx-remote, you can seamlessly integrate MDX content into your Angular projects, enabling rich, interactive documentation and content-driven applications.

Although this library allows you to leverage MDX within Angular, it is important to note that it still utilizes React under the hood. Therefore, it effectively creates a hybrid Angular/React environment, combining the best of both worlds.

### Key Features

- **MDX Integration**: Write your content in MDX and use it directly in your Angular components.
- **Hybrid Approach**: Combines Angular's robust framework with React's powerful rendering capabilities.
- **Ease of Use**: Simple APIs to serialize and render MDX content within Angular components.

### Why Use ng-mdx-remote?

Integrating MDX into Angular applications opens up a plethora of possibilities for creating interactive and rich content. Whether you are building documentation sites, blogs, or content-driven applications, ng-mdx-remote offers a streamlined way to bring the dynamic capabilities of MDX to your Angular projects.

## Contents

* [Installation](#Installation)
* [React/Angular Components](#Having-React-and-Angular-Components-in-an-MDX-File)
* [Use remark/rehype Plugins](#Use-remark-and-rehype-Plugins)

## Installation

First we need to install the **ng-mdx-remote** from GitHub Releaseas (no NPM Package for Now).

```bash
# npm install https://github.com/thisiseddy-ab/ng-mdx-remote/releases/download/tag-name/file-name.tgz
npm install https://github.com/thisiseddy-ab/ng-mdx-remote/releases/download/v0.0.1/ng-mdx-remote-0.0.1.tgz
```

Second we need to install this React and Mdx Packages ***npm install react react-dom @mdx-js/mdx @mdx-js/react rxjs vfile vfile-matter @vitejs/plugin-react**.

```bash
npm install react react-dom @mdx-js/mdx @mdx-js/react rxjs vfile vfile-matter @vitejs/plugin-react
```
Import ***NgMdxRemoteModule, SerializeOptions,*** somewhere where you need to Render, for me is the **app.component**, see the code in that component:

app.component.html

```html
<ng-mdx-remote-render [source]="mdxContent" sourceType="string" [options]="mdxOptions" ></ng-mdx-remote-render>
```

app.component.ts

```typescript
import {NgMdxRemoteModule,SerializeOptions} from 'ng-mdx-remote'

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

}
```

Make Sure that this are in you tsconfig.json ***"types": ["node", "react", "react-dom"],"jsx": "react-jsx","jsxImportSource": "react"***.

tsconfig.json

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

tsconfig.app.json

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

vite.config.ts

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
      },
    },
  },
});
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

ng-Greeting.component.ts

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

ng-Greeting.component.html

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

## Use remark and rehype Plugins

To enhance your MDX content, you can utilize various remark and rehype plugins. In this example, we'll demonstrate how to use the **rehype-prism-plus** plugin for syntax highlighting.

### Installation

First, you need to install the required packages:

```bash
npm install prismjs rehype-prism-plus
```

```typescript
import rehypePrism from 'rehype-prism-plus';
```

```typescript
mdxOptions: SerializeOptions = {
    scope: {},
    mdxOptions: {
      remarkPlugins: [
      ], 
      rehypePlugins: [
        rehypePrism
      ],
      format: 'mdx',
      development: false
    },
    parseFrontmatter: true,
  };
```

To activate [Prism.js](http://prismjs.com/) syntax highlight you will need to include...
- prism.js core library - `node_modules/prismjs/prism.js` file
- a highlight css theme - from `node_modules/prismjs/themes` directory
- desired code language syntax files - from `node_modules/prismjs/components` directory

_Additional themes can be found by browsing the web such as [Prism-Themes](https://github.com/PrismJS/prism-themes) or [Mokokai](https://github.com/Ahrengot/Monokai-theme-for-Prism.js) for example._

If you are using [Angular CLI](https://cli.angular.io/) you can follow the `angular.json` example below...

```diff
"styles": [
  "styles.css",
+ "node_modules/prismjs/themes/prism-okaidia.css"
],
"scripts": [
+ "node_modules/prismjs/prism.js",
+ "node_modules/prismjs/components/prism-css.min.js" # css language syntax
]
```
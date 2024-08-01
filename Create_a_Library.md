### Create a Worksapce

```bash
ng new ng-mdx-remote --create-application=false
```
### Generate Library

```bash
ng generate library ng-mdx-remote
```

### projects/ng-mdx-remote/src/lib

Create this Files in ***projects/ng-mdx-remote/src/lib***:

```diff
+ "ng-mdx-remote.module.ts"
+ "ng-mdx-remote.component.tsx"
+ "ng-mdx-remote.component.html"
+ "ng-mdx-remote.component.css"
+ "ng-mdx-remote.service.ts"
+ "ng-mdx-remote.interfaces.ts"
+ "ng-mdx-remote.types.ts"
```

### ng-mdx-remote.module.ts

Create NgMdxRemoteModule

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { NgMdxRemoteComponent } from './ng-mdx-remote.component';
import { NgMdxRemoteService } from './ng-mdx-remote.service';

@NgModule({
  declarations: [NgMdxRemoteComponent],
  imports: [CommonModule,HttpClientModule],
  providers: [NgMdxRemoteService],
  exports: [NgMdxRemoteComponent],
})
export class NgMdxRemoteModule {}
```

### projects/ng-mdx-remote/src/public-api.ts

Update ***projects/ng-mdx-remote/src/public-api.ts***

```typescript
export * from './lib/ng-mdx-remote.component';
export * from './lib/ng-mdx-remote.service';
export * from './lib/ng-mdx-remote.interfaces';
export * from './lib/ng-mdx-remote.types';
export * from './lib/ng-mdx-remote.module';
```
### Create the Library

Create The Library Components,Service,Interface,Types..etc what it Needs

### Build Library

```bash
ng build ng-mdx-remote
```
### Pack Libary

```bash
cd dist/ng-mdx-remote
npm pack
```

### Release Library Videos 

[How to Release Code With Github](https://www.youtube.com/watch?v=Ob9llA_QhQY)
 
### Install Library

```bash
# npm install https://github.com/thisiseddy-ab/ng-mdx-remote/releases/download/tag-name/file-name.tgz
npm install https://github.com/thisiseddy-ab/ng-mdx-remote/releases/download/v0.0.1/ng-mdx-remote-0.0.1.tgz
```
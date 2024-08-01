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
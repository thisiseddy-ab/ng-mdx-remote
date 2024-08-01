// /my-angular-project/projects/ng-mdx-remote/vite.config.ts
import { defineConfig } from 'vite';
import { mergeConfig } from 'vite';
import baseConfig from '../../vite.config'; 

export default mergeConfig(baseConfig, defineConfig({
  root: 'projects/ng-mdx-remote',
  build: {
    outDir: '../../dist/ng-mdx-remote', 
  },
  resolve: {
    alias: {
      '@': '/projects/ng-mdx-remote/src',
    },
  },
}));
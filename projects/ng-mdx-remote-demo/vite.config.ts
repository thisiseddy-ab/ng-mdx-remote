// /my-angular-project/demo/vite.config.ts
import { defineConfig } from 'vite';
import { mergeConfig } from 'vite';
import baseConfig from '../../vite.config';

export default mergeConfig(baseConfig, defineConfig({
  root: 'demo',
  build: {
    outDir: '../../dist/angular-mdx-demo', 
  },
  resolve: {
    alias: {
      '@': '/projects/ng-mdx-remote-demo',
    },
  },
  plugins: [
  ],
}));
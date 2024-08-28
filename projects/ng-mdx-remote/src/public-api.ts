/*
 * Public API Surface of ng-mdx-remote
 */



export * from './lib/ng-mdx-remote.component';
export * from './lib/ng-mdx-remote.service';
export * from './lib/ng-mdx-remote.interfaces';
export * from './lib/ng-mdx-remote.types';
export * from './lib/ng-mdx-remote.module';

// Remark/Rehype Plugins
export {RemarkEmojiOptions} from './lib/plugins/remark-emoji-options'
export {RehypeTwemojiOptions} from './lib/plugins/rehype-twemoji-options'
export {KatexOptions} from './lib/plugins/katex-options'
export {RehypeMermaidOptions} from './lib/plugins/rehype-mermaid-options'

// Clipboard
export {ClipboardRenderOptions} from './lib/plugins/clipboard-options'

// PrismJS
export {PrismPlug_matchBraces_Options,PrismPlug_NormalizeWhitespace_Options} from './lib/plugins/prism-plugin'


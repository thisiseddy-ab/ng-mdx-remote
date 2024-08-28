
import {Type} from '@angular/core';
import * as React from 'react';

export type MDXFormat = 'mdx' | 'detect' | 'md' | null | undefined;

export type React_Component = {
    [key: string]: React.ComponentType<any>;
};

export type Angular_Custom_Component = {
  [key: string]: Type<any>;
};
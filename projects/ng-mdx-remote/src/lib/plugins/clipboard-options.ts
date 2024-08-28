import { InjectionToken, TemplateRef, Type } from '@angular/core';

export interface ClipboardOptions {
  buttonComponent?: Type<unknown>;
}

export interface ClipboardRenderOptions extends ClipboardOptions {
  buttonTemplate?: TemplateRef<unknown>;
}

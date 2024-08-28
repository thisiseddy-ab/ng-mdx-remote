import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class ResolveUrlService {
  abstract name: string;
  abstract domains: string[];
  abstract pattern: RegExp;

  constructor() {}

  abstract getMediaUrl(host: string, mediaId: string): Promise<string>;

  abstract getUrl(host: string, mediaId: string): string;

  getHostAndId(url: string): { host: string; mediaId: string } | false {
    const match = url.match(this.pattern);
    return match ? { host: match[1], mediaId: match[2] } : false;
  }

  validUrl(url: string, host: string): boolean {
    return this.pattern.test(url) || this.domains.includes(host.toLowerCase());
  }

  protected _defaultGetUrl(host: string, mediaId: string, template: string = 'http://{host}/e/{mediaId}'): string {
    host = this._getHost(host);
    return template.replace('{host}', host).replace('{mediaId}', mediaId);
  }

  private _getHost(host: string): string {
    if (host.indexOf('.') === -1) {
      return this.domains.find(domain => domain.includes(host)) || host;
    }
    return host;
  }

  protected handleError(error: any): void {
    console.error('An error occurred:', error);
    throw error; // Re-throw the error for handling in the service
  }
}
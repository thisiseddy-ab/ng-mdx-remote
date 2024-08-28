import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { ResolveUrlService } from './resolve-url.service';

@Injectable({
  providedIn: 'root'
})
export class MixDropResolverService extends ResolveUrlService {
  name = 'MixDrop';
  domains = [
    'mixdrop.co', 'mixdrop.to', 'mixdrop.sx', 'mixdrop.bz', 'mixdrop.ch',
    'mixdrp.co', 'mixdrp.to', 'mixdrop.gl', 'mixdrop.club', 'mixdroop.bz',
    'mixdroop.co', 'mixdrop.vc', 'mixdrop.ag', 'mdy48tn97.com',
    'md3b0j6hj.com', 'mdbekjwqa.pw', 'mdfx9dc8n.net', 'mixdropjmk.pw',
    'mixdrop21.net', 'mixdrop.is', 'mixdrop.si', 'mixdrop23.net', 'mixdrop.nu',
    'mixdrop.ms', 'mdzsmutpcvykb.net', 'mixdrop.ps'
  ];
  pattern = new RegExp(
    `(?://|\\.)((?:mixdro*p\\d*(?:jmk)?|md(?:3b0j6hj|bekjwqa|fx9dc8n|y48tn97|zsmutpcvykb))\\.` +
    `(?:c[ho]m?|to|sx|bz|gl|club|vc|ag|pw|net|is|si|nu|ms|ps))/(?:f|e)/(\\w+)`
  );

  private axiosInstance: AxiosInstance;

  constructor() {
    super();
    this.axiosInstance = axios.create();
  }

  async getMediaUrl(host: string, mediaId: string): Promise<string> {
    if (host.endsWith('.club')) {
      host = host.replace('.club', '.co');
    }

    const webUrl = this.getUrl(host, mediaId);
    const rurl = `https://${host}/`;
    const headers = this.getHeaders(rurl);

    try {
      const html = await this.axiosInstance.get(webUrl, { headers }).then(response => response.data);
      const match = html.match(/location\s*=\s*["']([^'"]+)/);

      if (match) {
        const redirectUrl = `https://${host}${match[1]}`;
        const newHtml = await this.axiosInstance.get(redirectUrl, { headers }).then(response => response.data);
        return this.extractMediaUrl(newHtml, webUrl, headers);
      } else {
        return this.extractMediaUrl(html, webUrl, headers);
      }
    } catch (error) {
      this.handleError(error);
      throw error; // Ensure that errors are propagated properly
    }
  }

  getUrl(host: string, mediaId: string): string {
    return this._defaultGetUrl(host, mediaId, 'https://{host}/e/{mediaId}');
  }

  private extractMediaUrl(html: string, webUrl: string, headers: any): string {
    if (html.includes('(p,a,c,k,e,d)')) {
      html = this.unpackData(html);
    }

    const match = html.match(/(?:vsr|wurl|surl)[^=]*=\s*"([^"]+)/);
    if (match) {
      let surl = match[1];
      if (surl.startsWith('//')) {
        surl = `https:${surl}`;
      }
      return surl + this.appendHeaders(headers);
    }

    throw new Error('Video not found');
  }

  private unpackData(html: string): string {
    // Implement your logic for unpacking packed data here
    // This is a placeholder for the unpacking logic
    return html;
  }

  private appendHeaders(headers: any): string {
    const headerEntries: string[] = [];

    Object.keys(headers).forEach(key => {
      const value = headers[key];
      if (value) {
        const encodedValue = encodeURIComponent(value);
        headerEntries.push(`${key}=${encodedValue}`);
      }
    });

    return `|${headerEntries.join('&')}`;
  }

  private getHeaders(rurl: string): any {
    return {
      'Origin': rurl.slice(0, -1),
      'Referer': rurl,
      'User-Agent': this.getRandomUserAgent()
    };
  }

  private getRandomUserAgent(): string {
    // Implement your random user agent logic here
    return 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3';
  }
}
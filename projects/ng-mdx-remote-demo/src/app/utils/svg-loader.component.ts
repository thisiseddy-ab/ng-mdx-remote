import { Component, Input, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { HttpClientModule,HttpClient } from '@angular/common/http';


@Component({
  selector: 'svg-loader',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './svg-loader.component.html',
  styleUrls: ['./svg-loader.component.css']
})
export class SVGLoaderComponent implements OnInit {
    @Input() path: string | undefined; // Path to the SVG file
    @Input() width: string = '24px';  // Default width
    @Input() height: string = '24px'; // Default height
    @Input() fillColor: string = 'black';  // Default fill color
  
    constructor(
      private http: HttpClient,
      private el: ElementRef,
      private renderer: Renderer2
    ) { }
  
    ngOnInit(): void {
      this.loadSvg();
    }
  
    loadSvg(): void {
      if (this.path) {
        this.http.get(this.path, { responseType: 'text' }).subscribe(svg => {
          // Create a new DOM parser
          const parser = new DOMParser();
          const doc = parser.parseFromString(svg, 'image/svg+xml');
  
          // Get the SVG element
          const svgElement = doc.querySelector('svg');
          if (svgElement) {
            // Set width and height attributes directly
            this.renderer.setAttribute(svgElement, 'width', this.width);
            this.renderer.setAttribute(svgElement, 'height', this.height);
  
            // Ensure viewBox is set correctly
            this.adjustViewBox(svgElement);
  
            // Set fill color for all relevant elements
            const elements = svgElement.querySelectorAll('path, rect, circle, ellipse, line, polygon, polyline');
            elements.forEach(el => {
              this.renderer.setAttribute(el, 'fill', this.fillColor);
            });
  
            // Append the SVG element to the component's host element
            this.renderer.appendChild(this.el.nativeElement, svgElement);
          }
        });
      }
    }
  
    adjustViewBox(svgElement: SVGSVGElement): void {
        const elements = svgElement.querySelectorAll('path, rect, circle, ellipse, line, polygon, polyline');
        
        if (elements.length === 0) {
          // If no relevant elements are found, set a default viewBox
          svgElement.setAttribute('viewBox', `0 0 100 100`); // Example default values
          return;
        }
      
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
      
        elements.forEach(element => {
          const bbox = (element as SVGGraphicsElement).getBBox();
      
          if (bbox.width > 0 && bbox.height > 0) {
            minX = Math.min(minX, bbox.x);
            minY = Math.min(minY, bbox.y);
            maxX = Math.max(maxX, bbox.x + bbox.width);
            maxY = Math.max(maxY, bbox.y + bbox.height);
          }
        });
      
        if (minX === Infinity || minY === Infinity || maxX === -Infinity || maxY === -Infinity) {
          // If bbox is still invalid, set a default viewBox
          svgElement.setAttribute('viewBox', `0 0 100 100`); // Example default values
        } else {
          svgElement.setAttribute('viewBox', `${minX} ${minY} ${maxX - minX} ${maxY - minY}`);
        }
      }
  }
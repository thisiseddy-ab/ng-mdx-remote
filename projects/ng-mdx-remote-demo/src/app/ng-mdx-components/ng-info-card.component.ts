import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ng-info-card',
  templateUrl: './ng-info-card.component.html',
  styleUrls: ['./ng-info-card.component.css']
})
export class ng_InfoCardComponent implements OnInit {
  @Input() title!: string;
  @Input() content!: string;
  @Input() imageurl?: string;

  ngOnInit(): void {
    console.log('Image URL:', this.imageurl);
  }
}
import { Component, Input } from '@angular/core';
import {CommonModule} from '@angular/common'

@Component({
  selector: 'ng-alert-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ng-alert-box.component.html',
  styleUrls: ['./ng-alert-box.component.css']
})
export class ng_AlertBoxComponent {
  @Input() message!: string;
  @Input() type: 'info' | 'warning' | 'error' = 'info';

  get alertStyles() {
    return {
      info: { backgroundColor: '#e7f0ff', color: '#0056b3' },
      warning: { backgroundColor: '#fff3cd', color: '#856404' },
      error: { backgroundColor: '#f8d7da', color: '#721c24' }
    }[this.type];
  }
}
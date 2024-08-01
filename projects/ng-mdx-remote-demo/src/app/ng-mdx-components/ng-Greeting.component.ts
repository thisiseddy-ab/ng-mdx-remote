import { Component, Input } from '@angular/core';

@Component({
  selector: 'ng-greeting',
  standalone: true,
  imports: [],
  templateUrl: './ng-Greeting.component.html',
  styleUrls: ['./ng-Greeting.component.css']
})
export class ng_GreetingComponent {
  @Input() name!: string;
}
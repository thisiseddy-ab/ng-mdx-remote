import { Component} from '@angular/core';

@Component({
  selector: 'ng-button',
  standalone: true,
  imports: [],
  templateUrl: './ng-button.component.html',
  styleUrls: ['./ng-button.component.css']
})
export class ng_ButtonComponent {

  handleClick() {
    alert('Button clicked!');
  }
}
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'ex-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './ex-card.component.html',
  styleUrl: './ex-card.component.css',
})
export class ExampleCardCompoent {
  @Input() title!: string;
  @Input() description!: string;
  @Input() href!: string | any[];
}
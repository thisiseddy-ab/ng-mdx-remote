import { Component } from '@angular/core';
import { RouterLink  } from '@angular/router';

@Component({
  selector: 'header-main',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderMainComponent {

}

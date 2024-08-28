import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/// Components
import {HeaderMainComponent} from './footer-header/header/header.component'
import {FooterMainComponent} from './footer-header/footer/footer.component'

@Component({
  selector: 'app-root',
  standalone: true,
  
  imports: [RouterOutlet,HeaderMainComponent,FooterMainComponent],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}


import { Component } from '@angular/core';
import { RouterLink  } from '@angular/router';

import  {SVGLoaderComponent} from '../../utils/svg-loader.component'

@Component({
  selector: 'header-main',
  standalone: true,
  imports: [RouterLink,SVGLoaderComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderMainComponent {

}

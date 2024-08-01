import { Routes } from '@angular/router';

/// Components 
import { HomeMainComponent } from './home/home.component';

/// Examples
import {RootExampleComponent} from './example-components/root-example.component'
import {EX_001_Component} from './example-components/ex-001.component'
import {EX_002_Component} from './example-components/ex-002.component'
import {EX_003_Component} from './example-components/ex-003.component'
import {EX_004_Component} from './example-components/ex-004.component'
import {EX_005_Component} from './example-components/ex-005.component'
import {EX_006_Component} from './example-components/ex-006.component'
import {EX_007_Component} from './example-components/ex-007.component'



export const routes: Routes = [
  { path: '', component: HomeMainComponent },
  { path: 'example',children: [
    { path: '', redirectTo: '1', pathMatch: 'full' },
    { path: '1', component: EX_001_Component },
    { path: '2', component: EX_002_Component },
    { path: '3', component: EX_003_Component },
    { path: '4', component: EX_004_Component },
    { path: '5', component: EX_005_Component },
    { path: '6', component: EX_006_Component },
    { path: '7', component: EX_007_Component },
  ]}
];

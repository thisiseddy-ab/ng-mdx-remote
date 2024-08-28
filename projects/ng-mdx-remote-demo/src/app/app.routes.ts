import { Routes } from '@angular/router';

/// Components 
import { HomeMainComponent } from './home/home.component';
import { ExamplesComponent } from './/examples/examples.component';

/// Examples
import {EX_001_Component} from './example-components/ex-001.component'
import {EX_002_Component} from './example-components/ex-002.component'
import {EX_003_Component} from './example-components/ex-003.component'
import {EX_004_Component} from './example-components/ex-004.component'
import {EX_005_Component} from './example-components/ex-005.component'
import {EX_006_Component} from './example-components/ex-006.component'
import {EX_007_Component} from './example-components/ex-007.component'
import {EX_008_Component} from './example-components/ex-008.component'
import {EX_009_Component} from './example-components/ex-009.component'
import {EX_010_Component} from './example-components/ex-010.component'
import {EX_011_Component} from './example-components/ex-011.component'
import {EX_012_Component} from './example-components/ex-012.component'
import {EX_013_Component} from './example-components/ex-013.component'


export const routes: Routes = [
  { path: '', component: HomeMainComponent },
  { path: 'examples', component: ExamplesComponent },
  { path: 'examples/1', component: EX_001_Component },
  { path: 'examples/2', component: EX_002_Component },
  { path: 'examples/3', component: EX_003_Component },
  { path: 'examples/4', component: EX_004_Component },
  { path: 'examples/5', component: EX_005_Component },
  { path: 'examples/6', component: EX_006_Component },
  { path: 'examples/7', component: EX_007_Component },
  { path: 'examples/8', component: EX_008_Component },
  { path: 'examples/9', component: EX_009_Component },
  { path: 'examples/10', component: EX_010_Component },
  { path: 'examples/11', component: EX_011_Component },
  { path: 'examples/12', component: EX_012_Component },
  { path: 'examples/13', component: EX_013_Component },
];
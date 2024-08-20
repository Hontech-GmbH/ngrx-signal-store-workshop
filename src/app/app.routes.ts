import { Routes } from '@angular/router';
import { ShellComponent } from './core/shell';

export const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: 'todos',
        loadChildren: () =>
          import('./modules/todo').then((feature) => feature.routes),
      },
      {
        path: 'about',
        loadChildren: () =>
          import('./modules/about').then((feature) => feature.routes),
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'todos',
      },
    ],
  },
];

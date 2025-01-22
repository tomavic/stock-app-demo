import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./stock-feature/list/stock-list').then(
        (m) => m.StockListComponent
      ),
  },
  { path: '', redirectTo: '', pathMatch: 'full' },
];

import { Routes } from '@angular/router';
import { portfolioResolver } from './resolvers/portfolio.resolver';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: { data: portfolioResolver },
  },
  { path: '**', redirectTo: '' },
];

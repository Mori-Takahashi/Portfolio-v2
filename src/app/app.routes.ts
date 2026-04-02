import { Routes } from '@angular/router';
import { portfolioResolver } from './resolvers/portfolio.resolver';
import { HomeComponent } from './pages/home/home.component';
import { ImpressumComponent } from './pages/impressum/impressum.component';
import { DatenschutzComponent } from './pages/datenschutz/datenschutz.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: { data: portfolioResolver },
  },
  {
    path: 'impressum',
    component: ImpressumComponent,
  },
  {
    path: 'datenschutz',
    component: DatenschutzComponent,
  },
  { path: '**', redirectTo: '' },
];

import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { forkJoin } from 'rxjs';
import { PortfolioService } from '../services/portfolio.service';
import { PortfolioResolvedData } from '../models/portfolio.model';

export const portfolioResolver: ResolveFn<PortfolioResolvedData> = () => {
  const service = inject(PortfolioService);
  return forkJoin({
    portfolio: service.getPortfolioData(),
    projects:  service.getProjects(),
  });
};

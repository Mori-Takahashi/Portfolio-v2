import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PortfolioData, Project } from '../models/portfolio.model';

@Injectable({ providedIn: 'root' })
export class PortfolioService {
  private http = inject(HttpClient);

  getPortfolioData(): Observable<PortfolioData> {
    return this.http.get<PortfolioData>('/data/portfolio.json');
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>('/data/projects.json');
  }
}

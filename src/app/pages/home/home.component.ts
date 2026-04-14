import { Component, inject, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PortfolioData, Project, PortfolioResolvedData } from '../../models/portfolio.model';
import { NavbarComponent }       from '../../components/navbar/navbar.component';
import { HeroComponent }         from '../../components/hero/hero.component';
import { AboutComponent }        from '../../components/about/about.component';
import { SkillsComponent }       from '../../components/skills/skills.component';
import { ProjectsComponent }     from '../../components/projects/projects.component';
import { ContributionsComponent } from '../../components/contributions/contributions.component';
import { TestimonialsComponent } from '../../components/testimonials/testimonials.component';
import { ContactComponent }      from '../../components/contact/contact.component';
import { FooterComponent }       from '../../components/footer/footer.component';

@Component({
  selector: 'app-home',
  imports: [
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    ContributionsComponent,
    TestimonialsComponent,
    ContactComponent,
    FooterComponent,
  ],
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent {
  private route = inject(ActivatedRoute);

  private resolved = this.route.snapshot.data['data'] as PortfolioResolvedData;
  readonly portfolio: PortfolioData = this.resolved.portfolio;
  readonly projects:  Project[]     = this.resolved.projects;
}

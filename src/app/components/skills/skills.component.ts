import {
  Component, Input, AfterViewInit, OnDestroy,
  inject, ViewEncapsulation,
} from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PortfolioData } from '../../models/portfolio.model';
import { TranslationService } from '../../services/translation.service';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class SkillsComponent implements AfterViewInit, OnDestroy {
  @Input() data!: PortfolioData;
  readonly ts = inject(TranslationService);
  ngAfterViewInit(): void {
    this.animate();
  }

  private animate(): void {
    gsap.utils.toArray<HTMLElement>('.skills-category').forEach(cat => {
      const cards = cat.querySelectorAll<HTMLElement>('.skill-card');
      gsap.fromTo(cards,
        { opacity: 0, y: 25 },
        {
          opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: 'power3.out',
          scrollTrigger: { trigger: cat, start: 'top 86%', toggleActions: 'play none none none' },
        }
      );
    });
  }

  ngOnDestroy(): void {
    ScrollTrigger.getAll().forEach(t => t.kill());
  }
}

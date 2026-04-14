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
  selector: 'app-contributions',
  templateUrl: './contributions.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ContributionsComponent implements AfterViewInit, OnDestroy {
  @Input() data!: PortfolioData;
  readonly ts = inject(TranslationService);

  ngAfterViewInit(): void {
    this.animate();
  }

  private animate(): void {
    gsap.utils.toArray<HTMLElement>('.contribution-card').forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 0.7, delay: i * 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' },
        }
      );
    });
  }

  ngOnDestroy(): void {
    ScrollTrigger.getAll().forEach(t => t.kill());
  }
}

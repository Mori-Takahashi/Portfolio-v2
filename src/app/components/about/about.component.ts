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
  selector: 'app-about',
  templateUrl: './about.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AboutComponent implements AfterViewInit, OnDestroy {
  @Input() data!: PortfolioData;
  readonly ts = inject(TranslationService);
  ngAfterViewInit(): void {
    this.animate();
  }

  private animate(): void {
    // Fade-up helpers
    const fadeUp = (selector: string, delay = 0) => {
      gsap.utils.toArray<HTMLElement>(selector).forEach(el => {
        gsap.fromTo(el,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay,
            scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' } }
        );
      });
    };

    fadeUp('.about-lead');
    fadeUp('.about-body', 0.1);

    // Tags stagger
    gsap.utils.toArray<HTMLElement>('.about-tags .tag').forEach((tag, i) => {
      gsap.fromTo(tag,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, delay: i * 0.07, ease: 'power3.out',
          scrollTrigger: { trigger: '.about-tags', start: 'top 88%', toggleActions: 'play none none none' } }
      );
    });

    // Stat cards + counters
    gsap.utils.toArray<HTMLElement>('.stat-card').forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.6, delay: i * 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' } }
      );

      const numEl = card.querySelector<HTMLElement>('.stat-number');
      if (!numEl) return;
      const target = +(numEl.dataset['target'] ?? 0);
      ScrollTrigger.create({
        trigger: card, start: 'top 85%', once: true,
        onEnter: () => {
          gsap.to({ val: 0 }, {
            val: target, duration: 1.6, ease: 'power2.out',
            onUpdate() { numEl.textContent = Math.round((this as any).targets()[0].val).toString(); },
          });
        },
      });
    });
  }

  ngOnDestroy(): void {
    ScrollTrigger.getAll().forEach(t => t.kill());
  }
}

import {
  Component, Input, AfterViewInit, OnDestroy,
  signal, inject, ViewEncapsulation,
} from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PortfolioData, Testimonial } from '../../models/portfolio.model';
import { TranslationService } from '../../services/translation.service';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class TestimonialsComponent implements AfterViewInit, OnDestroy {
  @Input() data!: PortfolioData;
  readonly ts = inject(TranslationService);
  activeIndex = signal(0);
  private autoplayInterval?: ReturnType<typeof setInterval>;

  get testimonials(): Testimonial[] {
    return this.data?.testimonials ?? [];
  }

  ngAfterViewInit(): void {
    gsap.fromTo('.testimonials-wrapper',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.testimonials-wrapper', start: 'top 88%', toggleActions: 'play none none none' } }
    );

    this.autoplayInterval = setInterval(() => {
      this.goTo((this.activeIndex() + 1) % this.testimonials.length);
    }, 6000);
  }

  goTo(idx: number): void {
    if (idx === this.activeIndex()) return;
    const cards = document.querySelectorAll<HTMLElement>('.testimonial-card');
    const prev  = cards[this.activeIndex()];
    const next  = cards[idx];
    if (!prev || !next) return;

    gsap.to(prev, {
      opacity: 0, y: -20, duration: 0.3, ease: 'power2.in',
      onComplete: () => {
        this.activeIndex.set(idx);
        setTimeout(() => {
          gsap.fromTo(next, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' });
        });
      },
    });
  }

  prev(): void {
    this.goTo((this.activeIndex() - 1 + this.testimonials.length) % this.testimonials.length);
  }

  next(): void {
    this.goTo((this.activeIndex() + 1) % this.testimonials.length);
  }

  ngOnDestroy(): void {
    if (this.autoplayInterval) clearInterval(this.autoplayInterval);
    ScrollTrigger.getAll().forEach(t => t.kill());
  }
}

import {
  Component, Input, OnInit, AfterViewInit, OnDestroy,
  inject, signal, effect, ViewEncapsulation,
} from '@angular/core';
import { Subscription } from 'rxjs';
import gsap from 'gsap';
import { PortfolioData } from '../../models/portfolio.model';
import { AnimationStateService } from '../../services/animation-state.service';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeroComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() data!: PortfolioData;

  readonly ts = inject(TranslationService);
  private animState = inject(AnimationStateService);
  private sub?: Subscription;
  private typingTimeout?: ReturnType<typeof setTimeout>;

  typingText = signal('');
  private roleIdx  = 0;
  private charIdx  = 0;
  private deleting = false;
  private typingStarted = false;

  constructor() {
    effect(() => {
      const _lang = this.ts.lang(); // reactive dependency
      if (this.typingStarted) {
        this.restartTyping();
      }
    });
  }

  ngOnInit(): void {
    // scroll progress bar
    window.addEventListener('scroll', this.updateProgress, { passive: true });
  }

  ngAfterViewInit(): void {
    // Set initial invisible states
    gsap.set([
      '.hero-badge', '.hero-hi', '.hero-first', '.hero-last',
      '.hero-role', '.hero-desc', '.hero-actions', '.hero-socials', '.hero-scroll-hint',
    ], { opacity: 0 });
    gsap.set(['.hero-role', '.hero-desc', '.hero-actions', '.hero-socials'], { y: 30 });
    gsap.set(['.hero-hi', '.hero-first', '.hero-last'], { y: 50 });
    gsap.set('#heroVisual', { opacity: 0, x: 60 });

    this.sub = this.animState.preloaderDone$.subscribe(() => {
      this.animate();
      this.startTyping();
      this.typingStarted = true;
      this.setupMagnetic();
    });
  }

  private animate(): void {
    gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.2 })
      .to('.hero-badge',       { opacity: 1, y: 0, duration: 0.6 })
      .to('.hero-hi',          { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
      .to('.hero-first',       { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
      .to('.hero-last',        { opacity: 1, y: 0, duration: 0.6 }, '-=0.45')
      .to('.hero-role',        { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
      .to('.hero-desc',        { opacity: 1, y: 0, duration: 0.5 }, '-=0.3')
      .to('.hero-actions',     { opacity: 1, y: 0, duration: 0.5 }, '-=0.3')
      .to('.hero-socials',     { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
      .to('#heroVisual',       { opacity: 1, x: 0, duration: 0.9, ease: 'power2.out' }, '-=0.7')
      .to('.hero-scroll-hint', { opacity: 1, duration: 0.5 }, '-=0.3');

    // Mouse parallax on hero visual
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth  - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      gsap.to('.card-dev',    { x: -x * 0.8, y: -y * 0.8, duration: 1, ease: 'power2.out' });
      gsap.to('.card-remote', { x:  x * 0.6, y:  y * 0.6, duration: 1, ease: 'power2.out' });
    });
  }

  private setupMagnetic(): void {
    document.querySelectorAll<HTMLElement>('.magnetic').forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const r  = el.getBoundingClientRect();
        const dx = (e.clientX - r.left - r.width  / 2) * 0.35;
        const dy = (e.clientY - r.top  - r.height / 2) * 0.35;
        gsap.to(el, { x: dx, y: dy, duration: 0.4, ease: 'power3.out' });
      });
      el.addEventListener('mouseleave', () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
      });
    });
  }

  private restartTyping(): void {
    if (this.typingTimeout) clearTimeout(this.typingTimeout);
    this.roleIdx  = 0;
    this.charIdx  = 0;
    this.deleting = false;
    this.typingText.set('');
    this.startTyping();
  }

  private startTyping(): void {
    const roles = this.ts.roles();
    const type = () => {
      const current = roles[this.roleIdx];
      if (this.deleting) {
        this.typingText.set(current.substring(0, this.charIdx--));
        if (this.charIdx < 0) {
          this.deleting = false;
          this.roleIdx  = (this.roleIdx + 1) % roles.length;
          this.typingTimeout = setTimeout(type, 400);
          return;
        }
        this.typingTimeout = setTimeout(type, 50);
      } else {
        this.typingText.set(current.substring(0, this.charIdx++));
        if (this.charIdx > current.length) {
          this.deleting = true;
          this.typingTimeout = setTimeout(type, 2200);
          return;
        }
        this.typingTimeout = setTimeout(type, 80);
      }
    };
    setTimeout(type, 800);
  }

  private updateProgress = (): void => {
    const el  = document.getElementById('scroll-progress');
    if (!el) return;
    const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    el.style.width = pct + '%';
  };

  scrollTo(id: string, e: Event): void {
    e.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    if (this.typingTimeout) clearTimeout(this.typingTimeout);
    window.removeEventListener('scroll', this.updateProgress);
  }
}

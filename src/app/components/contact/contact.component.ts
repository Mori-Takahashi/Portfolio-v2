import {
  Component, Input, AfterViewInit, OnDestroy,
  signal, inject, ViewChild, ElementRef, ViewEncapsulation,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PortfolioData } from '../../models/portfolio.model';
import { TranslationService } from '../../services/translation.service';

declare global {
  interface Window {
    __cfTurnstileLoad?: () => void;
    turnstile?: {
      render: (el: HTMLElement, opts: object) => string;
      reset: (id: string) => void;
      remove: (id: string) => void;
    };
  }
}

gsap.registerPlugin(ScrollTrigger);

const TURNSTILE_SITEKEY = '0x4AAAAAAAw3NwmDISYzQJ5I';
// Sitekey	Behavior	Widget Type	Use case
// Sitekey Portf.: 0x4AAAAAAAw3NwmDISYzQJ5I
// 1x00000000000000000000AA	Always passes	Visible	Test successful form submissions
// 2x00000000000000000000AB	Always fails	Visible	Test error handling and retry logic
// 1x00000000000000000000BB	Always passes	Invisible	Test invisible widget success flows
// 2x00000000000000000000BB	Always fails	Invisible	Test invisible widget error handling
// 3x00000000000000000000FF	Forces interactive challenge	Visible	Test user interaction scenarios

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ContactComponent implements AfterViewInit, OnDestroy {
  @Input() data!: PortfolioData;
  @ViewChild('turnstileContainer') turnstileContainer!: ElementRef<HTMLDivElement>;

  readonly ts = inject(TranslationService);
  formData = { name: '', email: '', message: '', privacy: false };
  successMsg = signal('');
  sending    = signal(false);

  private turnstileToken = '';
  private widgetId: string | undefined;

  ngAfterViewInit(): void {
    gsap.fromTo('.contact-left',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-left', start: 'top 88%', toggleActions: 'play none none none' } }
    );
    gsap.fromTo('.contact-form',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.7, delay: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-form', start: 'top 88%', toggleActions: 'play none none none' } }
    );

    // Register callback for when Turnstile script finishes loading
    window.__cfTurnstileLoad = () => this.renderTurnstile();

    // If the script has already loaded before this component mounted
    if (window.turnstile) {
      this.renderTurnstile();
    }
  }

  private renderTurnstile(): void {
    if (this.widgetId !== undefined || !window.turnstile) return;
    this.widgetId = window.turnstile.render(this.turnstileContainer.nativeElement, {
      sitekey: TURNSTILE_SITEKEY,
      theme: 'dark',
      callback: (token: string) => { this.turnstileToken = token; },
      'expired-callback': () => { this.turnstileToken = ''; },
      'error-callback':   () => { this.turnstileToken = ''; },
    });
  }

  async onSubmit(): Promise<void> {
    const { name, email, message, privacy } = this.formData;

    if (!name.trim() || !email.trim() || !message.trim()) {
      this.showMsg(this.ts.t('form_fill_all'), false); return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      this.showMsg(this.ts.t('form_valid_email'), false); return;
    }
    if (!privacy) {
      this.showMsg(this.ts.t('form_agree_privacy'), false); return;
    }
    if (!this.turnstileToken) {
      this.showMsg(this.ts.t('form_captcha'), false); return;
    }

    this.sending.set(true);
    const btn = document.querySelector<HTMLElement>('.btn-submit');
    if (btn) gsap.to(btn, { scale: 0.97, duration: 0.2 });

    await new Promise(r => setTimeout(r, 1200));

    if (btn) gsap.to(btn, { scale: 1, duration: 0.3, ease: 'elastic.out(1, 0.5)' });
    this.showMsg(this.ts.t('form_sent'), true);
    this.formData = { name: '', email: '', message: '', privacy: false };
    this.turnstileToken = '';
    if (this.widgetId !== undefined) window.turnstile?.reset(this.widgetId);
    this.sending.set(false);
  }

  private showMsg(msg: string, ok: boolean): void {
    this.successMsg.set(msg);
    const el = document.querySelector<HTMLElement>('.form-success');
    if (el) {
      el.style.color = ok ? 'var(--orange)' : '#ff4444';
      gsap.fromTo(el, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 });
      setTimeout(() => gsap.to(el, { opacity: 0, duration: 0.4 }), 5000);
    }
  }

  ngOnDestroy(): void {
    if (this.widgetId !== undefined) window.turnstile?.remove(this.widgetId);
    delete window.__cfTurnstileLoad;
    ScrollTrigger.getAll().forEach(t => t.kill());
  }
}

import {
  Component, AfterViewInit, OnDestroy, signal, computed,
  inject, ViewEncapsulation,
} from '@angular/core';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import { TranslationService } from '../../services/translation.service';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class NavbarComponent implements AfterViewInit, OnDestroy {
  readonly ts = inject(TranslationService);
  mobileOpen = signal(false);

  readonly navItems = computed(() => [
    { id: 'about',        label: this.ts.t('nav_about') },
    { id: 'skills',       label: this.ts.t('nav_skills') },
    { id: 'projects',     label: this.ts.t('nav_projects') },
    { id: 'testimonials', label: this.ts.t('nav_reviews') },
    { id: 'contact',      label: this.ts.t('nav_contact') },
  ]);

  ngAfterViewInit(): void {
    this.setupScrollBehavior();
  }

  private setupScrollBehavior(): void {
    ScrollTrigger.create({
      start: 100,
      onEnter:     () => document.getElementById('navbar')?.classList.add('scrolled'),
      onLeaveBack: () => document.getElementById('navbar')?.classList.remove('scrolled'),
    });

    const sections = document.querySelectorAll<HTMLElement>('section[id]');
    window.addEventListener('scroll', () => {
      sections.forEach(sec => {
        const top  = sec.getBoundingClientRect().top;
        const link = document.querySelector<HTMLElement>(`.nav-link[href="#${sec.id}"]`);
        if (!link) return;
        link.classList.toggle('active', top <= 120 && top > -(sec.clientHeight * 0.5));
      });
    }, { passive: true });
  }

  toggleMobile(): void {
    this.mobileOpen.update(v => !v);
  }

  closeMobile(): void {
    this.mobileOpen.set(false);
  }

  scrollTo(id: string, event: Event): void {
    event.preventDefault();
    this.closeMobile();
    const target = document.getElementById(id);
    if (!target) return;
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
  }

  ngOnDestroy(): void {
    ScrollTrigger.getAll().forEach(t => t.kill());
  }
}

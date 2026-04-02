import { Component, inject, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  template: `
    <footer id="footer">
      <div class="container">
        <div class="footer-inner">
          <div class="footer-logo">LB<span class="accent">.</span></div>
          <p class="footer-copy">{{ ts.t('footer_copy') }}</p>
          <div class="footer-links">
            <a href="mailto:info@lyonelberzen.dev">{{ ts.t('footer_contact') }}</a>
            <span class="footer-sep">·</span>
            <a href="#hero" (click)="scrollTop($event)">{{ ts.t('footer_top') }}</a>
            <span class="footer-sep">·</span>
            <a routerLink="/impressum">Impressum</a>
            <span class="footer-sep">·</span>
            <a routerLink="/datenschutz">Datenschutz</a>
          </div>
        </div>
      </div>
    </footer>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class FooterComponent {
  readonly ts = inject(TranslationService);

  scrollTop(e: Event): void {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

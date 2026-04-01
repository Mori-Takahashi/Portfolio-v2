import { Component, AfterViewInit, inject, ViewEncapsulation } from '@angular/core';
import gsap from 'gsap';
import { AnimationStateService } from '../../services/animation-state.service';

@Component({
  selector: 'app-preloader',
  template: `
    <div id="preloader">
      <div class="preloader-inner">
        <div class="preloader-logo">LB<span class="accent">.</span></div>
        <div class="preloader-bar-track">
          <div class="preloader-bar-fill"></div>
        </div>
        <span class="preloader-text">Loading...</span>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class PreloaderComponent implements AfterViewInit {
  private animState = inject(AnimationStateService);

  ngAfterViewInit(): void {
    const fill = document.querySelector('.preloader-bar-fill') as HTMLElement;
    const logo = document.querySelector('.preloader-logo') as HTMLElement;
    const text = document.querySelector('.preloader-text') as HTMLElement;
    const el   = document.getElementById('preloader') as HTMLElement;
    if (!fill || !el) return;

    gsap.timeline()
      .to(fill, { width: '100%', duration: 1.2, ease: 'power2.inOut' })
      .to([logo, text], { opacity: 0, duration: 0.3, ease: 'power2.in' }, '-=0.2')
      .to(el, {
        yPercent: -100,
        duration: 0.7,
        ease: 'power3.inOut',
        onComplete: () => {
          el.style.display = 'none';
          this.animState.completePreloader();
        },
      });
  }
}

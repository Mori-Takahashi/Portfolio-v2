import { Component, AfterViewInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'app-cursor',
  template: `<div id="cursor-blob"></div>`,
  encapsulation: ViewEncapsulation.None,
})
export class CursorComponent implements AfterViewInit, OnDestroy {
  private mlListener?: () => void;
  private meListener?: () => void;
  private mmListener?: (e: MouseEvent) => void;
  private moListener?: (e: MouseEvent) => void;

  ngAfterViewInit(): void {
    const blob = document.getElementById('cursor-blob');
    if (!blob) return;

    this.mmListener = (e: MouseEvent) => {
      gsap.set(blob, { x: e.clientX, y: e.clientY });
    };

    this.mlListener = () => gsap.to(blob, { opacity: 0, duration: 0.3 });
    this.meListener = () => gsap.to(blob, { opacity: 1, duration: 0.3 });

    this.moListener = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target?.closest?.('a, button, .skill-card, .project-card, .stat-card, .tag, .ctrl-btn, .nav-cta')) {
        gsap.to(blob, { scale: 0.35, duration: 0.35, ease: 'power3.out' });
      } else {
        gsap.to(blob, { scale: 1,    duration: 0.35, ease: 'power3.out' });
      }
    };

    document.addEventListener('mousemove',  this.mmListener);
    document.addEventListener('mouseleave', this.mlListener);
    document.addEventListener('mouseenter', this.meListener);
    document.addEventListener('mouseover',  this.moListener);
  }

  ngOnDestroy(): void {
    if (this.mmListener) document.removeEventListener('mousemove',  this.mmListener);
    if (this.mlListener) document.removeEventListener('mouseleave', this.mlListener);
    if (this.meListener) document.removeEventListener('mouseenter', this.meListener);
    if (this.moListener) document.removeEventListener('mouseover',  this.moListener);
  }
}

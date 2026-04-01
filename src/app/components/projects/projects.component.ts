import {
  Component, Input, AfterViewInit, OnDestroy,
  inject, ViewEncapsulation,
} from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Project } from '../../models/portfolio.model';
import { TranslationService } from '../../services/translation.service';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ProjectsComponent implements AfterViewInit, OnDestroy {
  @Input() projects!: Project[];
  readonly ts = inject(TranslationService);
  ngAfterViewInit(): void {
    this.animate();
  }

  private animate(): void {
    gsap.utils.toArray<HTMLElement>('.project-card').forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 0.7, delay: (i % 2) * 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' },
        }
      );
    });
  }

  isValidUrl(url: string): boolean {
    return !!url && url.trim() !== '-' && url.trim() !== '';
  }

  ngOnDestroy(): void {
    ScrollTrigger.getAll().forEach(t => t.kill());
  }
}

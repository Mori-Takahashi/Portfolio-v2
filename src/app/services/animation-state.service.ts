import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

/** Koordiniert globale Animationszustände zwischen Komponenten */
@Injectable({ providedIn: 'root' })
export class AnimationStateService {
  private preloaderDoneSubject = new ReplaySubject<void>(1);
  readonly preloaderDone$ = this.preloaderDoneSubject.asObservable();

  completePreloader(): void {
    this.preloaderDoneSubject.next();
  }
}

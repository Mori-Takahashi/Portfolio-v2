import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/** Koordiniert globale Animationszustände zwischen Komponenten */
@Injectable({ providedIn: 'root' })
export class AnimationStateService {
  private preloaderDoneSubject = new Subject<void>();
  readonly preloaderDone$ = this.preloaderDoneSubject.asObservable();

  completePreloader(): void {
    this.preloaderDoneSubject.next();
  }
}

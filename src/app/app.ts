import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CursorComponent } from './components/cursor/cursor.component';
import { PreloaderComponent } from './components/preloader/preloader.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CursorComponent, PreloaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}

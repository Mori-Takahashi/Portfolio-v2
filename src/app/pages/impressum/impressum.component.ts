import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-impressum',
  imports: [RouterLink],
  templateUrl: './impressum.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ImpressumComponent {}

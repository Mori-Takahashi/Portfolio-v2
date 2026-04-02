import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-datenschutz',
  imports: [RouterLink],
  templateUrl: './datenschutz.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class DatenschutzComponent {}

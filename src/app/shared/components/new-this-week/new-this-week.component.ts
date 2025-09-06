import { Component, signal } from '@angular/core';
import { CarouselComponent } from '@shared/carousel';

@Component({
  selector: 'app-new-this-week',
  imports: [CarouselComponent],
  templateUrl: './new-this-week.component.html',
  styleUrl: './new-this-week.component.scss',
})
export class NewThisWeekComponent {
  readonly amount = signal<Number>(50);
}

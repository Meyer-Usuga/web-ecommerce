import { Component, effect, input, signal } from '@angular/core';

@Component({
  selector: 'app-accordion',
  imports: [],
  standalone: true,
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss',
})
export class AccordionComponent {
  readonly openingTitle = input<string>();
  readonly openDefault = input<boolean>(false);
  readonly isOpen = signal<boolean>(false);

  constructor() {
    effect(() => {
      this.isOpen.set(this.openDefault());
    });
  }

  toggleAccordion() {
    this.isOpen.update((prevState) => !prevState);
  }
}

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '@shared/button';

@Component({
  selector: 'app-empty-cart',
  imports: [ButtonComponent, RouterLink],
  standalone: true,
  templateUrl: './empty-cart.component.html',
  styleUrl: './empty-cart.component.scss',
})
export class EmptyCartComponent {
  readonly cartButtonStyles = {
    padding: '20px',
    'max-width': '300px',
    width: '100%',
    'border-radius': '16px',
  };
}

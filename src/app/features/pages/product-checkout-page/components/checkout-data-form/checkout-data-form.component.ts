import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BoxButtonComponent } from '@shared/box-button';

@Component({
  selector: 'app-checkout-data-form',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './checkout-data-form.component.html',
  styleUrl: './checkout-data-form.component.scss',
})
export class CheckoutDataFormComponent {
  readonly form = input.required<FormGroup>();
}

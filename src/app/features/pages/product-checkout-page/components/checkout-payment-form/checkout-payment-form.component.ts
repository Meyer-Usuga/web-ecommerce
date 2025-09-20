import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout-payment-form',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './checkout-payment-form.component.html',
  styleUrl: './checkout-payment-form.component.scss',
})
export class CheckoutPaymentFormComponent {
  readonly form = input.required<FormGroup>();
}

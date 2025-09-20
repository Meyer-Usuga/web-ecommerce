import { Component, effect, input } from '@angular/core';
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

  constructor() {
    effect(() => {
      this.setDefaultFields();
    });
  }

  setDefaultFields() {
    this.form().get('method')?.disable();
    this.form().get('cardNumber')?.disable();
    this.form().get('expDate')?.disable();
    this.form().get('cvv')?.disable();
    this.form().get('method')?.setValue('MASTERCARD');
    this.form().get('cardNumber')?.setValue('4000 1234 5678 9010');
    this.form().get('expDate')?.setValue('07/29');
    this.form().get('cvv')?.setValue('829');
  }

  onCheckInput(field: string) {
    return this.form().get(field)?.invalid && this.form().get(field)?.touched;
  }
}

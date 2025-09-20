import { Component, effect, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout-shipping-form',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './checkout-shipping-form.component.html',
  styleUrl: './checkout-shipping-form.component.scss',
})
export class CheckoutShippingFormComponent {
  readonly form = input.required<FormGroup>();

  constructor() {
    effect(() => {
      this.setDefaultFields();
    });
  }

  setDefaultFields() {
    this.form().get('method')?.disable();
    this.form().get('method')?.setValue('Entrega express');
    this.form().get('price')?.disable();
    this.form().get('price')?.setValue('0$');
  }

  onCheckInput(field: string) {
    return this.form().get(field)?.invalid && this.form().get(field)?.touched;
  }
}

import { Component, inject } from '@angular/core';
import {
  CheckoutDataFormComponent,
  CheckoutShippingFormComponent,
} from './components';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BoxButtonComponent } from '@shared/box-button';
import {
  BoxButtonSize,
  BoxButtonType,
  StepsCheckoutEnum,
} from '@interface/enums';
import { CheckoutPaymentFormComponent } from './components/checkout-payment-form';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-checkout-page',
  imports: [
    ReactiveFormsModule,
    BoxButtonComponent,
    CheckoutDataFormComponent,
    CheckoutShippingFormComponent,
    CheckoutPaymentFormComponent,
  ],
  standalone: true,
  templateUrl: './product-checkout-page.component.html',
  styleUrl: './product-checkout-page.component.scss',
})
export class ProductCheckoutPageComponent {
  readonly #router = inject(Router);
  readonly #formBuilder = new FormBuilder();
  readonly checkoutForm: FormGroup;

  readonly typeControl = BoxButtonType;
  readonly sizeControl = BoxButtonSize;
  readonly typeSteps = StepsCheckoutEnum;

  readonly listSteps = [
    {
      step: StepsCheckoutEnum.INFORMATION,
      active: true,
    },
    {
      step: StepsCheckoutEnum.SHIPPING,
      active: false,
    },
    {
      step: StepsCheckoutEnum.PAYMENT,
      active: false,
    },
  ];

  constructor() {
    this.checkoutForm = this.#formBuilder.group({
      customer: this.#formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', Validators.required],
        address: ['', Validators.required],
        city: ['', Validators.required],
        country: ['', Validators.required],
        zipCode: ['', Validators.required],
        state: ['', Validators.required],
      }),
      shipping: this.#formBuilder.group({
        method: ['', Validators.required],
        price: ['', Validators.required],
      }),
      payment: this.#formBuilder.group({
        method: ['', Validators.required],
        cardName: ['', Validators.required],
        cardNumber: ['', Validators.required],
        expDate: ['', Validators.required],
        cvv: ['', Validators.required],
      }),
    });
  }

  get customerForm(): FormGroup {
    return this.checkoutForm.get('customer') as FormGroup;
  }

  get shippingForm(): FormGroup {
    return this.checkoutForm.get('shipping') as FormGroup;
  }

  get paymentForm(): FormGroup {
    return this.checkoutForm.get('payment') as FormGroup;
  }

  onChangeStep(step: StepsCheckoutEnum) {
    this.listSteps.forEach((s) => (s.active = s.step === step));
  }
}

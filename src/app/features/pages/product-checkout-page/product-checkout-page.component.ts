import { Component, inject, signal } from '@angular/core';
import {
  CheckoutDataFormComponent,
  CheckoutShippingFormComponent,
  CheckoutPaymentFormComponent,
  CheckoutSummaryComponent,
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
import { Router } from '@angular/router';
import { StepsComponent } from '@shared/steps';
import { Steps } from '@interface/interfaces';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-checkout-page',
  imports: [
    ReactiveFormsModule,
    BoxButtonComponent,
    StepsComponent,
    CheckoutSummaryComponent,
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
  readonly #location = inject(Location);
  readonly #formBuilder = new FormBuilder();
  readonly checkoutForm: FormGroup;

  readonly typeControl = BoxButtonType;
  readonly sizeControl = BoxButtonSize;
  readonly typeSteps = StepsCheckoutEnum;

  readonly listSteps: Steps[] = [
    {
      step: StepsCheckoutEnum.INFORMATION,
      label: 'Información',
      active: true,
    },
    {
      step: StepsCheckoutEnum.SHIPPING,
      label: 'Envío',
      active: false,
    },
    {
      step: StepsCheckoutEnum.PAYMENT,
      label: 'Pago',
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

  get currentStepIndex(): number {
    return this.listSteps.findIndex((s) => s.active);
  }

  get currentStep(): Steps {
    return this.listSteps[this.currentStepIndex];
  }

  getForm(form: string): FormGroup {
    return this.checkoutForm.get(form) as FormGroup;
  }

  nextStep() {
    const index = this.currentStepIndex;
    const isValidFormStep = this.#onCheckFormFields();
    if (index < this.listSteps.length - 1 && isValidFormStep) {
      this.#onChangeStep(this.listSteps[index + 1].step);
    }
  }

  prevStep() {
    const index = this.currentStepIndex;
    if (index > 0) {
      this.#onChangeStep(this.listSteps[index - 1].step);
    }
  }

  goBack() {
    this.#location.back();
  }

  #getCurrentForm(): FormGroup {
    const stepKeys = ['customer', 'shipping', 'payment'] as const;
    return this.getForm(stepKeys[this.currentStepIndex]);
  }

  #onCheckFormFields(): boolean {
    const form = this.#getCurrentForm();
    if (form.invalid) {
      form.markAllAsTouched();
      return false;
    }
    return true;
  }

  #onChangeStep(step: StepsCheckoutEnum) {
    this.listSteps.forEach((s) => (s.active = s.step === step));
  }
}

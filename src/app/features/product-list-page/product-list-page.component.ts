import { Component } from '@angular/core';
import { NavbarComponent } from '@shared/navbar';

@Component({
  selector: 'app-product-list-page',
  imports: [NavbarComponent],
  standalone: true,
  templateUrl: './product-list-page.component.html',
  styleUrl: './product-list-page.component.scss',
})
export class ProductListPageComponent {}

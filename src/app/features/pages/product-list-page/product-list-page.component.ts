import { Component } from '@angular/core';
import { NavbarComponent } from '@shared/navbar';
import { SidebarFiltersComponent } from './components';
import { FooterComponent } from '@shared/footer';

@Component({
  selector: 'app-product-list-page',
  imports: [NavbarComponent, FooterComponent, SidebarFiltersComponent],
  standalone: true,
  templateUrl: './product-list-page.component.html',
  styleUrl: './product-list-page.component.scss',
})
export class ProductListPageComponent {}

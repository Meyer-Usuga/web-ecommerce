import { Component } from '@angular/core';
import { CarouselComponent } from '@shared/carousel';
import { NavbarComponent } from '@shared/navbar';
import { ProductComponent } from '@shared/product';
import { SearchInputComponent } from '@shared/search-input';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    SearchInputComponent,
    ProductComponent,
    CarouselComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}

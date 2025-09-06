import { Component } from '@angular/core';
import { CarouselComponent } from '@shared/carousel';
import { FooterComponent } from '@shared/footer';
import { NavbarComponent } from '@shared/navbar';
import { ProductComponent } from '@shared/product';
import { SearchInputComponent } from '@shared/search-input';
import { NewThisWeekComponent } from '@shared/new-this-week';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    SearchInputComponent,
    ProductComponent,
    FooterComponent,
    NewThisWeekComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}

import { Component, input } from '@angular/core';

@Component({
  selector: 'app-product-gallery',
  imports: [],
  standalone: true,
  templateUrl: './product-gallery.component.html',
  styleUrl: './product-gallery.component.scss',
})
export class ProductGalleryComponent {
  readonly image = input.required<string | undefined>();
}

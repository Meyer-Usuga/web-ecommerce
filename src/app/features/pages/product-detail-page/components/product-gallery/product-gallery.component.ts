import { Component, input } from '@angular/core';
import { ImageComponent } from '@shared/image';

@Component({
  selector: 'app-product-gallery',
  imports: [ImageComponent],
  standalone: true,
  templateUrl: './product-gallery.component.html',
  styleUrl: './product-gallery.component.scss',
})
export class ProductGalleryComponent {
  readonly image = input.required<string | undefined>();
}

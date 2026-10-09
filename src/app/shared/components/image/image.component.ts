import {
  afterNextRender,
  Component,
  ElementRef,
  input,
  linkedSignal,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'app-image',
  imports: [],
  standalone: true,
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss',
})
export class ImageComponent {
  readonly src = input.required<string | undefined>();
  readonly alt = input<string>('');
  readonly imageRef = viewChild.required<ElementRef<HTMLImageElement>>('image');
  readonly isLoaded = linkedSignal({
    source: this.src,
    computation: () => false,
  });

  constructor() {
    afterNextRender(() => {
      const { complete, naturalWidth } = this.imageRef().nativeElement;
      if (complete && naturalWidth > 0) {
        this.onLoad();
      }
    });
  }

  onLoad() {
    this.isLoaded.set(true);
  }
}

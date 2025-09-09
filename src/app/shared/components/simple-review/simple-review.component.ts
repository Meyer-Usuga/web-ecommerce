import { Component, computed, input } from '@angular/core';
import { Review } from '@interface/interfaces';

const DEFAULT_AVATAR = 'user.svg';

@Component({
  selector: 'app-simple-review',
  imports: [],
  templateUrl: './simple-review.component.html',
  styleUrl: './simple-review.component.scss',
})
export class SimpleReviewComponent {
  readonly review = input.required<Review>();
  readonly avatar = computed(() => {
    const image = this.review().image;
    return image ? image : DEFAULT_AVATAR;
  });
}

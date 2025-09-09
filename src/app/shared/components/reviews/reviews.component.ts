import { Component } from '@angular/core';
import { Review } from '@interface/interfaces';
import { SimpleReviewComponent } from '@shared/simple-review';

@Component({
  selector: 'app-reviews',
  imports: [SimpleReviewComponent],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss',
})
export class ReviewsComponent {
  readonly listReviews: Review[] = [
    {
      user: 'Rafael Cano',
      stars: 4,
      content: 'Buen producto. Compré una camisa y excelente calidad.',
      date: new Date(),
    },
    {
      user: 'Natalia Paris',
      stars: 1,
      content:
        'La prenda llegó 1 mes después, pedí el reembolso y no respondieron.',
      date: new Date(),
    },
    {
      user: 'Carlos Mendoza',
      stars: 4,
      content:
        'El producto llegó a tiempo y en buen estado. La calidad es bastante buena, aunque el empaque podría mejorar un poco. En general, estoy satisfecho con la compra y probablemente volveré a pedir.',
      date: new Date(),
    },
    {
      user: 'Laura Gómez',
      stars: 2,
      content:
        'La prenda no cumplió con mis expectativas. El color era diferente al de las fotos y la talla quedó un poco ajustada. Intenté comunicarme con el soporte, pero tardaron demasiado en responder. Una experiencia regular.',
      date: new Date(),
    },
  ];
}

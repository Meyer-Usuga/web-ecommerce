import { Component, input, output, signal } from '@angular/core';
import { StepsEnum } from '@interface/enums';
import { Steps } from '@interface/interfaces';
import { TransformCasePipe } from '@interface/pipes';

@Component({
  selector: 'app-steps',
  imports: [TransformCasePipe],
  standalone: true,
  templateUrl: './steps.component.html',
  styleUrl: './steps.component.scss',
})
export class StepsComponent {
  readonly steps = input.required<Steps[]>();
  readonly onChange = output<StepsEnum>();
  readonly typeSteps = StepsEnum;

  onChangeStep(step: StepsEnum) {
    this.onChange.emit(step);
  }
}

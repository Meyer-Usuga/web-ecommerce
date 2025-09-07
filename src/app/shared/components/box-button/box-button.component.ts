import { Component, input, output } from '@angular/core';
import { BoxButtonType } from '@interface/enums';

@Component({
  selector: 'app-box-button',
  imports: [],
  templateUrl: './box-button.component.html',
  styleUrl: './box-button.component.scss',
})
export class BoxButtonComponent {
  readonly text = input<string | undefined>('');
  readonly disabled = input<boolean>(false);
  readonly onClick = output<void>();
  readonly typeControl = input.required<BoxButtonType>();

  handleClickButton() {
    this.onClick.emit();
  }
}

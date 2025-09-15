import { Component, input, output } from '@angular/core';
import { BoxButtonType, BoxButtonSize } from '@interface/enums';

@Component({
  selector: 'app-box-button',
  imports: [],
  templateUrl: './box-button.component.html',
  styleUrl: './box-button.component.scss',
})
export class BoxButtonComponent {
  readonly text = input<string | undefined>('');
  readonly typeControl = input.required<BoxButtonType>();
  readonly sizeControl = input<BoxButtonSize>();
  readonly disabled = input<boolean>(false);
  readonly checked = input<boolean>(false);
  readonly onClick = output<void>();

  handleClickButton() {
    this.onClick.emit();
  }
}

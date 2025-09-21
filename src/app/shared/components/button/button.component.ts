import { NgStyle } from '@angular/common';
import { Component, input, output } from '@angular/core';

type InputType = 'primary' | 'secondary' | 'underline' | 'bottomless';

@Component({
  selector: 'app-button',
  imports: [NgStyle],
  standalone: true,
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  readonly text = input<string>();
  readonly icon = input<string>();
  readonly type = input<InputType>();
  readonly onClick = output<void>();
  readonly customStyles = input<{ [key: string]: string } | {}>();

  handleClickButton() {
    this.onClick.emit();
  }
}

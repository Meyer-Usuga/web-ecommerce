import { NgStyle } from '@angular/common';
import { Component, input } from '@angular/core';

type InputType = 'primary' | 'secondary'; 

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
  readonly styles = input<{ [key: string]: string }>();
}

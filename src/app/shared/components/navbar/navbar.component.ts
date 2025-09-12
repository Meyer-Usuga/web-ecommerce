import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '@shared/button';
import { SidebarComponent } from '@shared/sidebar';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ButtonComponent, SidebarComponent, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  readonly cartButtonStyles = {
    padding: '20px',
    'max-width': '80px',
    width: '100%',
    'border-radius': '16px',
  };

  readonly stateSidebar = signal(false);

  toggleSidebar() {
    this.stateSidebar.update((state) => !state);
  }
}

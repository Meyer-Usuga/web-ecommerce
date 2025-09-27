import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '@interface/services';
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
  readonly #cartService = inject(CartService);
  readonly cartSize = this.#cartService.cartSize;

  readonly cartButtonStyles = {
    padding: '20px',
    'max-width': '60px',
    width: '100%',
    'border-radius': '24px',
  };

  readonly stateSidebar = signal(false);

  toggleSidebar() {
    this.stateSidebar.update((state) => !state);
  }
}

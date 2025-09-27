import {
  Component,
  ElementRef,
  HostListener,
  inject,
  input,
  output,
  signal,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  imports: [],
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  @ViewChild('sidebar') sidebarRef!: ElementRef;
  readonly themeSidebar = input<'dark' | 'light'>('dark');
  readonly openSidebar = input<boolean>();
  readonly closeSidebar = output<void>();

  toggleSidebar() {
    this.closeSidebar.emit();
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const clickInSide = this.sidebarRef.nativeElement.contains(event.target);
    if (!clickInSide && this.openSidebar()) {
      this.closeSidebar.emit();
    }
  }
}

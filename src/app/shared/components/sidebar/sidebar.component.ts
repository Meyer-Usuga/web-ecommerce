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
import { SidebarFiltersComponent } from '@feature/pages/product-list-page/components';
import { FilterValue } from '@interface/interfaces';
import { FiltersService } from '@interface/services';

@Component({
  selector: 'app-sidebar',
  imports: [SidebarFiltersComponent],
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  @ViewChild('sidebar') sidebarRef!: ElementRef;

  readonly #filtersService = inject(FiltersService);
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

  onSelectFilter(filter: FilterValue) {
    this.#filtersService.updateQueryParams(filter);
  }
}

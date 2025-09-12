import { Component } from '@angular/core';
import { BoxButtonType } from '@interface/enums';
import { BoxButtonComponent } from '@shared/box-button';
import { AccordionComponent } from '../accordion';
import { AccordionItemComponent } from '../accordion-item';

@Component({
  selector: 'app-sidebar-filters',
  imports: [BoxButtonComponent, AccordionComponent, AccordionItemComponent],
  standalone: true,
  templateUrl: './sidebar-filters.component.html',
  styleUrl: './sidebar-filters.component.scss',
})
export class SidebarFiltersComponent {
  readonly typeControl = BoxButtonType;

  /**
   * TODO:
   * Implementar servicio para obtener listado de filtros.
   * Métodos de ordenamiento y manejo de URL params.
   */

  onChangeFilter() {
    //TODO: Implementar
  }
}

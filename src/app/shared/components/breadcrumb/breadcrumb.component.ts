import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Breadcrumb } from '@interface/interfaces';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumb',
  imports: [RouterLink],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
})
export class BreadcrumbComponent {
  readonly #router = inject(Router);
  readonly breadcrumbs = signal<Array<Breadcrumb>>([]);

  constructor() {
    this.#router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.#buildBreadcrumbs());
    this.#buildBreadcrumbs();
  }

  #buildBreadcrumbs() {
    const urlSegments = this.#router.url.split('/').filter((s) => s);
    const breadcrumbs: Array<Breadcrumb> = [];
    let accumulatedPath = '';

    for (const segment of urlSegments) {
      const withoutParams = segment.split('?')[0];
      accumulatedPath += '/' + withoutParams;
      breadcrumbs.push({
        label: this.#formatLabel(withoutParams),
        url: accumulatedPath,
      });
    }

    this.breadcrumbs.set(breadcrumbs);
  }

  #formatLabel(segment: string): string {
    return segment.charAt(0).toUpperCase() + segment.slice(1);
  }
}

import { Component, input, OnDestroy, output } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-search-input',
  imports: [],
  standalone: true,
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss',
})
export class SearchInputComponent implements OnDestroy {
  readonly defaultValue = input<string | undefined>('');
  readonly searchText = output<string>();
  private searchSubject = new Subject<string>();

  constructor() {
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => {
        this.searchText.emit(value);
      });
  }

  onChangeText(event: Event) {
    const text = event.target as HTMLInputElement;
    this.searchSubject.next(text.value);
  }

  ngOnDestroy(): void {
    this.searchSubject.complete();
  }
}

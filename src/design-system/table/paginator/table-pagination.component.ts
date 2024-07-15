import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { patchState } from '@ngrx/signals';
import { IconComponent } from 'design-system/icon/icon.component';
import { UsersStore } from 'shared/users.store';

@Component({
  selector: 'app-table-paginator',
  templateUrl: 'table-paginator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  standalone: true
})
export class TablePaginatorComponent {
  readonly store = inject(UsersStore);

  public readonly _currentPage = computed(() => this.store.currentPage());
  public readonly _itemsPerPage = computed(() => this.store.usersPerPage());

  protected totalPages = computed(() => Math.ceil(this.store.users().length / this._itemsPerPage()) - 1)

  protected changed(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    patchState(this.store, { usersPerPage: +selectElement?.value })
  }
  protected nextPage(): void {
    patchState(this.store, { currentPage: this._currentPage() + 1 })
  }

  protected previousPage(): void {
    patchState(this.store, { currentPage: this._currentPage() - 1 })
  }

  protected toTheStart(): void {
    patchState(this.store, { currentPage: 0 })
  }

  protected toTheEnd(): void {
    patchState(this.store, { currentPage: this.totalPages() })
  }
}

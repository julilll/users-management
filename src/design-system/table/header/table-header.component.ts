import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { IconComponent } from 'design-system/icon/icon.component';
import { patchState } from '@ngrx/signals';
import { UsersStore } from 'shared/users.store';
import type { User } from 'shared/db-models.interface';

@Component({
  selector: 'app-table-header',
  template: `
    <div class="flex flex-row gap-2 w-full font-extralight px-5">
      <p class="basis-1/4 cursor-pointer" (click)="changeOrder('name')">{{getPrefix('name')}} Name</p>
      <p class="basis-1/4 cursor-pointer" (click)="changeOrder('email')">{{getPrefix('email')}} Email</p>
      <p class="basis-1/4">Phone</p>
      <p class="basis-1/4">Website</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  standalone: true
})
export class TableHeaderComponent {
  readonly store = inject(UsersStore);

  public readonly _sortDirection = computed(() => this.store.sortDirection());
  public readonly _sortField = computed(() => this.store.sortField());

  protected changeOrder(field: keyof User): void {
    patchState(this.store, { sortDirection: this._sortDirection() === 'asc' ? 'des' : 'asc', sortField: field })
  }

  protected getPrefix(field: keyof User): string {
    return this._sortField() === field ? this._sortDirection() === 'asc' ? '↓' : '↑' : '';
  }
}

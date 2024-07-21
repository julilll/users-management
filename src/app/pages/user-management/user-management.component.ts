import { Component, OnInit, Signal, ViewChild, computed, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { patchState } from '@ngrx/signals';
import { NgClass } from '@angular/common';
import { User, ViewMode } from 'shared/db-models.interface';
import { UsersStore } from 'shared/users.store';
import { TableComponent } from 'design-system/table/table.component';
import { AppTitleComponent } from 'design-system/title/title.component';
import { IconComponent } from 'design-system/icon/icon.component';
import { SearchInputComponent } from 'design-system/search-input/search-input.component';
import { TilesComponent } from 'design-system/tiles/tiles.component';
import { ModalComponent } from 'design-system/modal/modal.component';

@Component({
  selector: 'user-management-page',
  standalone: true,
  imports: [RouterOutlet, TableComponent, AppTitleComponent, SearchInputComponent, IconComponent, NgClass, TilesComponent, ModalComponent],
  providers: [UsersStore],
  templateUrl: './user-management.component.html'
})
export class UserManagementComponent {
  @ViewChild(ModalComponent) modal!: ModalComponent;
  readonly store = inject(UsersStore);
  public readonly _filter = computed(() => this.store.filter());
  public readonly _view = computed(() => this.store.view());

  constructor() {
    this.store.loadAll()
  }

  protected filterItems(event: string): void {
    this.store.filterItems(event)
  }

  protected changeView(viewMode: ViewMode): void {
    patchState(this.store, { view: viewMode })
  }

  protected createItem() {
    this.modal.openModal();
  }

  protected updateItem(event: User) {
    this.modal.openModal(event);
  }

  protected handleFormSubmit(values: any) {
    if (!values?.id) {
      this.store.addUser(values)
    } else {
      this.store.updateUser(values)
    }
  }

  protected hangleUserToDelete(id: User['id']) {
    if (window.confirm('Are you sure you want to delete this user')) {
      this.store.deleteUser(id)
    }
  }
}

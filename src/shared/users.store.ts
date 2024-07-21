import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { HttpService } from "../services/http.service";
import { computed, inject } from "@angular/core";
import type { User, UsersState } from "shared/db-models.interface";
import { sortedValues, updatedCurrentPage, UUID } from "./utils";

const initialState: UsersState = {
  users: [],
  isLoading: false,
  error: null,
  currentPage: 0,
  usersPerPage: 5,
  sortDirection: 'asc',
  sortField: 'name',
  filter: '',
  view: 'list'
}

export const UsersStore = signalStore(
  { providedIn: 'root'},
  withState(initialState),
  withComputed(({ users, filter, sortDirection, currentPage, usersPerPage, sortField }) => ({
    processedUsers: computed(() => {
      return users()
      .filter(el => el.name.toLowerCase().includes(filter().toLowerCase()))
      .sort((a, b) => sortedValues(a, b, sortDirection(), sortField()))
      .slice(currentPage() * usersPerPage(), (currentPage() + 1) * usersPerPage())
    }),
  })),
  withMethods((store, httpService = inject(HttpService)) => ({
    updatePerPageCount(numberOfItems: number) {
      patchState(store, { usersPerPage: numberOfItems, currentPage: updatedCurrentPage(store.usersPerPage(), numberOfItems, store.currentPage()) })
    },
    filterItems(filterby: string) {
      patchState(store, { filter: filterby, currentPage: 0 })
    },
    loadAll() {
      patchState(store, { isLoading: true });
      httpService.getUsers().subscribe({
        next: (users) => {
          patchState(store, { users, isLoading: false });
        },
        error: (error) => patchState(store, { error, isLoading: false })
      })
    },
    addUser(user: User) {
      patchState(store, (state) => ({ users: state.users.concat({...user, id: UUID(store.users()) }) }));
    },
    updateUser(user: User) {
      patchState(store, (state) => ({ users: state.users.map(i => user.id === i.id ? user : i) }));
    },
    deleteUser(id: User['id']) {
      patchState(store, (state) => ({ users: state.users.filter(prod => prod.id !== id) }));
    }
  }))
)

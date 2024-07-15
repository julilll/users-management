import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { HttpService } from "../services/http.service";
import { computed, inject } from "@angular/core";
import type { User, ViewMode } from "shared/db-models.interface";

type UsersState = {
  users: User[];
  isLoading: boolean;
  error: string | null,
  currentPage: number;
  usersPerPage: number,
  sort: 'asc' | 'des',
  sortField: keyof User,
  filter: string,
  view: ViewMode
}

const initialState: UsersState = {
  users: [],
  isLoading: false,
  error: null,
  currentPage: 0,
  usersPerPage: 5,
  sort: 'asc',
  sortField: 'name',
  filter: '',
  view: 'list'
}

export const UsersStore = signalStore(
  { providedIn: 'root'},
  withState(initialState),
  withComputed(({ users, filter, sort, currentPage, usersPerPage, sortField }) => ({
    processedUsers: computed(() => {
      return users()
      .filter(el => el.name.toLowerCase().includes(filter().toLowerCase()))
      .sort((a, b) => {
        const [valA, valB] = [a[sortField()], b[sortField()]];
        if (typeof valA === 'string' && typeof valB === 'string') {
          return sort() === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
        } else if (valA && valB) {
          return sort() === 'asc' ? (valA > valB ? 1 : -1) : (valA < valB ? 1 : -1);
        } else return -1;
      })
      .slice(currentPage() * usersPerPage(), (currentPage() + 1) * usersPerPage())
    }),
  })),
  withMethods((store, httpService = inject(HttpService)) => ({
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
      patchState(store, (state) => ({ users: state.users.concat(user), isLoading: false }));
    },
    updateUser(user: User) {
      patchState(store, (state) => ({ users: state.users.map(i => user.id === i.id ? user : i), isLoading: false }));
    },
    deleteUser(id: User['id']) {
      patchState(store, (state) => ({ users: state.users.filter(prod => prod.id !== id), isLoading: false }));
    }
  }))
)

export interface User {
  id?: number | undefined,
  name: string,
  username?: string | undefined,
  email: string,
  address?: {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: {
      lat: string,
      lng: string
    }
  } | undefined
  phone: string,
  website: string,
  company?: {
    name: string,
    catchPhrase: string,
    bs: string
  } | undefined
}

export type ViewMode = 'list' | 'grid';

export type UsersState = {
  users: User[];
  isLoading: boolean;
  error: string | null,
  currentPage: number;
  usersPerPage: number,
  sortDirection: 'asc' | 'des',
  sortField: keyof User,
  filter: string,
  view: ViewMode
}

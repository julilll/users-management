import { User, UsersState } from "./db-models.interface"

export const updatedCurrentPage = (oldCount: number, newCount: number, currentPage: number): number => Math.floor(oldCount * currentPage / newCount)

export const UUID = (users: User[]) => Math.max(...users.map(user => user.id).map(Number)) + 1

export const sortedValues = (a: User, b: User, direction: UsersState['sortDirection'], field: UsersState['sortField']): number => {
  const [valA, valB] = [a[field], b[field]];
  if (typeof valA === 'string' && typeof valB === 'string') {
    return direction === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
  } else if (valA && valB) {
    return direction === 'asc' ? (valA > valB ? 1 : -1) : (valA < valB ? 1 : -1);
  } else return -1;
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import type { User } from 'shared/db-models.interface';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private apiUrl = 'https://jsonplaceholder.typicode.com';
  private usersApi = this.apiUrl + '/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersApi).pipe(catchError((error: any) => {throw error.message}))
  }
}

import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {APIRoute, BASE_URL} from '../constants/const';
import {getHttpDefaultPipes} from '../utils/rxjs-operators';
import {Credentials} from '../models/credentials';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);

  public checkAuth(): Observable<User> {
    return this.http.get<User>(`${BASE_URL}/${APIRoute.LOGIN}`).pipe(...getHttpDefaultPipes<User>());
  }

  public login(credentials: Credentials): Observable<User> {
    return this.http.post<User>(`${BASE_URL}/${APIRoute.LOGIN}`, credentials).pipe(...getHttpDefaultPipes<User>());
  }

  public logout(): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/${APIRoute.LOGOUT}`).pipe(...getHttpDefaultPipes<void>());
  }
}

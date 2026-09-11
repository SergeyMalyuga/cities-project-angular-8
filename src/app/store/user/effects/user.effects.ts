import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AuthService} from '../../../core/services/auth.service';
import * as UserActions from '../actions/user.actions';
import {catchError, map, of, switchMap} from 'rxjs';
import {UserService} from '../../../core/services/user.service';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserEffects {
  private actions$ = inject(Actions);
  private userService = inject(UserService);
  private authService = inject(AuthService);

  public checkAuth$ = createEffect(() =>
    this.actions$.pipe(ofType(UserActions.checkAuth),
      switchMap(() => this.userService.checkAuth()
        .pipe(map(user => UserActions.checkAuthSuccess({user})),
          catchError((error: HttpErrorResponse) => of(UserActions.checkAuthFailure({error})))))));
}

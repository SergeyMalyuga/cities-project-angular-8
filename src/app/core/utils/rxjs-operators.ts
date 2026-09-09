import {catchError, MonoTypeOperatorFunction, retry, throwError, timeout, timer} from 'rxjs';
import {RETRY_ATTEMPTS, TIMEOUT_MS} from '../constants/const';
import {HttpErrorResponse} from '@angular/common/http';
import {httpErrorHandler} from './http-error-handler';

export function getHttpDefaultPipes<T>(): [MonoTypeOperatorFunction<T>, MonoTypeOperatorFunction<T>, MonoTypeOperatorFunction<T>] {
  return [
    timeout(TIMEOUT_MS),
    retry({
      count: RETRY_ATTEMPTS,
      delay: (err: HttpErrorResponse) => {
        if (err.status === 0 || err.status >= 500) {
          return timer(1500);
        }
        return throwError(() => err);
      }
    }),
    catchError(httpErrorHandler)
  ]
}

import {AuthorizationStatus} from '../constants/const';

export function isAuth(status: AuthorizationStatus): boolean {
  return status === AuthorizationStatus.AUTH;
}

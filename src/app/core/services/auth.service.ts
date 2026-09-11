import {Injectable} from '@angular/core';
import {AUTH_TOKEN_KEY_NAME} from '../constants/const';
import {Token} from '../models/token';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public getToken() {
    try {
      return localStorage.getItem(AUTH_TOKEN_KEY_NAME);
    } catch (error) {
      console.error('Error get token from local storage:', error);
      return null
    }
  }

  public setToken(token: Token): boolean {
    try {
      localStorage.setItem(AUTH_TOKEN_KEY_NAME, token)
      return true;
    } catch (error) {
      console.error('Error set token from local storage:', error);
      return false;
    }
  }

  public removeToken() {
    try {
      localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
      return true;
    } catch (error) {
      console.error('Error remove token from local storage:', error);
      return false;
    }
  }
}

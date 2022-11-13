import {Injectable} from '@angular/core';
import {AuthService} from "../service/auth.service";

const USER_ID = "UserId"
const USERNAME_KEY = 'AuthUsername';
const ROLE_KEY = 'AuthAuthorities';

@Injectable({
  providedIn: 'root'
})
export class AuthStorageService {
  constructor(private authService: AuthService) {
  }

  signOut() {
    this.authService.logout()
    sessionStorage.clear();
  }

  public saveUserId(userId: string) {
    sessionStorage.removeItem(USER_ID);
    sessionStorage.setItem(USER_ID, userId);
  }

  public getUserId() {
    return sessionStorage.getItem(USER_ID)
  }

  public saveUsername(username: string) {
    sessionStorage.removeItem(USERNAME_KEY);
    sessionStorage.setItem(USERNAME_KEY, username);
  }

  public getUsername(): string | null {
    return sessionStorage.getItem(USERNAME_KEY);
  }

  public saveRole(role: string) {
    sessionStorage.removeItem(ROLE_KEY);
    sessionStorage.setItem(ROLE_KEY, role);
  }

  public getRole(): string | null {
    if (sessionStorage.getItem(ROLE_KEY)) {
      return sessionStorage.getItem(ROLE_KEY);
    }
    return null;
  }
}

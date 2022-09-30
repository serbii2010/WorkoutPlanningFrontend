import {Injectable} from '@angular/core';

const USERNAME_KEY = 'AuthUsername';
const ROLE_KEY = 'AuthAuthorities';

@Injectable({
  providedIn: 'root'
})
export class AuthStorageService {
  signOut() {
    sessionStorage.clear();
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

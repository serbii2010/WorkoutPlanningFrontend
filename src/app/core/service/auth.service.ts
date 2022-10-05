import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

import {LoginResponse} from '../auth/login-response';
import {AuthLoginInfo} from '../auth/login-info';
import {SignUpInfo} from '../auth/signup-info';
import {Role} from '../account/role'

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:8000',
      'Access-Control-Allow-Credentials': 'true'
    }),
  withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:8000/api/auth/login';
  private signupClientUrl = 'http://localhost:8000/api/client-accounts';
  private signupTrainerUrl = 'http://localhost:8000/api/trainer-accounts';

  constructor(private http: HttpClient) {
  }

  attemptAuth(body: AuthLoginInfo): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.loginUrl, body, httpOptions);
  }

  signUp(info: SignUpInfo, typeUser: Role): Observable<string> {
    switch (typeUser) {
      case Role.CLIENT:
        return this.http.post<string>(this.signupClientUrl, info, httpOptions);
      case Role.TRAINER:
        return this.http.post<string>(this.signupTrainerUrl, info, httpOptions);
      default:
        return this.http.post<string>(this.signupClientUrl, info, httpOptions);
    }
  }
}

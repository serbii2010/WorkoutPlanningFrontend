import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {LoginResponse} from '../auth/login-response';
import {AuthLoginInfo} from '../auth/login-info';
import {SignUpInfo} from '../auth/signup-info';
import {Role} from '../account/role'
import {RoleInfo} from "../auth/role-info";
import {BaseService} from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = this.baseService.baseUrl+'auth/login';
  private logoutUrl = this.baseService.baseUrl+'auth/logout';
  private signupClientUrl = this.baseService.baseUrl+'client-accounts';
  private signupTrainerUrl = this.baseService.baseUrl+'trainer-accounts';
  private getRoleUrl = this.baseService.baseUrl+'auth/role';
  private restoreAccessUrl = this.baseService.baseUrl+'auth/reset-password';
  private sendCodeUrl = this.baseService.baseUrl+'auth/code';
  public loginWithGoogleUrl = 'http://localhost:8000/oauth2/authorization/google?redirect_uri=http://localhost:4200/auth/login';

  constructor(private baseService: BaseService,
              private http: HttpClient) {
  }

  attemptAuth(body: AuthLoginInfo): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.loginUrl, body, this.baseService.httpOptions);
  }

  signUp(info: SignUpInfo, typeUser: Role): Observable<string> {
    switch (typeUser) {
      case Role.CLIENT:
        return this.http.post<string>(this.signupClientUrl, info, this.baseService.httpOptions);
      case Role.TRAINER:
        return this.http.post<string>(this.signupTrainerUrl, info, this.baseService.httpOptions);
      default:
        return this.http.post<string>(this.signupClientUrl, info, this.baseService.httpOptions);
    }
  }

  logout() {
    this.http.get(this.logoutUrl, this.baseService.httpOptions).subscribe();
  }

  getCurrentRole(): Observable<RoleInfo> {
    return this.http.get<RoleInfo>(this.getRoleUrl, this.baseService.httpOptions)
  }

  restoreAccess(value: string): Observable<any> {
    return this.http.post(this.restoreAccessUrl, {email: value}, this.baseService.httpOptions)
  }

  sendCode(code: string, password: string): Observable<any> {
    return this.http.post(this.sendCodeUrl, {code: code, password: password}, this.baseService.httpOptions)
  }
}

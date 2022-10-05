import {Injectable} from '@angular/core';
import {Role} from "../account/role";
import {Observable} from "rxjs";
import {AccountInfo} from "../account/account-info";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {EditAccountRequest} from "../account/edit-account-request";

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
export class AccountService {
  private baseAccountUrl = 'http://localhost:8000/api/accounts/'

  constructor(private http: HttpClient) { }

  getAccounts(typeUser: Role): Observable<AccountInfo[]> {
    switch (typeUser) {
      case Role.ADMIN:
        return this.http.get<AccountInfo[]>(this.baseAccountUrl+'?role=admin', httpOptions)
      case Role.TRAINER:
        return this.http.get<AccountInfo[]>(this.baseAccountUrl+'?role=trainer', httpOptions)
      case Role.CLIENT:
        return this.http.get<AccountInfo[]>(this.baseAccountUrl+'?role=client', httpOptions)
    }
  }

  getAccount(id: number): Observable<AccountInfo> {
    return this.http.get<AccountInfo>(this.baseAccountUrl+id.toString(), httpOptions)
  }

  setActive(active: boolean, username: string): Observable<any> {
    if (active) {
      return this.http.put(this.baseAccountUrl+username+'/activate', null, httpOptions)
    } else {
      return this.http.put(this.baseAccountUrl+username+'/deactivate', null, httpOptions)
    }
  }

  editAccount(dataRequest: EditAccountRequest, username: string | null): Observable<AccountInfo> {
    return this.http.put<AccountInfo>(this.baseAccountUrl+username, dataRequest, httpOptions)
  }
}

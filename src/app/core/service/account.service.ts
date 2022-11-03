import {Injectable} from '@angular/core';
import {Role} from "../account/role";
import {Observable} from "rxjs";
import {AccountInfo} from "../account/account-info";
import {HttpClient} from "@angular/common/http";
import {EditAccountRequest} from "../account/edit-account-request";
import {BaseService} from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseAccountUrl = this.baseService.baseUrl+'accounts/'

  constructor(private baseService: BaseService, private http: HttpClient) { }

  getAccounts(typeUser: Role): Observable<AccountInfo[]> {
    switch (typeUser) {
      case Role.ADMIN:
        return this.http.get<AccountInfo[]>(this.baseAccountUrl+'?role=admin', this.baseService.httpOptions)
      case Role.TRAINER:
        return this.http.get<AccountInfo[]>(this.baseAccountUrl+'?role=trainer', this.baseService.httpOptions)
      case Role.CLIENT:
        return this.http.get<AccountInfo[]>(this.baseAccountUrl+'?role=client', this.baseService.httpOptions)
    }
  }

  getAccount(id: number): Observable<AccountInfo> {
    return this.http.get<AccountInfo>(this.baseAccountUrl+id.toString(), this.baseService.httpOptions)
  }

  setActive(active: boolean, username: string): Observable<any> {
    if (active) {
      return this.http.put(this.baseAccountUrl+username+'/activate', null, this.baseService.httpOptions)
    } else {
      return this.http.put(this.baseAccountUrl+username+'/deactivate', null, this.baseService.httpOptions)
    }
  }

  editAccount(dataRequest: EditAccountRequest, username: string | null): Observable<AccountInfo> {
    return this.http.put<AccountInfo>(this.baseAccountUrl+username, dataRequest, this.baseService.httpOptions)
  }
}

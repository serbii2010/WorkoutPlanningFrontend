import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {SubscriptionLimitedInfo} from "../subscription/subscription-limited-info";
import {BaseService} from "./base.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {SubscriptionUnlimitedInfo} from "../subscription/subscription-unlimited-info";
import {SubscriptionType} from "../subscription/subscription-type";
import {CreateSubscriptionLimitedInfo} from "../subscription/create-subscription-limited-info";
import {CreateSubscriptionUnlimitedInfo} from "../subscription/create-subscription-unlimited-info";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private baseUrl = this.baseService.baseUrl+'subscriptions'

  constructor(private baseService: BaseService,
              private http: HttpClient) { }

  getLimitedSubscriptions(user: string | null, dateStart: string | null, dateEnd: string | null): Observable<SubscriptionLimitedInfo[]> {
    let queryParams = SubscriptionService.generateParam(SubscriptionType.LIMITED, user, dateStart, dateEnd)
    return this.http.get<SubscriptionLimitedInfo[]>(this.baseUrl,
      {
        params: queryParams,
        headers: this.baseService.httpOptions.headers,
        withCredentials: this.baseService.httpOptions.withCredentials
      })
  }

  getUnlimitedSubscriptions(user: string | null, dateStart: string | null, dateEnd: string | null): Observable<SubscriptionUnlimitedInfo[]> {
    let queryParams = SubscriptionService.generateParam(SubscriptionType.UNLIMITED, user, dateStart, dateEnd)
    return this.http.get<SubscriptionUnlimitedInfo[]>(this.baseUrl,
      {params: queryParams,
        headers: this.baseService.httpOptions.headers,
        withCredentials: this.baseService.httpOptions.withCredentials
      })
  }

  createLimited(requestParam: CreateSubscriptionLimitedInfo): Observable<SubscriptionLimitedInfo> {
    return this.http.post<SubscriptionLimitedInfo>(this.baseUrl, requestParam, this.baseService.httpOptions)
  }

  createUnlimited(requestParam: CreateSubscriptionUnlimitedInfo): Observable<SubscriptionUnlimitedInfo> {
    return this.http.post<SubscriptionUnlimitedInfo>(this.baseUrl, requestParam, this.baseService.httpOptions)
  }

  setActive(id: number, isActive: boolean): Observable<any>{
    return this.http.put(this.baseUrl+"/"+id, {isActive: isActive}, this.baseService.httpOptions)
  }

  private static generateParam(type: SubscriptionType, user: string | null, dateStart: string | null, dateEnd: string | null): HttpParams {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('type', type)
    if (user != null) {
      queryParams = queryParams.append('username', user)
    }
    if (dateStart != null) {
      queryParams = queryParams.append('dateStart', dateStart)
    }
    if (dateEnd != null) {
      queryParams = queryParams.append('dateEnd', dateEnd)
    }
    return queryParams;
  }
}

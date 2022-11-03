import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {InsertRecordInfo} from "../record/insert-record-info";
import {RecordInfo} from "../record/record-info";
import {Rule} from "../record/rule";
import {OptionInfo} from "../record/option-info";
import {StatusRecord} from "../record/status-record";
import {BaseService} from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class RecordService {
  private baseUrl = this.baseService.baseUrl+'records/'
  private clientUrl = this.baseService.baseUrl+'workouts/:id/records'

  constructor(private baseService: BaseService, private http: HttpClient) { }

  insert(requestBody: InsertRecordInfo): Observable<RecordInfo> {
    return this.http.post<RecordInfo>(this.baseUrl, requestBody, this.baseService.httpOptions);
  }

  queue(requestBody: InsertRecordInfo): Observable<RecordInfo> {
    return this.http.post<RecordInfo>(this.baseUrl+'queue', requestBody, this.baseService.httpOptions);
  }

  setStatus(requestBody: InsertRecordInfo, status: StatusRecord): Observable<RecordInfo> {
    return this.http.put<RecordInfo>(this.baseUrl+status.toString(), requestBody, this.baseService.httpOptions);
  }

  getClients(idWorkout: number): Observable<RecordInfo[]> {
    return this.http.get<RecordInfo[]>(this.clientUrl.replace(':id', idWorkout.toString()), this.baseService.httpOptions)
  }

  getRule(rule: Rule): Observable<OptionInfo> {
    return this.http.get<OptionInfo>(this.baseUrl+'rules/'+rule.toString(), this.baseService.httpOptions)
  }

  setRule(rule: Rule, value: string) {
    let request = {value: value==""?null:value}
    return this.http.post<OptionInfo>(this.baseUrl+'rules/'+rule.toString(), request, this.baseService.httpOptions)
  }
}

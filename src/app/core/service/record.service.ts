import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {InsertRecordInfo} from "../record/insert-record-info";
import {RecordInfo} from "../record/record-info";
import {Rule} from "../record/rule";
import {OptionInfo} from "../record/option-info";
import {StatusRecord} from "../record/status-record";

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
export class RecordService {
  private baseUrl = 'http://localhost:8000/api/records/'
  private clientUrl = 'http://localhost:8000/api/workouts/:id/records'

  constructor(private http: HttpClient) { }

  insert(requestBody: InsertRecordInfo): Observable<RecordInfo> {
    return this.http.post<RecordInfo>(this.baseUrl, requestBody, httpOptions);
  }

  queue(requestBody: InsertRecordInfo): Observable<RecordInfo> {
    return this.http.post<RecordInfo>(this.baseUrl+'queue', requestBody, httpOptions);
  }

  setStatus(requestBody: InsertRecordInfo, status: StatusRecord): Observable<RecordInfo> {
    return this.http.put<RecordInfo>(this.baseUrl+status.toString(), requestBody, httpOptions);
  }

  // cancel(requestBody: InsertRecordInfo): Observable<RecordInfo> {
  //   return this.http.put<RecordInfo>(this.baseUrl+'cancel', requestBody, httpOptions);
  // }
  //
  // skip(requestBody: InsertRecordInfo): Observable<RecordInfo> {
  //   return this.http.put<RecordInfo>(this.baseUrl+'skip', requestBody, httpOptions);
  // }
  //
  // accept(requestBody: InsertRecordInfo): Observable<RecordInfo> {
  //   return this.http.put<RecordInfo>(this.baseUrl+'accept', requestBody, httpOptions);
  // }

  getClients(idWorkout: number): Observable<RecordInfo[]> {
    return this.http.get<RecordInfo[]>(this.clientUrl.replace(':id', idWorkout.toString()), httpOptions)
  }

  getRule(rule: Rule): Observable<OptionInfo> {
    return this.http.get<OptionInfo>(this.baseUrl+'rules/'+rule.toString(), httpOptions)
  }

  setRule(rule: Rule, value: string) {
    let request = {value: value==""?null:value}
    return this.http.post<OptionInfo>(this.baseUrl+'rules/'+rule.toString(), request, httpOptions)
  }
}

import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {WorkoutInfo} from "../workout/workout-info";
import {HttpClient, HttpParams} from "@angular/common/http";
import {GenerateWorkoutInfo} from "../workout/generate-workout-info";
import {BaseService} from "./base.service";


@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private baseWorkoutUrl = this.baseService.baseUrl+'workouts/'

  constructor(private baseService: BaseService, private http: HttpClient) { }

  getWorkouts(dateStart: string | null = null, dateEnd: string | null = null): Observable<WorkoutInfo[]> {
    let queryParams = new HttpParams();
    if (dateStart != null) {
      queryParams = queryParams.append('dateStart', dateStart);
    }
    if (dateEnd != null) {
      queryParams = queryParams.append('dateEnd', dateEnd);
    }

    let options: any = this.baseService.httpOptions
    options['params'] = queryParams

    return this.http.get<WorkoutInfo[]>(this.baseWorkoutUrl, {
      params: queryParams,
      headers: this.baseService.httpOptions.headers,
      withCredentials: this.baseService.httpOptions.withCredentials
    })
  }

  getWorkout(id: number): Observable<WorkoutInfo> {
    return this.http.get<WorkoutInfo>(this.baseWorkoutUrl+id, this.baseService.httpOptions)
  }

  generate(generateWorkoutInfo: GenerateWorkoutInfo) {
    return this.http.post<WorkoutInfo[]>(this.baseWorkoutUrl, generateWorkoutInfo, this.baseService.httpOptions)
  }

  delete(id: number): Observable<WorkoutInfo> {
    return this.http.delete<WorkoutInfo>(this.baseWorkoutUrl+id, this.baseService.httpOptions)
  }

  update(id:number, workout: WorkoutInfo): Observable<WorkoutInfo> {
    return this.http.put<WorkoutInfo>(this.baseWorkoutUrl+id, workout, this.baseService.httpOptions)
  }
}

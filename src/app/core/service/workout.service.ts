import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {WorkoutInfo} from "../workout/workout-info";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {GenerateWorkoutInfo} from "../workout/generate-workout-info";

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
export class WorkoutService {
  private baseWorkoutUrl = 'http://localhost:8000/api/workouts/'

  constructor(private http: HttpClient) { }

  getWorkouts(dateStart: string | null = null, dateEnd: string | null = null): Observable<WorkoutInfo[]> {
    let queryParams = new HttpParams();
    if (dateStart != null) {
      queryParams = queryParams.append('dateStart', dateStart);
    }
    if (dateEnd != null) {
      queryParams = queryParams.append('dateEnd', dateEnd);
    }

    let options: any = httpOptions
    options['params'] = queryParams

    return this.http.get<WorkoutInfo[]>(this.baseWorkoutUrl, {
      params: queryParams,
      headers: httpOptions.headers,
      withCredentials: httpOptions.withCredentials
    })
  }

  getWorkout(id: number): Observable<WorkoutInfo> {
    return this.http.get<WorkoutInfo>(this.baseWorkoutUrl+id, httpOptions)
  }

  generate(generateWorkoutInfo: GenerateWorkoutInfo) {
    return this.http.post<WorkoutInfo[]>(this.baseWorkoutUrl, generateWorkoutInfo, httpOptions)
  }

  delete(id: number): Observable<WorkoutInfo> {
    return this.http.delete<WorkoutInfo>(this.baseWorkoutUrl+id, httpOptions)
  }

  update(id:number, workout: WorkoutInfo): Observable<WorkoutInfo> {
    return this.http.put<WorkoutInfo>(this.baseWorkoutUrl+id, workout, httpOptions)
  }
}

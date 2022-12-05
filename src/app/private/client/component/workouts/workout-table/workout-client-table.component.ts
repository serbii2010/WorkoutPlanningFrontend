import {Component, Inject, Injectable, LOCALE_ID, OnInit} from '@angular/core';
import {WorkoutTableComponent} from "../../../../component/workout-table/workout-table.component";
import {WorkoutService} from "../../../../../core/service/workout.service";
import {RecordService} from "../../../../../core/service/record.service";
import {InsertRecordInfo} from "../../../../../core/record/insert-record-info";
import {AuthStorageService} from "../../../../../core/auth/auth-storage.service";
import {RecordStatus} from "../../../../../core/record/record-status";

@Component({
  selector: 'app-workouts',
  templateUrl: './workout-client-table.component.html'
})
@Injectable()
export class WorkoutClientTableComponent extends WorkoutTableComponent implements OnInit {
  constructor(public override workoutService: WorkoutService,
              public recordService: RecordService,
              public authService: AuthStorageService,
              @Inject(LOCALE_ID) public override locale: string) {
    super(workoutService, locale);
    this.displayedColumns = ['date', 'timeStart', 'trainer', 'duration', 'typeWorkout', 'availableSeats', 'status', 'actions'];
    this.getWorkouts();
  }

  recordStatus = RecordStatus;

  singUp(id: number) {
    if (this.authService.getUsername() == null) {
      alert("Error. Not auth")
      return
    }
    let request = new InsertRecordInfo(this.authService.getUsername()!, id)
    this.recordService.insert(request).subscribe({
      next: () => {
        this.getWorkouts()
      },
      error: error => {
        console.error(error.error.errors[0].message)
        alert(error.error.errors[0].message)
      }
    })
  }

  queue(id: number) {
    if (this.authService.getUsername() == null) {
      alert("Error. Not auth")
      return
    }
    let request = new InsertRecordInfo(this.authService.getUsername()!, id)
    this.recordService.queue(request).subscribe({
      next: () => {
        this.getWorkouts()
      },
      error: error => {
        console.error(error.error.errors[0].message)
        alert(error.error.errors[0].message)
      }
    })
  }

  cancel(id: number) {
    if (this.authService.getUsername() == null) {
      alert("Error. Not auth")
      return
    }
    let request = new InsertRecordInfo(this.authService.getUsername()!, id)
    this.recordService.setStatus(request, RecordStatus.CANCELLED).subscribe({
      next: () => {
        this.getWorkouts()
      },
      error: error => {
        console.error(error.error.errors[0].message)
        alert(error.error.errors[0].message)
      }
    })
  }
}

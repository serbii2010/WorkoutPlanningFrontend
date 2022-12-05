import {Inject, Injectable, LOCALE_ID, OnInit, ViewChild} from '@angular/core';
import {WorkoutService} from "../../../core/service/workout.service";
import {WorkoutInfo} from "../../../core/workout/workout-info";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {formatDate} from "@angular/common";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Injectable()
export class WorkoutTableComponent implements OnInit {
  listWorkout: WorkoutInfo[] = []
  displayedColumns: string[] = ['date', 'timeStart', 'trainer', 'duration', 'typeWorkout', 'totalSeats', 'availableSeats', 'actions'];

  constructor(public workoutService: WorkoutService,
              @Inject(LOCALE_ID) public locale: string) {
    let date = new Date()
    this.formFilter.controls.dateStart.setValue(formatDate(date, 'yyyy-MM-dd', this.locale))
    date.setDate(date.getDate() + 7)
    this.formFilter.controls.dateEnd.setValue(formatDate(date, 'yyyy-MM-dd', this.locale))
  }

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  formFilter:  FormGroup = new FormGroup({
    dateStart: new FormControl<string>('', [Validators.required]),
    dateEnd: new FormControl<string>('', [Validators.required]),
  })

  get dateStart() {
    return this.formFilter.controls.dateStart
  }

  get dateEnd() {
    return this.formFilter.controls.dateEnd
  }

  ngOnInit(): void {
    this.getWorkouts()
  }

  public getWorkouts() {
    this.workoutService.getWorkouts(
      this.dateStart.value===""?null:formatDate(this.dateStart.value, 'yyyy-MM-dd', this.locale),
      this.dateEnd.value===""?null:formatDate(this.dateEnd.value, 'yyyy-MM-dd', this.locale)
    ).subscribe({
        next: value => {
          this.listWorkout = value
        }
      }
    )
  }

  public delete(id: number) {
    this.workoutService.delete(id).subscribe({
      next: () => {
        this.getWorkouts()
      }
    })
  }
}

import {FormControl, FormGroup, Validators} from "@angular/forms";
import {formatDate} from "@angular/common";
import {Inject, Injectable, LOCALE_ID} from "@angular/core";
import {WorkoutInfo} from "../../../../../core/workout/workout-info";
import {WorkoutService} from "../../../../../core/service/workout.service";

@Injectable()
export abstract class WorkoutsTableComponent {
  listWorkout: WorkoutInfo[] = []
  public displayedColumns: string[] = ['date', 'timeStart', 'trainer', 'duration', 'typeWorkout', 'availableSeats'];

  recordStatus: string | null = null

  protected constructor(@Inject(LOCALE_ID) public locale: string,
                        protected workoutService: WorkoutService) {
    let date = new Date()
    this.formFilter.controls.dateEnd.setValue(formatDate(date, 'yyyy-MM-dd', this.locale))
    date.setDate(date.getDate() - 14)
    this.formFilter.controls.dateStart.setValue(formatDate(date, 'yyyy-MM-dd', this.locale))
  }

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

  public getWorkouts() {
    this.workoutService.getWorkouts(
      this.dateStart.value===""?null:formatDate(this.dateStart.value, 'yyyy-MM-dd', this.locale),
      this.dateEnd.value===""?null:formatDate(this.dateEnd.value, 'yyyy-MM-dd', this.locale),
      this.recordStatus
    ).subscribe({
        next: value => {
          this.listWorkout = value
        }
      }
    )
  }
}

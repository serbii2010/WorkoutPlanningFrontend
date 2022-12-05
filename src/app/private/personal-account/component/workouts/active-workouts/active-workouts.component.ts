import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {WorkoutService} from "../../../../../core/service/workout.service";
import {RecordStatus} from "../../../../../core/record/record-status";
import {WorkoutsTableComponent} from "../workouts-table/workouts-table.component";

@Component({
  selector: 'app-active-workouts',
  templateUrl: '../workouts-table/workouts-table.component.html'
})
export class ActiveWorkoutsComponent extends WorkoutsTableComponent implements OnInit {
  constructor(@Inject(LOCALE_ID) public override locale: string,
              workoutService: WorkoutService) {
    super(locale, workoutService);
    this.recordStatus = RecordStatus.ACTIVE;
    this.getWorkouts();
  }

  ngOnInit(): void {
  }
}

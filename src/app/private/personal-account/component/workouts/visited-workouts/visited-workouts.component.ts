import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {WorkoutsTableComponent} from "../workouts-table/workouts-table.component";
import {WorkoutService} from "../../../../../core/service/workout.service";
import {RecordStatus} from "../../../../../core/record/record-status";

@Component({
  selector: 'app-visited-workouts',
  templateUrl: '../workouts-table/workouts-table.component.html'
})
export class VisitedWorkoutsComponent extends WorkoutsTableComponent implements OnInit {
  constructor(@Inject(LOCALE_ID) public override locale: string,
              workoutService: WorkoutService) {
    super(locale, workoutService);
    this.recordStatus = RecordStatus.VISITED;
    this.getWorkouts();
  }

  ngOnInit(): void {
  }
}

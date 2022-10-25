import {Component, Inject, Injectable, LOCALE_ID, OnInit} from '@angular/core';
import {WorkoutTableComponent} from "../../../../component/workout-table/workout-table.component";
import {WorkoutService} from "../../../../../core/service/workout.service";

@Component({
  selector: 'app-workouts',
  templateUrl: './workout-client-table.component.html'
})
@Injectable()
export class WorkoutClientTableComponent extends WorkoutTableComponent implements OnInit {
  constructor(public override workoutService: WorkoutService,
              @Inject(LOCALE_ID) public override locale: string) {
    super(workoutService, locale);
    this.displayedColumns = ['date', 'timeStart', 'trainer', 'duration', 'typeWorkout', 'availableSeats', 'actions'];
    this.getWorkouts();
  }
}

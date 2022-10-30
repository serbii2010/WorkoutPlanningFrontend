import {Component, OnInit} from '@angular/core';
import {WorkoutInfo} from "../../../../../core/workout/workout-info";
import {RecordInfo} from "../../../../../core/record/record-info";
import {ActivatedRoute} from "@angular/router";
import {RecordService} from "../../../../../core/service/record.service";
import {WorkoutService} from "../../../../../core/service/workout.service";

@Component({
  selector: 'app-detail-workout',
  templateUrl: './detail-workout.component.html'
})
export class DetailWorkoutComponent implements OnInit {
  workoutId!: number
  workout!: WorkoutInfo
  records!: RecordInfo[]

  displayedColumns = ['id', 'username', 'firstName', 'lastName', 'status'];

  constructor(private route: ActivatedRoute,
              private recordService: RecordService,
              private workoutService: WorkoutService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(urlParam => {
      this.workoutId = urlParam['id']
      this.findWorkout()
      this.findRecords()
      console.log(this.workout)
    })
  }

  private findRecords() {
    this.recordService.getClients(this.workoutId).subscribe({
      next: value => {
        this.records = value
      }
    })
  }

  private findWorkout() {
    this.workoutService.getWorkout(this.workoutId).subscribe({
      next: value => {
        this.workout = value
      }
    })
  }

}

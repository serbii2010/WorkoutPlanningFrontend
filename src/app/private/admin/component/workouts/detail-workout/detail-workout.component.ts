import {Component, OnInit} from '@angular/core';
import {RecordService} from "../../../../../core/service/record.service";
import {ActivatedRoute} from "@angular/router";
import {RecordInfo} from "../../../../../core/record/record-info";
import {WorkoutInfo} from "../../../../../core/workout/workout-info";
import {WorkoutService} from "../../../../../core/service/workout.service";
import {InsertRecordInfo} from "../../../../../core/record/insert-record-info";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../../../../../core/service/account.service";
import {AccountInfo} from "../../../../../core/account/account-info";
import {Role} from "../../../../../core/account/role";
import {RecordStatus} from "../../../../../core/record/record-status";

@Component({
  selector: 'app-client-table',
  templateUrl: './detail-workout.component.html'
})
export class DetailWorkoutComponent implements OnInit {
  workoutId!: number
  workout!: WorkoutInfo
  records!: RecordInfo[]
  clients!: AccountInfo[]

  timeEndWorkout!: Date
  currentTime: Date = new Date()
  displayedColumns = ['id', 'username', 'firstName', 'lastName', 'status', 'actions'];

  status = RecordStatus

  formAddClient: FormGroup = new FormGroup({
    client: new FormControl<string>('', [Validators.required]),
  });

  constructor(private recordService: RecordService,
              private workoutService: WorkoutService,
              private route: ActivatedRoute,
              private accountService: AccountService) {
  }

  get client() {
    return this.formAddClient.controls.client
  }

  ngOnInit(): void {
    this.route.params.subscribe(urlParam => {
      this.workoutId = urlParam['id']

      this.accountService.getAccounts(Role.CLIENT).subscribe({
        next: value => {
          this.clients = value
        }
      })
      this.findWorkout()
      this.findRecords()

    })
  }

  deleteClient(username: string) {
    let request = new InsertRecordInfo(username, this.workoutId)
    this.recordService.setStatus(request, RecordStatus.CANCELLED).subscribe({
      next: () => {
        this.findRecords()
        this.findWorkout()
      },
      error: error => {
        alert(error.errors.error[0].message)
      }
    })
  }

  addClient() {
    let request = new InsertRecordInfo(this.client.value, this.workoutId)
    this.recordService.insert(request).subscribe({
      next: () => {
        this.findRecords()
        this.findWorkout()
      },
      error: error => {
        alert(error.error.errors[0].message)
      }
    })
  }

  queueClient() {
    let request = new InsertRecordInfo(this.client.value, this.workoutId)
    this.recordService.queue(request).subscribe({
      next: () => {
        this.findRecords()
        this.findWorkout()
      },
      error: error => {
        alert(error.error.errors[0].message)
      }
    })
  }

  accept(username: string) {
    let request = new InsertRecordInfo(username, this.workoutId)
    this.recordService.setStatus(request, RecordStatus.VISITED).subscribe({
      next: () => {
        this.findRecords()
        this.findWorkout()
      },
      error: error => {
        alert(error.error.errors[0].message)
      }
    })
  }

  skipped(username: string) {
    let request = new InsertRecordInfo(username, this.workoutId)
    this.recordService.setStatus(request, RecordStatus.SKIPPED).subscribe({
      next: () => {
        this.findRecords()
        this.findWorkout()
      },
      error: error => {
        alert(error.error.errors[0].message)
      }
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
        let dateStart = new Date(this.workout.date + 'T'+this.workout.timeStart)
        this.timeEndWorkout = new Date(dateStart.getTime() + this.workout.duration*60)
      }
    })
  }
}

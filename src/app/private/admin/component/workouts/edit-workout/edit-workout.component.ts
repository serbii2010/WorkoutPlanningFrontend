import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {WorkoutService} from "../../../../../core/service/workout.service";
import {WorkoutInfo} from "../../../../../core/workout/workout-info";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject, Observable} from "rxjs";
import {AccountInfo} from "../../../../../core/account/account-info";
import {Role} from "../../../../../core/account/role";
import {AccountService} from "../../../../../core/service/account.service";

@Component({
  selector: 'app-edit-workout',
  templateUrl: './edit-workout.component.html'
})
export class EditWorkoutComponent implements OnInit {
  idWorkout!: number
  workout!: WorkoutInfo
  isFailed: boolean = false
  private errorSubject: BehaviorSubject<string[]> = new BehaviorSubject(['No errors']);
  errorMessage$: Observable<string[]> = this.errorSubject.asObservable();
  trainers!: AccountInfo[]

  form = new FormGroup({
    date: new FormControl<string>('', [Validators.required]),
    timeStart: new FormControl<string>('', [Validators.required]),
    trainer: new FormControl<string>('', [Validators.required]),
    duration: new FormControl<number>(10, [Validators.required]),
    typeWorkout: new FormControl<string>('', [Validators.required]),
    totalSeats: new FormControl<number>(10, [Validators.required]),
    availableSeats: new FormControl<number>(10, [Validators.required]),
  })

  constructor(private route: ActivatedRoute,
              private router: Router,
              private accountService :AccountService,
              private workoutService: WorkoutService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(urlParam => {
      this.accountService.getAccounts(Role.TRAINER).subscribe({
        next: value => {
          this.trainers = value
        }
      })
      this.idWorkout = urlParam['id']
      this.workoutService.getWorkout(urlParam['id']).subscribe({
        next: value => {
          this.workout = value
          this.initForm()
        }
      })
    })
  }

  get date(): FormControl {
    return this.form.controls.date
  }

  get timeStart(): FormControl {
    return this.form.controls.timeStart
  }

  get trainer(): FormControl {
    return this.form.controls.trainer
  }

  get typeWorkout(): FormControl {
    return this.form.controls.typeWorkout
  }

  get duration(): FormControl {
    return this.form.controls.duration
  }

  get totalSeats(): FormControl {
    return this.form.controls.totalSeats
  }

  get availableSeats(): FormControl {
    return this.form.controls.availableSeats
  }

  initForm() {
    this.form.controls.date.setValue(this.workout !== undefined ? this.workout.date : '')
    this.form.controls.timeStart.setValue(this.workout !== undefined ? this.workout.timeStart : null)
    this.form.controls.trainer.setValue(this.workout !== undefined ? this.workout.trainer : null)
    this.form.controls.duration.setValue(this.workout !== undefined ? this.workout.duration : null)
    this.form.controls.typeWorkout.setValue(this.workout !== undefined ? this.workout.typeWorkout : null)
    this.form.controls.totalSeats.setValue(this.workout !== undefined ? this.workout.totalSeats : null)
    this.form.controls.availableSeats.setValue(this.workout !== undefined ? this.workout.availableSeats : null)
  }

  edit() {
    if (!this.form.valid) {
      this.setErrorMessage(['Form not valid'])
      return
    }
    this.workout = new WorkoutInfo(
      this.idWorkout,
      this.date.value,
      this.timeStart.value,
      this.trainer.value,
      this.duration.value,
      this.typeWorkout.value,
      this.totalSeats.value,
      this.availableSeats.value
    )
    this.workoutService.update(this.idWorkout, this.workout).subscribe({
      next: () => {
        this.router.navigate(['admin', 'workouts'])
      },
      error: (error: any) => {
        let errorData: string[] = []
        for (let err of error.error.errors) {
          errorData.push('field ' + err.field + ' - ' + err.message)
        }
        this.setErrorMessage(errorData)
      }
    })
  }

  private setErrorMessage(message: string[]) {
    console.error(message)
    this.errorSubject.next(message);
    this.isFailed = true
  }
}

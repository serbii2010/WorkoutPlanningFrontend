import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject, Observable} from "rxjs";
import {AccountInfo} from "../../../../../core/account/account-info";
import {AccountService} from "../../../../../core/service/account.service";
import {WorkoutService} from "../../../../../core/service/workout.service";
import {Role} from "../../../../../core/account/role";
import {GenerateWorkoutInfo} from "../../../../../core/workout/generate-workout-info";
import {Router} from "@angular/router";
import {CheckboxItem} from "../../../../../shared/component/multi-check-box/checkbox-item";

@Component({
  selector: 'app-generate-workouts',
  templateUrl: './generate-workouts.component.html'
})
export class GenerateWorkoutsComponent implements OnInit {
  isFailed: boolean = false
  generateWorkoutInfo: GenerateWorkoutInfo | undefined
  private errorSubject: BehaviorSubject<string[]> = new BehaviorSubject(['No errors']);
  errorMessage$: Observable<string[]> = this.errorSubject.asObservable();
  trainers: AccountInfo[] | undefined

  repeated: string = 'week'
  daysMonth: Array<string>;
  daysWeek: Array<string>;
  groupCheckBox: Array<CheckboxItem>;
  resultCheckedArray: string[] = [];

  form: FormGroup = new FormGroup({
    dateStart: new FormControl<string>('', [Validators.required]),
    dateEnd: new FormControl<string>('', [Validators.required]),
    repeated: new FormControl<string>('', [Validators.required]),
    timeStart: new FormControl<string>('', [Validators.required]),
    trainer: new FormControl<string>('', [Validators.required]),
    type: new FormControl<string>('', [Validators.required]),
    duration: new FormControl<string>('', [Validators.required]),
    totalSeats: new FormControl<string>('', [Validators.required]),
  })

  constructor(private accountService: AccountService,
              private workoutService: WorkoutService,
              private router: Router) {
    this.daysMonth = Array.from(Array(31).keys()).map(x => (x + 1).toString());
    this.daysWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    this.groupCheckBox = this.daysWeek.map(day => {
      return new CheckboxItem(day, day, false)
    })
  }

  get dateStart() {
    return this.form.controls.dateStart
  }

  get dateEnd() {
    return this.form.controls.dateEnd
  }

  get timeStart() {
    return this.form.controls.timeStart
  }

  get trainer() {
    return this.form.controls.trainer
  }

  get type() {
    return this.form.controls.type
  }

  get duration() {
    return this.form.controls.duration
  }

  get totalSeats() {
    return this.form.controls.totalSeats
  }

  ngOnInit(): void {
    this.accountService.getAccounts(Role.TRAINER).subscribe({
      next: value => {
        this.trainers = value
      }
    })
  }

  generate(): void {
    if (!this.form.valid) {
      this.setErrorMessage(['Form not valid'])
      return
    }
    this.generateWorkoutInfo = new GenerateWorkoutInfo(
      this.dateStart.value,
      this.dateEnd.value,
      this.resultCheckedArray.join(','),
      this.timeStart.value,
      this.trainer.value,
      this.type.value,
      this.duration.value,
      this.totalSeats.value,
    )
    this.workoutService.generate(this.generateWorkoutInfo).subscribe({
      next: () => {
        this.router.navigate(['admin', 'workouts'])
      },
      error: (error: any) => {
        console.error(error)
        let errorData: string[] = []
        for (let err of error.error.errors) {
          errorData.push('field ' + err.field + ' - ' + err.message)
        }
        this.setErrorMessage(errorData)
      }
    })
  }

  public setCheckModel() {
    switch (this.repeated) {
      case "week":
        this.groupCheckBox = this.daysWeek.map(day => {
          return new CheckboxItem(day, day, false)
        })
        break
      case "month":
        this.groupCheckBox = this.daysMonth.map(day => {
          return new CheckboxItem(day, day, false)
        })
        break
    }
  }

  public onCheckboxChange(value: string[]) {
    this.resultCheckedArray = value
  }

  private setErrorMessage(message: string[]) {
    console.error(message)
    this.errorSubject.next(message);
    this.isFailed = true
  }


}

import {Component, OnInit} from '@angular/core';
import {RecordService} from "../../../../core/service/record.service";
import {Rule} from "../../../../core/record/rule";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html'
})
export class RulesComponent implements OnInit {

  form: FormGroup = new FormGroup({
    hour: new FormControl<string>(''),
    time: new FormControl<string>(''),
  })

  constructor(private recordService: RecordService) {
  }

  get hour() {
    return this.form.controls.hour
  }

  get time() {
    return this.form.controls.time
  }

  ngOnInit(): void {
    this.recordService.getRule(Rule.HOUR_BEFORE_WORKOUT).subscribe({
      next: value => {
        this.form.controls.hour.setValue(value.value)
      }
    })
    this.recordService.getRule(Rule.TIME_BEFORE_MORNING_WORKOUT).subscribe({
      next: value => {
        this.form.controls.time.setValue(value.value)
      }
    })
  }

  public save() {
    let flag = true
    this.recordService.setRule(Rule.TIME_BEFORE_MORNING_WORKOUT, this.time.value).subscribe({
      error: error => {
        flag = false
        alert(error.error.errors[0].message)
      }
    })
    this.recordService.setRule(Rule.HOUR_BEFORE_WORKOUT, this.hour.value).subscribe({
      error: error => {
        flag = false
        alert(error.error.errors[0].message)
      }
    })
    if (flag) {
      alert("Rules Success saved")
    }
  }
}

import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {CheckboxItem} from "./checkbox-item";

@Component({
  selector: 'checkbox-group',
  templateUrl: './checkbox-group.component.html'
})
export class CheckboxGroupComponent implements OnInit {
  @Input() options = Array<CheckboxItem>();
  @Output() toggle = new EventEmitter<any[]>();
  selectedValues: any

  constructor() {
  }

  ngOnInit() {
  }

  onToggle() {
    const checkedOptions = this.options.filter(x => x.checked);
    this.selectedValues = checkedOptions.map(x => x.value);
    this.toggle.emit(checkedOptions.map(x => x.value));
  }
}

import {Component, OnInit} from '@angular/core';
import {AuthStorageService} from "../../core/auth/auth-storage.service";

@Component({
  selector: 'app-client',
  templateUrl: './trainer.component.html'
})
export class TrainerComponent implements OnInit {
  role: String | null

  constructor(private authStorageService: AuthStorageService) {
    this.role = this.authStorageService.getRole()
  }

  ngOnInit(): void {
  }

}

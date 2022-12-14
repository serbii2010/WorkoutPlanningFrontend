import {Component, OnInit} from '@angular/core';
import {AuthStorageService} from "../../core/auth/auth-storage.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {
  role: String | null

  constructor(private authStorageService: AuthStorageService) {
    this.role = this.authStorageService.getRole()
  }

  ngOnInit(): void {
  }

}

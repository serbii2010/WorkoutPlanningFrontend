import {Component, OnInit} from '@angular/core';
import {AuthStorageService} from "../../core/auth/auth-storage.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {
  role: String | null = this.authStorageService.getRole()

  constructor(private authStorageService: AuthStorageService) {
  }

  ngOnInit(): void {
  }

}

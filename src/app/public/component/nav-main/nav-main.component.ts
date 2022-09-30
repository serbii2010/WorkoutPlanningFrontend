import { Component, OnInit } from '@angular/core';
import {AuthStorageService} from "../../../core/auth/auth-storage.service";

@Component({
  selector: 'app-nav-main',
  templateUrl: './nav-main.component.html'
})
export class NavMainComponent implements OnInit {
  role: string | null = null;

  constructor(public authStorageService: AuthStorageService) {
  }

  ngOnInit(): void {
    if (this.authStorageService.getRole()) {
      this.role = this.authStorageService.getRole();
    }
  }

  isAuth(): boolean {
    return !!this.authStorageService.getRole();
  }

}

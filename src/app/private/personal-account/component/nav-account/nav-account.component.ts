import {Component, OnInit} from '@angular/core';
import {AuthStorageService} from "../../../../core/auth/auth-storage.service";

@Component({
  selector: 'app-nav-account',
  templateUrl: './nav-account.component.html',
})
export class NavAccountComponent implements OnInit {
  role: string | null
  constructor(private authStorageService: AuthStorageService) {
    this.role = authStorageService.getRole()
  }

  ngOnInit(): void {
  }

}

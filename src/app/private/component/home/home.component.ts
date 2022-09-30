import {Component, OnInit} from '@angular/core';

import {AuthStorageService} from '../../../core/auth/auth-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  info: any;

  constructor(public authStorageService: AuthStorageService) {
  }

  ngOnInit(): void {
    this.info = {
      role: this.authStorageService.getRole(),
      username: this.authStorageService.getUsername(),
    };
  }

  logout() {
    this.authStorageService.signOut();
    window.location.reload();
  }

}

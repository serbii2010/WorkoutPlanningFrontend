import {Component, OnInit} from '@angular/core';
import {AuthStorageService} from "../../core/auth/auth-storage.service";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html'
})
export class ClientComponent implements OnInit {
  role: String | null

  constructor(private authStorageService: AuthStorageService) {
    this.role = this.authStorageService.getRole()
  }

  ngOnInit(): void {
  }

}

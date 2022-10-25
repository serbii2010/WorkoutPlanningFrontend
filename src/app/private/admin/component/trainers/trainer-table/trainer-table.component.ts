import {Component, OnInit, ViewChild} from '@angular/core';
import {Role} from "../../../../../core/account/role";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {AccountInfo} from "../../../../../core/account/account-info";
import {AccountService} from "../../../../../core/service/account.service";

@Component({
  selector: 'app-trainer-table',
  templateUrl: './trainer-table.component.html'
})
export class TrainerTableComponent implements OnInit {
  listTrainer: AccountInfo[] = []
  displayedColumns: string[] = ['id', 'username', 'firstName', 'lastName', 'email', 'phone', 'isActive', 'actions'];

  constructor(private accountService: AccountService) {
  }

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  ngOnInit(): void {
    this.getTrainers()
  }

  activate(username: string): void {
    this.accountService.setActive(true, username).subscribe({
      next: () => this.getTrainers()
    })
  }

  deactivate(username: string): void {
    this.accountService.setActive(false, username).subscribe({
      next: () => this.getTrainers()
    })
  }

  private getTrainers() {
    this.accountService.getAccounts(Role.TRAINER).subscribe({
        next: value => {
          this.listTrainer = value
        }
      }
    )
  }
}

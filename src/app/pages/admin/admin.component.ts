import { Component, OnInit } from '@angular/core';
import UserService from 'src/app/services/user.service';
import UserRoleOverview from 'src/app/model/UserRoleOverview';
import { MatTableDataSource } from '@angular/material';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less'],
})
export class AdminComponent implements OnInit {

  public users: Promise<UserRoleOverview[]>
  public displayedColumns: string[] = ["firstName", "lastName", "roles", "actions"]

  constructor(private userSerivce: UserService) { }

  async ngOnInit() {
    this.users = this.userSerivce.getRoleOverview();
  }
}

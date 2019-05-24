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

  public usersDataSource: MatTableDataSource<UserRoleOverview>
  public displayedColumns: string[] = ["firstName", "lastName", "roles"]

  constructor(private userSerivce: UserService) { }

  async ngOnInit() {
    const users = await this.userSerivce.getRoleOverview();
    this.usersDataSource = new MatTableDataSource<UserRoleOverview>(users);
  }
}

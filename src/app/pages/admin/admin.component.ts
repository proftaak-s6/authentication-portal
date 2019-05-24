import { Component, OnInit } from '@angular/core';
import UserService from 'src/app/services/user.service';
import UserRoleOverview from 'src/app/model/UserRoleOverview';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less']
})
export class AdminComponent implements OnInit {


  users: UserRoleOverview[]

  constructor(private userSerivce: UserService) { }

  async ngOnInit() {
    this.users = await this.userSerivce.getRoleOverview();
  }
}

import { Component, OnInit } from '@angular/core';
import {UserService} from 'src/app/services/user.service';
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

  getRoleNames(roleValues: string[]): string[] {
    const lookup = {
      'user': '',
      'driver': 'Rekeningrijder',
      'government': 'Overheid',
      'police': 'Politie'
    };

    return roleValues.map(roleValue => lookup[roleValue]).filter(p => p !== '');
  }

  getRoleValues(rolesNames: string[]): string[] {
    const lookup = {
      'rekeningrijder': 'driver',
      'overheid': 'government',
      'politie': 'police'
    };

    return ['user', ...rolesNames.map(roleName => lookup[roleName.toLowerCase()])];
  }

  async edit(id: number, name: string, roles: string[]) {
    const existingRoles = this.getRoleNames(roles);
    const newRoles = this.getRoleValues(prompt(`Wijzig de rollen voor ${name}. Comma separated.`, existingRoles.join(', ')).split(', '));
    
    const updated = await this.userSerivce.setRoles(id, newRoles);

    if (updated) {
      this.users = this.userSerivce.getRoleOverview();
    } else {
      alert("Er ging iets fout tijdens de update.")
    }
  }
}

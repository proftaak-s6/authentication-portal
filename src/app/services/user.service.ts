import { Injectable } from '@angular/core';
import OverviewUser from '../model/UserRoleOverview';
import { environment } from 'src/environments/environment';
import UserRoleOverview from '../model/UserRoleOverview';

@Injectable({
  providedIn: 'root'
})
export default class UserService {

  private baseUrl: string = environment.services.authentication.url;

  constructor() { }

  async getRoleOverview(): Promise<UserRoleOverview[]> {
    const repsonse = await fetch(`${this.baseUrl}/users`);
    return await repsonse.json();
  }
}

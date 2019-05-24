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

  async setRoles(id: number, newRoles: string[]) {
    const reponse = await fetch(`${this.baseUrl}/users/${id}/roles`, {
      method: 'PUT',
      body: JSON.stringify(newRoles),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return reponse.status === 204;
  }
}

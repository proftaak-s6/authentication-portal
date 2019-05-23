import { Injectable } from '@angular/core';
import OverviewUser from '../model/OverviewUser';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export default class UserService {

  private baseUrl: string = environment.services.authentication.url;

  constructor() { }

  async getByBsn(bsn: string): Promise<OverviewUser> {
    const response = await fetch(`${this.baseUrl}/users/${bsn}`);

    if (response.status === 200) {
      return await response.json();
    }

    return null;
  }
}

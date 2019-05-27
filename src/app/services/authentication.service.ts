import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import User from '../model/User';
import JwtToken from '../model/JwtToken';
import Registration from '../model/Registration';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private baseUrl: string = environment.services.authentication.url;
  private jwtSecret: string = environment.jwt.secret;


  constructor() {
    if (!this.baseUrl) {
      throw new Error("Authentication Service needs baseUrl!")
    }
  }

  async authenticate(username: string, password: string): Promise<JwtToken> {
    const response = await fetch(`${this.baseUrl}/authenticate`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (response.status != 200) {
      switch (response.status) {
        case 403:
          throw new Error("Onjuiste gebruikersnaam of wachtwoord.");
      }
    }

    return await response.json();
  }

  async register(registration: Registration): Promise<boolean> {
    const response = await fetch(`${this.baseUrl}/users`, {
      method: "POST",
      body: JSON.stringify(registration),
      headers: {
        "Content-Type": "application/json"
      }
    });

    switch (response.status) {
      case 201: return true;
      default: {
        const json  = await response.json();
        throw new Error(json.errors.join('\n'))
      }
    }
  }

  verifyJwt(jwt: JwtToken): User {
    const parsedToken = this._parseToken(jwt.token);

    return {
      brpId: parsedToken.brpId,
      userId: parsedToken.userId,
      username: parsedToken.sub,
      roles: parsedToken.roles,
      jwt: jwt
    }
  }

  _parseToken(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = decodeURIComponent(atob(base64Url).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
    return JSON.parse(base64);
  }
}

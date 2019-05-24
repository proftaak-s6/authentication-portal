import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {

  username: string;
  password: string;
  redirects = environment.redirects;

  constructor(private authService: AuthenticationService) { }


  async login() {
    try {
      const jwt = await this.authService.authenticate(this.username, this.password);
      const user = this.authService.verifyJwt(jwt);
      let redirectUrl = undefined;

      if (user.roles.length === 2) {
        redirectUrl = this.redirects[user.roles[0]];
      } else {
        let choice = undefined;

        while (!choice || !redirectUrl) {
          choice = prompt(`Je hebt toegang tot meerdere portals, naar welke wil je navigeren?\n Je hebt de volgende opties: ${user.roles.map(r => r === 'user' ? '' : `${r} (${Object.keys(this.redirects).indexOf(r)})`).join(', ')}`)
          redirectUrl = this.redirects[Object.keys(this.redirects)[choice]]
        }
      }

      console.log(redirectUrl);

      if (redirectUrl) {
        window.location = redirectUrl;
      } else {
        alert('Oeps...');
      }
    } catch (err) {
      alert(err)
    }
  }
}

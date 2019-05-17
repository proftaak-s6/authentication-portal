import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {

  username: string;
  password: string;

  constructor(private authService: AuthenticationService) { }


  async login() {
    try {
      const jwt = await this.authService.authenticate(this.username, this.password);
      const user = this.authService.verifyJwt(jwt);
      console.log(user);
    } catch(err) {
      alert(err)
    }

    // Redirect to correct page.
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidateBsn } from 'src/app/validator/ValidateBsn';
import { ValidateDate } from 'src/app/validator/ValidateDate';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { AuthenticationService } from 'src/app/services/authentication.service';
import Registration from 'src/app/model/Registration';
import * as moment from 'moment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  buttonOptions: MatProgressButtonOptions = {
    active: false,
    text: 'Registreren op Mijn Rekeningrijden',
    spinnerSize: 19,
    spinnerColor: "primary",
    fullWidth: false,
    disabled: false,
    mode: 'indeterminate',
  }

  constructor(private formBuilder: FormBuilder, private service: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      bsn: ['', [Validators.required, ValidateBsn]],
      birthday: ['', [Validators.required, ValidateDate]],
      zipcode: ['', [Validators.required, Validators.pattern(/^[1-9][0-9]{3}[\s]?[A-Za-z]{2}$/i)]],
      username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^(((\\+31|0|0031)6){1}[1-9]{1}[0-9]{7})$/i)]]
    })
  }

  async registerUser(form: any) {
    if (!this.registerForm.valid) {
      alert("Sorry, vul alle velden juist in voor dat je verder gaat.")
      return;
    }

    this.buttonOptions.active = true;

    const registration: Registration = {
      birthday: moment(form.birthday).format("DD/MM/YYYY").toString(),
      bsn: form.bsn,
      email: form.email,
      password: form.password,
      phoneNumber: form.phone,
      username: form.username,
      zipCode: form.zipcode,
      roles: ["user"]
    }

    try {
      const registered: boolean = await this.service.register(registration);

      if (registered) {
        this.buttonOptions.active = false;
        this.router.navigate(["/"], { queryParams: { "redirect": "post-registration" } })
      }
    } catch (e) {
      alert(e.message)
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    if (controlName === "registerForm") {

      return this.registerForm.errors && this.registerForm.errors[errorName];
    }

    return this.registerForm.controls[controlName].hasError(errorName);
  }
}

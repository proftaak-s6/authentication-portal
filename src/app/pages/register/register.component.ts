import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidateBsn } from 'src/app/validator/ValidateBsn';
import { ValidateDate } from 'src/app/validator/ValidateDate';
import { MatProgressButtonOptions } from 'mat-progress-buttons';

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

  constructor(private formBuilder: FormBuilder, /*private service: UserService, */ private router: Router) { }

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

    // const registration = new Registration(form.birthday, form.bsn, form.email, form.password, form.phone, form.username, form.zipcode);

    // try {
    //   await this.service.save(registration);
    // } catch (e) {
    //   console.error(e)
    // }

    this.buttonOptions.active = false;

    this.router.navigate(["/login", { "redirect": "post-registration" }])
  }

  public hasError = (controlName: string, errorName: string) => {
    if (controlName === "registerForm") {

      return this.registerForm.errors && this.registerForm.errors[errorName];
    }

    return this.registerForm.controls[controlName].hasError(errorName);
  }
}

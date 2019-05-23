import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ValidateBsn } from 'src/app/validator/ValidateBsn';
import UserService from 'src/app/services/user.service';
import OverviewUser from 'src/app/model/OverviewUser';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less']
})
export class AdminComponent implements OnInit {
  form: FormGroup;
  errorMessage: string;
  user: OverviewUser;

  constructor(private formBuilder: FormBuilder, private userSerivce: UserService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      bsn: ['', [Validators.required, ValidateBsn]]
    })
  }

  async search(form) {
    const user = await this.userSerivce.getByBsn(form.bsn);

    if (!user) {
      this.errorMessage = "Er kon geen geregistreerde gebruiker gevonden worden met dit BSN. Controleer of u het nummer goed hebt ingevuld.";
    } else {
      this.user = user;
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName] && this.form.controls[controlName].hasError(errorName);
  }
}

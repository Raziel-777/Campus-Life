import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {DialogProfileComponent} from '../../user/dialog-profile/dialog-profile.component';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-page-register',
  templateUrl: './page-register.component.html',
  styleUrls: ['./page-register.component.css']
})
export class PageRegisterComponent implements OnInit {

  formBeforeRegister: FormGroup;

  constructor(formBuilder: FormBuilder, private dialog: MatDialog) {
    this.formBeforeRegister = formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('',
        [Validators.required])
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    if (!this.formBeforeRegister.invalid) {
      const initUser = {
        'firstName': null,
        'lastName': null,
        'birthDate': null,
        'gender': null,
        'address': null,
        'postcode': null,
        'city': null,
        'phone1': null,
        'phone2': null,
        'email': null,
        'avatar': null,
        'presentation': null,
        'sector': null
      };
      const profileDialog = this.dialog.open(DialogProfileComponent, {
        width: '600px',
        data: {formTitle: 'Register yourself...', password: true, user: initUser},
        autoFocus: false,
        disableClose: true
      });

      profileDialog.afterClosed().subscribe(result => {
        if (result && result !== 'cancel') {
          console.log(result);
        }
      });
    }
  }

  getEmailErrorMessage() {
    return this.formBeforeRegister.controls.email.hasError('required') ? 'This field is required' :
      this.formBeforeRegister.controls.email.hasError('email') ? 'Enter a correct email address' :
        '';
  }

  getPasswordErrorMessage() {
    return this.formBeforeRegister.controls.password.hasError('required') ? 'This field is required' :
      '';
  }
}

import {Component, OnInit} from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import {DialogProfileComponent} from '../../user/dialog-profile/dialog-profile.component';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-page-register',
  templateUrl: './page-register.component.html',
  styleUrls: ['./page-register.component.css']
})
export class PageRegisterComponent implements OnInit {

  formBeforeRegister: FormGroup;

  constructor(private authService: AuthService, formBuilder: FormBuilder, private dialog: MatDialog, public snackBar: MatSnackBar) {
    this.formBeforeRegister = formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    if (!this.formBeforeRegister.invalid) {
      const email = this.formBeforeRegister.controls.email.value;
      const profileDialog = this.dialog.open(DialogProfileComponent, {
        width: '600px',
        data: {formTitle: 'Register yourself...', password: true, email: email},
        autoFocus: false,
        disableClose: true
      });

      profileDialog.afterClosed().subscribe(result => {
        if (result && result !== 'cancel') {
          this.authService.signUp(result).then(() => {
          }, (error) => {
            this.authService.storeError(error);
            this.snackBar.open(error.message, '', {
              duration: 5000,
              panelClass: 'dangerSnackBar'
            });
          });
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

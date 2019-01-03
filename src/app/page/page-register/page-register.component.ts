import {Component, OnInit} from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import {DialogProfileComponent} from '../../user/dialog-profile/dialog-profile.component';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';
import {LoggerService} from '../../services/logger/logger.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-page-register',
  templateUrl: './page-register.component.html',
  styleUrls: ['./page-register.component.css']
})
export class PageRegisterComponent implements OnInit {

  private formBeforeRegister: FormGroup;
  displayFormReg: boolean;
  loaderOptions = {color: 'primary', mode: 'indeterminate'};

  constructor(private authService: AuthService, formBuilder: FormBuilder, private logger: LoggerService, private dialog: MatDialog,
              private snackBar: MatSnackBar, private router: Router) {
    this.displayFormReg = true;
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
          this.displayFormReg = false;
          this.authService.signUp(result).then(() => {
            this.router.navigate(['/students']).then(null);
          }, (error) => {
            this.displayFormReg = true;
            this.logger.storeError(error);
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

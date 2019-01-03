import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {DialogPromptComponent} from '../../component/dialog-prompt/dialog-prompt.component';

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.css']
})
export class PageLoginComponent implements OnInit {
  private formLogin: FormGroup;
  displayFormLogin: boolean;
  loaderOptions = {color: 'primary', mode: 'indeterminate'};

  constructor(formBuilder: FormBuilder, private router: Router, private authService: AuthService, private snackBar: MatSnackBar,
              private dialog: MatDialog) {
    this.displayFormLogin = true;
    this.formLogin = formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
  }

  getEmailErrorMessage() {
    return this.formLogin.controls.email.hasError('required') ? 'This field is required' :
      this.formLogin.controls.email.hasError('email') ? 'Enter a correct email address' :
        '';
  }

  getPasswordErrorMessage() {
    return this.formLogin.controls.password.hasError('required') ? 'This field is required' :
      '';
  }

  goToPageRegister() {
    this.router.navigate(['/register']).then(null);
  }

  onSubmit() {
    if (!this.formLogin.invalid) {
      this.displayFormLogin = false;
      this.authService.signIn(this.formLogin.value)
        .then(() => {
          this.router.navigate(['/students']).then(null);
        }, (error) => {
          this.displayFormLogin = true;
          this.snackBar.open(error.message, '', {
            duration: 5000,
            panelClass: 'dangerSnackBar'
          });
        });
    }
  }

  forgotPassword() {
    const dialogPrompt = this.dialog.open(DialogPromptComponent, {
      width: '450px',
      data: {
        promptType: 'email',
        message: 'Enter your email address.',
        responseOne: 'Ok',
        responseTwo: 'Cancel'
      },
      autoFocus: true
    });

    dialogPrompt.afterClosed().subscribe(result => {
      if (result) {
        this.authService.resetPassword(result).then(() => {
          this.snackBar.open('Email sent, check it for reset your password.', '', {
            duration: 5000,
            panelClass: 'successSnackBar'
          });
        }, (error) => {
          this.snackBar.open(error.message, '', {
            duration: 5000,
            panelClass: 'dangerSnackBar'
          });
        });
      }
    });
  }
}

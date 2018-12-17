import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.css']
})
export class PageLoginComponent implements OnInit {
  private formLogin: FormGroup;

  constructor(formBuilder: FormBuilder, public router: Router) {
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
    console.log('toto');
  }
}

import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../services/users/users.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {User} from '../../user/user';

@Component({
  selector: 'app-page-top',
  templateUrl: './page-top.component.html',
  styleUrls: ['./page-top.component.css']
})
export class PageTopComponent implements OnInit {

  formSearch: FormGroup;
  formSearchInput: FormControl;
  user: User;

  constructor(private usersService: UsersService, formBuilder: FormBuilder, private authService: AuthService,
              public router: Router) {
    this.formSearch = formBuilder.group({});
    this.formSearchInput = new FormControl('', Validators.minLength(3));
  }

  ngOnInit() {
    this.authService.user.subscribe(user => this.user = user);
  }

  getErrorMessage() {
    return this.formSearchInput.hasError('minlength') ? 'Please at least 3 characters' : '';
  }

  search() {
    this.usersService.search(this.formSearchInput.value);
    this.formSearchInput.reset('');
  }

  logOut() {
    this.usersService.unsubscribeUsers();
    this.usersService.currentUserDetail = null;
    this.authService.signOut().then(() => {
      this.router.navigate(['/login']).then(null);
    });
  }

  showProfile() {
    this.usersService.triggerShowDetails(this.user.userID);
  }
}

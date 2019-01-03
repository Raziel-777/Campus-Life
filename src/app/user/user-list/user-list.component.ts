import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../services/users/users.service';
import {User} from '../user';
import {MatDialog} from '@angular/material';
import {DialogAddUsersComponent} from '../dialog-add-users/dialog-add-users.component';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  currentUser: User;
  usersList: User[];
  usersListWeb: User[];
  usersListIndus: User[];
  usersListAdmin: User[];
  usersLength: number;
  userPart: number;
  listHidden;
  loaderOn;
  loaderOptions: { color: string, mode: string, value: number } = {color: 'primary', mode: 'determinate', value: 0};

  constructor(private authService: AuthService, private usersService: UsersService, private dialog: MatDialog) {
    authService.user.subscribe(user => this.currentUser = user);
    usersService.sendRefreshUsers.subscribe(() => this.initUsers());
  }

  ngOnInit() {
    this.initUsers();
  }

  initUsers() {
    this.listHidden = true;
    this.loaderOn = true;
    this.usersList = this.usersService.users;
    this.usersListWeb = this.usersService.usersWeb;
    this.usersListIndus = this.usersService.usersIndus;
    this.usersListAdmin = this.usersService.usersAdmin;
    this.usersLength = this.usersList.length;
    this.userPart = Math.ceil(100 / this.usersLength);
    setTimeout(() => {
      this.loaderOn = false;
      this.listHidden = false;
    }, 8000);
  }

  handlerLoaderRun() {
    this.loaderOptions.value += this.userPart;
    if (this.loaderOptions.value >= 100) {
      this.loaderOn = false;
      this.listHidden = false;
    }
  }


  show(id: string) {
    if (id) {
      this.usersService.showDetails(id);
    }
  }

  addUser() {
    const addUsersDialog = this.dialog.open(DialogAddUsersComponent, {
      width: '600px',
      autoFocus: true,
      disableClose: false
    });

    addUsersDialog.afterClosed().subscribe(result => {
      if (result && result instanceof Array) {
        console.log(result);
      }
    });
  }
}

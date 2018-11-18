import {Component, HostListener, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {User} from '../user';
import {MatDialog} from '@angular/material';
import {DialogProfileComponent} from '../dialog-profile/dialog-profile.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  usersList: User[];

  constructor(private userService: UserService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.usersList = this.userService.getUsers();
  }

  show(id: number) {
    if (id) {
      this.userService.showDetails(id);
    }
  }

  addUser() {
    const initUser = {
      'firstName': '',
      'lastName': '',
      'birthDate': null,
      'gender': '',
      'address': '',
      'postcode': '',
      'city': '',
      'phone1': '',
      'phone2': '',
      'email': '',
      'avatar': '',
      'presentation': ''
    };
    const profileDialog = this.dialog.open(DialogProfileComponent, {
      width: '600px',
      data: {user: initUser},
      autoFocus: false
    });

    profileDialog.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

}

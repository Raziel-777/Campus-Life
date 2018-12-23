import {Component, HostListener, OnInit} from '@angular/core';
import {GroupService} from '../../services/group/group.service';
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
  usersListWeb: User[];
  usersListIndus: User[];

  constructor(private userService: GroupService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.usersList = this.userService.getUsers();
    this.usersListWeb = this.userService.getUsersWeb();
    this.usersListIndus = this.userService.getUsersIndus();
  }

  show(id: number) {
    if (id) {
      this.userService.showDetails(id);
    }
  }

  addUser() {
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
      data: {formTitle: 'Add a student...', user: initUser},
      autoFocus: false
    });

    profileDialog.afterClosed().subscribe(result => {
      if (result && result !== 'cancel') {
        console.log(result);
      }
    });
  }

}

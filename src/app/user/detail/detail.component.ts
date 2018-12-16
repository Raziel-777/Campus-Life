import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {UserService} from '../user.service';
import {User} from '../user';
import {DialogProfileComponent} from '../dialog-profile/dialog-profile.component';
import {DialogAlertComponent} from '../../component/dialog-alert/dialog-alert.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  userToShow: User = null;
  usersResult: User[] = null;

  constructor(private userService: UserService, private dialog: MatDialog) {
    this.userService.sendDetails.subscribe(userToShow => {
      this.userToShow = userToShow;
      this.usersResult = null;
    });
    this.userService.sendSearch.subscribe(userSearchResult => {
      this.usersResult = userSearchResult;
      this.userToShow = null;
    });
    const currentUser = this.userService._currentUserDetail;
    if (currentUser) {
      this.userToShow = currentUser;
    }
  }

  ngOnInit() {
  }

  editProfile(user: User): void {
    const profileDialog = this.dialog.open(DialogProfileComponent, {
      width: '600px',
      data: {formTitle: 'Change your profile...', user: user},
      disableClose: false
    });

    profileDialog.afterClosed().subscribe(result => {
      if (result && result !== 'cancel') {
        console.log(result);
      }
    });
  }

  deleteUser(user: User): void {
    const alertDialog = this.dialog.open(DialogAlertComponent, {
      width: '450px',
      data: {
        state: 'You are about to delete a user.',
        message: 'Do you want to continue?',
        responseOne: 'Yes',
        responseTwo: 'No'
      },
      autoFocus: false
    });

    alertDialog.afterClosed().subscribe(result => {
      if (result === 'Yes') {

      } else if (result === 'No') {

      }
    });
  }
}


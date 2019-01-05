import {Component, OnInit} from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import {UsersService} from '../../services/users/users.service';
import {User} from '../user';
import {DialogProfileComponent} from '../dialog-profile/dialog-profile.component';
import {DialogAlertComponent} from '../../component/dialog-alert/dialog-alert.component';
import {AuthService} from '../../services/auth/auth.service';
import {FirebaseService} from '../../services/database/firebase.service';
import {LoggerService} from '../../services/logger/logger.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  userToShow: User;
  usersResult: User[];
  currentUser: User;

  constructor(private usersService: UsersService, private authService: AuthService, private firebaseService: FirebaseService,
              private logger: LoggerService, private router: Router, private dialog: MatDialog, private snackBar: MatSnackBar) {
    authService.user.subscribe(user => this.currentUser = user);
    this.usersService.sendDetails.subscribe(userToShow => {
      this.userToShow = userToShow;
      this.usersResult = null;
    });
    this.usersService.sendSearch.subscribe(userSearchResult => {
      this.usersResult = userSearchResult;
      this.userToShow = null;
    });
    this.userToShow = (this.usersService.currentUserDetail) ? this.usersService.currentUserDetail : null;
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
        this.firebaseService.updateUser(result, this.currentUser).then(() => {
          this.usersService.refreshUsers(user.userID);
        }, (error) => this.logger.storeError(error));
      }
    });
  }

  deleteUser(user: User): void {
    const alertDialog = this.dialog.open(DialogAlertComponent, {
      width: '450px',
      data: {
        state: 'You are going to delete your account.',
        message: 'Do you want to continue ?',
        responseOne: 'Yes',
        responseTwo: 'No'
      },
      autoFocus: false
    });

    alertDialog.afterClosed().subscribe(result => {
      if (result === 'Yes') {
        this.userToShow = null;
        this.usersService.currentUserDetail = null;
        this.usersService.unsubscribeUsers();
        this.firebaseService.deleteUser(user.userID).then(() => this.authService.deleteUser());
      }
    });
  }

  resetPassword(user: User) {
    this.authService.resetPassword(user.email).then(() => {
      this.snackBar.open('Email sent, check it for reset your password.', '', {
        duration: 5000,
        panelClass: 'successSnackBar'
      });
    }, (error) => this.logger.storeError(error));
  }
}


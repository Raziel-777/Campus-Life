import {Component, HostBinding, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {UserService} from '../user.service';
import {User} from '../user';
import {DialogProfileComponent} from '../dialog-profile/dialog-profile.component';

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
  }

  ngOnInit() {
  }

  show(id: number): void {
    this.userService.showDetails(id);
  }

  editProfile(user: User): void {
    const profileDialog = this.dialog.open(DialogProfileComponent, {
      width: '500px',
      data: {user: user},
      disableClose: true
    });

    profileDialog.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  mailTo(mail: string): void {
    window.location.href = 'mailto:' + mail;
  }
}


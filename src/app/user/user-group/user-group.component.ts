import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {User} from '../user';

@Component({
  selector: 'app-user-group',
  templateUrl: './user-group.component.html',
  styleUrls: ['./user-group.component.css']
})
export class UserGroupComponent implements OnInit {

  groups: User[][][];
  sizeUsersGroup: number;
  colSizeRow: number;
  colSizeGroup: number;

  constructor(private userService: UserService) {
    const currentGroup = this.userService._currentUsersGroup;
    if (currentGroup) {
      this.makeHtmlGroup(currentGroup);
    }
  }

  ngOnInit() {
    this.userService.sendGroup.subscribe(data => {
      this.makeHtmlGroup(data);
    });
  }

  makeHtmlGroup(data) {
    this.groups = [];
    this.sizeUsersGroup = data.size; // size of users groups
    const groups = data.groups;
    let groupsPerRow; // number of users per row in html
    let i = 0; // iterator for intermediate groups
    let z = 0; // iterator for each group in groups sent by group maker
    switch (this.sizeUsersGroup) {
      case 2:
        groupsPerRow = 4;
        loop:
          while (true) {
            this.groups[i] = [];
            for (let j = 0; j < groupsPerRow; j++) {
              this.groups[i].push(groups[z]);
              if (z === groups.length - 1) {
                break loop;
              }
              z++;
            }
            i++;
          }
        break;
      case 3:
        groupsPerRow = 3;
        loop:
          while (true) {
            this.groups[i] = [];
            for (let j = 0; j < groupsPerRow; j++) {
              this.groups[i].push(groups[z]);
              if (z === groups.length - 1) {
                break loop;
              }
              z++;
            }
            i++;
          }
        break;
      case 4:
      case 5:
        groupsPerRow = 2;
        loop:
          while (true) {
            this.groups[i] = [];
            for (let j = 0; j < groupsPerRow; j++) {
              this.groups[i].push(groups[z]);
              if (z === groups.length - 1) {
                break loop;
              }
              z++;
            }
            i++;
          }
        break;
      default:
        groupsPerRow = 1;
        for (z; z < groups.length; z++) {
          this.groups[z] = [];
          this.groups[z].push(groups[z]);
        }
    }
    this.colSizeRow = 12 / groupsPerRow;
    this.colSizeGroup = Math.trunc(12 / this.sizeUsersGroup);
  }
}

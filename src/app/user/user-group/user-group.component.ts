import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {User} from '../user';

@Component({
  selector: 'app-user-group',
  templateUrl: './user-group.component.html',
  styleUrls: ['./user-group.component.css']
})
export class UserGroupComponent implements OnInit {

  groups: User[][] = null;
  col: number;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.sendGroup.subscribe(groups => {
      this.groups = groups;
      this.col = Math.floor(12 / this.groups[0].length);
    });
  }
}

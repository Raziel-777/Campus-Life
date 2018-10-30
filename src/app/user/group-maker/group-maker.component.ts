import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {User} from '../user';

@Component({
  selector: 'app-group-maker',
  templateUrl: './group-maker.component.html',
  styleUrls: ['./group-maker.component.css']
})
export class GroupMakerComponent implements OnInit {

  private usersList: User[];

  constructor(private userService: UserService = new UserService()) { }

  ngOnInit() {
    this.usersList = this.userService.getUsers();
  }

}

import {Component, HostListener, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {User} from '../user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  private usersList: User[];

  @HostListener('click')
  show(id: number) {
    this.userService.showDetails(id);
  }

  constructor(private userService: UserService = new UserService()) {
  }

  ngOnInit() {
    this.usersList = this.userService.getUsers();
  }


}

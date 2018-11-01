import {Component, HostBinding, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {User} from '../user';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  userToShow: User = null;
  usersResult: User[] = null;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.sendDetails.subscribe(userToShow => {
      this.userToShow = userToShow;
      this.usersResult = null;
    });
    this.userService.sendSearch.subscribe(result => {
      this.usersResult = result;
      this.userToShow = null;
    });
  }

  show(id: number) {
    this.userService.showDetails(id);
  }
}

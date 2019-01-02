import {Component, Input, OnInit} from '@angular/core';
import {User} from '../user';
import {UsersService} from '../../services/users/users.service';

@Component({
  selector: 'app-result-search',
  templateUrl: './result-search.component.html',
  styleUrls: ['./result-search.component.css']
})
export class ResultSearchComponent implements OnInit {

  @Input() result: User[];

  constructor(private usersService: UsersService) {
  }

  ngOnInit() {
  }

  show(id: string) {
    if (id) {
      this.result = [];
      this.usersService.showDetails(id);
    }
  }
}

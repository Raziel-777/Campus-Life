import {Component, Input, OnInit} from '@angular/core';
import {User} from '../user';
import {UserService} from '../user.service';

@Component({
  selector: 'app-result-search',
  templateUrl: './result-search.component.html',
  styleUrls: ['./result-search.component.css']
})
export class ResultSearchComponent implements OnInit {

  @Input() result: User[];

  constructor(private userService: UserService) {
  }

  ngOnInit() {
  }

  show(id: number) {
    if (id) {
      this.result = [];
      this.userService.showDetails(id);
    }
  }
}

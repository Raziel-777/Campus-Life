import {Component, Input, OnInit} from '@angular/core';
import {User} from '../user';
import {GroupService} from '../../services/group/group.service';

@Component({
  selector: 'app-result-search',
  templateUrl: './result-search.component.html',
  styleUrls: ['./result-search.component.css']
})
export class ResultSearchComponent implements OnInit {

  @Input() result: User[];

  constructor(private userService: GroupService) {
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

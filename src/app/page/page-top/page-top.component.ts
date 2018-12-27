import {Component, HostListener, Input, OnInit} from '@angular/core';
import {UsersService} from '../../services/group/users.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-page-top',
  templateUrl: './page-top.component.html',
  styleUrls: ['./page-top.component.css']
})
export class PageTopComponent implements OnInit {

  formSearch: FormGroup;
  formSearchInput: FormControl;

  constructor(private userService: UsersService, formBuilder: FormBuilder) {
    this.formSearch = formBuilder.group({});
    this.formSearchInput = new FormControl('', Validators.minLength(3));
  }

  ngOnInit() {
  }

  getErrorMessage() {
    return this.formSearchInput.hasError('minlength') ? 'Please at least 3 characters' : '';
  }

  search() {
    this.userService.search(this.formSearchInput.value);
    this.formSearchInput.reset('');
  }
}

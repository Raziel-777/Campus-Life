import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {User} from '../user';
import {FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-group-maker',
  templateUrl: './group-maker.component.html',
  styleUrls: ['./group-maker.component.css']
})
export class GroupMakerComponent implements OnInit {

  formGroup: FormGroup;
  formGroupSize: FormControl;
  formGroupOptions: FormControl;

  private usersList: User[];
  private readonly maxGroupSize: number;
  private usersGroupList: { groups: User[][], size: number }[];
  private selectedIndex: number;
  private saveGroupsBtn = false;

  constructor(private userService: UserService, formBuilder: FormBuilder) {
    this.usersList = this.userService.getUsers();
    this.usersGroupList = this.userService.getUsersGroupList();
    this.maxGroupSize = Math.round(this.usersList.length / 2);
    this.formGroup = formBuilder.group({
      hideRequired: true,
    });
    this.formGroupSize = new FormControl('', [Validators.required, Validators.min(2), Validators.max(this.maxGroupSize)]);
    this.formGroupOptions = new FormControl('parityNo');
    this.selectedIndex = (this.userService._currentUsersGroupIndex);
    if (this.userService._currentUsersGroupIndex === null && this.userService._currentUsersGroup !== null) {
      this.saveGroupsBtn = true;
    }
  }

  ngOnInit() {
  }

  getErrorMessage() {
    return this.formGroupSize.hasError('required') ? 'You must enter a value' :
      this.formGroupSize.hasError('max') ? 'Choose a value between 2 and ' + this.maxGroupSize :
        this.formGroupSize.hasError('min') ? 'Choose a value between 2 and ' + this.maxGroupSize : '';
  }

  makeGroup() {
  this.userService.makeGroup(this.formGroupSize.value, this.formGroupOptions.value);
  this.selectedIndex = null;
  this.saveGroupsBtn = true;
  }

  saveGroups() {
    this.userService.saveCurrentGroups();
  }

  showGroups(index: number) {
    this.saveGroupsBtn = false;
    this.userService.showGroups(index);
    this.selectedIndex = index;
  }
}

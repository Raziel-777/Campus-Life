import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {User} from '../user';
import {FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {DialogAlertComponent} from '../../component/dialog-alert/dialog-alert.component';

@Component({
  selector: 'app-group-maker',
  templateUrl: './group-maker.component.html',
  styleUrls: ['./group-maker.component.css']
})
export class GroupMakerComponent implements OnInit {

  formGroup: FormGroup;
  formGroupSize: FormControl;
  formGroupParity: FormControl;
  formGroupSector: FormControl;

  private usersList: User[];
  private readonly maxGroupSize: number;
  usersGroupList: { groups: User[][], size: number }[];
  selectedIndex: number;
  saveGroupsBtn = false;

  constructor(private userService: UserService, formBuilder: FormBuilder, private dialog: MatDialog) {
    this.usersList = this.userService.getUsers();
    this.usersGroupList = this.userService.getUsersGroupList();
    this.maxGroupSize = Math.round(this.usersList.length / 2);
    this.formGroup = formBuilder.group({
      hideRequired: true,
    });
    this.formGroupSize = new FormControl('', [Validators.required, Validators.min(2), Validators.max(this.maxGroupSize)]);
    this.formGroupParity = new FormControl('parityNo');
    this.formGroupSector = new FormControl('all');
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
    if (this.saveGroupsBtn === true) {
      const alertDialog = this.dialog.open(DialogAlertComponent, {
        width: '450px',
        data: {state: 'Be careful your groups are not saved.', message: 'Do you want to delete or save them ?'},
        autoFocus: false
      });

      alertDialog.afterClosed().subscribe(result => {
        if (result === 'delete') {
          this.userService.makeGroup(this.formGroupSize.value, this.formGroupParity.value, this.formGroupSector.value);
        } else if (result === 'save') {
          this.saveGroups();
          this.userService.makeGroup(this.formGroupSize.value, this.formGroupParity.value, this.formGroupSector.value);
        }
      });
    } else {
      this.userService.makeGroup(this.formGroupSize.value, this.formGroupParity.value, this.formGroupSector.value);
      this.selectedIndex = null;
      this.saveGroupsBtn = true;
    }
  }

  saveGroups() {
    this.userService.saveCurrentGroups();
  }

  showGroups(index: number) {
    if (this.selectedIndex === null && this.saveGroupsBtn === true) {
      const alertDialog = this.dialog.open(DialogAlertComponent, {
        width: '450px',
        data: {state: 'Be careful your groups are not saved.', message: 'Do you want to delete or save them ?'},
        autoFocus: false
      });

      alertDialog.afterClosed().subscribe(result => {
        if (result === 'delete') {
          this.saveGroupsBtn = false;
          this.userService.showGroups(index);
          this.selectedIndex = index;
        } else if (result === 'save') {
          this.saveGroups();
          this.saveGroupsBtn = false;
          this.userService.showGroups(index);
          this.selectedIndex = index;
        }
      });

    } else {
      this.saveGroupsBtn = false;
      this.userService.showGroups(index);
      this.selectedIndex = index;
    }

  }

  export() {
    this.userService.exportGroupPdf();
  }

  delete() {

  }
}

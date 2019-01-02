import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../services/users/users.service';
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

  private maxGroupSize: number;
  usersGroupList: { id: string, groups: User[][], size: number, sector: string, createdAt: number }[];
  selectedId: string;
  saveGroupsBtn = false;

  constructor(private usersService: UsersService, formBuilder: FormBuilder, private dialog: MatDialog) {
    this.usersGroupList = this.usersService.usersGroupList;
    this.usersService.sendGroupSaved.subscribe((id?) => {
      this.usersGroupList = this.usersService.usersGroupList;
      if (id) {
        this.saveGroupsBtn = false;
        this.selectedId = id;
      }
    });
    this.maxGroupSize = Math.round(this.usersService.users.length / 2);
    this.formGroup = formBuilder.group({
      hideRequired: true,
    });
    this.formGroupSize = new FormControl('', [Validators.required, Validators.min(2), Validators.max(this.maxGroupSize)]);
    this.formGroupParity = new FormControl('parityNo');
    this.formGroupSector = new FormControl('all');
    this.selectedId = this.usersService._currentUsersGroupIndex;
    if (this.usersService._currentUsersGroupIndex === null && this.usersService._currentUsersGroup !== null) {
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
        data: {
          state: 'Be careful your groups are not saved.',
          message: 'Do you want to delete or save them ?',
          responseOne: 'Save',
          responseTwo: 'Delete'
        },
        autoFocus: false
      });

      alertDialog.afterClosed().subscribe(result => {
        if (result === 'Delete') {
          this.usersService.makeGroup(this.formGroupSize.value, this.formGroupParity.value, this.formGroupSector.value);
        } else if (result === 'Save') {
          this.saveGroups();
          this.usersService.makeGroup(this.formGroupSize.value, this.formGroupParity.value, this.formGroupSector.value);
        }
      });
    } else {
      this.usersService.makeGroup(this.formGroupSize.value, this.formGroupParity.value, this.formGroupSector.value);
      this.selectedId = null;
      this.saveGroupsBtn = true;
    }
  }

  saveGroups() {
    this.usersService.saveCurrentGroups();
  }

  showGroups(id: string) {
    if (this.selectedId === null && this.saveGroupsBtn === true) {
      const alertDialog = this.dialog.open(DialogAlertComponent, {
        width: '450px',
        data: {
          state: 'Be careful your groups are not saved.',
          message: 'Do you want to delete or save them ?',
          responseOne: 'Save',
          responseTwo: 'Delete'
        },
        autoFocus: false
      });

      alertDialog.afterClosed().subscribe(result => {
        if (result === 'Delete') {
          this.saveGroupsBtn = false;
          this.usersService.showGroups(id);
          this.selectedId = id;
        } else if (result === 'Save') {
          this.saveGroups();
          this.saveGroupsBtn = false;
          this.usersService.showGroups(id);
          this.selectedId = id;
        }
      });

    } else {
      this.saveGroupsBtn = false;
      this.usersService.showGroups(id);
      this.selectedId = id;
    }

  }

  export() {
    this.usersService.exportGroupPdf();
  }

  delete() {

  }

  changeMinMaxValue(value) {
    switch (value) {
      case 'all':
        this.maxGroupSize = Math.round(this.usersService.users.length / 2);
        break;
      case 'indus':
        this.maxGroupSize = Math.round(this.usersService.usersIndus.length / 2);
        break;
      case 'web':
        this.maxGroupSize = Math.round(this.usersService.usersWeb.length / 2);
        break;
    }
    this.formGroupSize.reset();
    this.formGroupSize.setValidators([Validators.required, Validators.min(2), Validators.max(this.maxGroupSize)]);
  }
}

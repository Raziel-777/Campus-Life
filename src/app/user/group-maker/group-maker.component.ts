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

  getErrorMessage() {
    return this.formGroupSize.hasError('required') ? 'You must enter a value' :
      this.formGroupSize.hasError('max') ? 'Choose a value between 2 and ' + this.maxGroupSize :
        this.formGroupSize.hasError('min') ? 'Choose a value between 2 and ' + this.maxGroupSize : '';
  }

  constructor(private userService: UserService, formBuilder: FormBuilder) {
    this.usersList = this.userService.getUsers();
    this.maxGroupSize = Math.round(this.usersList.length / 2);
    this.formGroup = formBuilder.group({
      hideRequired: true,
    });
    this.formGroupSize = new FormControl('', [Validators.required, Validators.min(2), Validators.max(this.maxGroupSize)]);
    this.formGroupOptions = new FormControl('parityNo');
  }

  ngOnInit() {

  }

  makeGroup() {

  }

}

import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {User} from '../user';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-dialog-profile',
  templateUrl: './dialog-profile.component.html',
  styleUrls: ['./dialog-profile.component.css']
})
export class DialogProfileComponent implements OnInit {

  formProfile: FormGroup;

  constructor(private dialogRef: MatDialogRef<DialogProfileComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              formBuilder: FormBuilder) {
    const user: User = data.user;
    const birthDate = ((user.birthDate !== null) ? new Date(user.birthDate).toISOString() : null);
    this.formProfile = formBuilder.group({
      firstName: new FormControl(user.firstName, Validators.required),
      lastName: new FormControl(user.lastName, Validators.required),
      presentation: new FormControl(user.presentation, Validators.maxLength(255)),
      email: new FormControl(user.email, [Validators.required, Validators.email]),
      phone1: new FormControl(user.phone1, [Validators.minLength(10), Validators.maxLength(10)]),
      phone2: new FormControl(user.phone2, [Validators.minLength(10), Validators.maxLength(10)]),
      birthDate: new FormControl(birthDate, Validators.required),
      address: new FormControl(user.address),
      postCode: new FormControl(user.postcode),
      city: new FormControl(user.city),
      gender: new FormControl(user.gender, Validators.required)
    });
  }

  ngOnInit() {
  }

  userUpdate() {
    console.log(this.formProfile.value);
  }
}

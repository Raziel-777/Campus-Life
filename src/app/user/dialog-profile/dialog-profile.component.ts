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
  startDate: string = null;

  constructor(private dialogRef: MatDialogRef<DialogProfileComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              formBuilder: FormBuilder) {
    const user: User = data.user;
    let birthDate;
    if (user._birthDate) {
      birthDate = new Date(user._birthDate).toISOString();
      this.startDate = null;
    } else {
      this.startDate = new Date(Date.now() - 788400000000).toISOString();
    }
    this.formProfile = formBuilder.group({
      firstName: new FormControl(user._firstName, Validators.required),
      lastName: new FormControl(user._lastName, Validators.required),
      presentation: new FormControl(user._presentation, Validators.maxLength(255)),
      email: new FormControl(user._email, [Validators.required, Validators.email]),
      phone1: new FormControl(user._phone1, [Validators.minLength(10), Validators.maxLength(10)]),
      phone2: new FormControl(user._phone2, [Validators.minLength(10), Validators.maxLength(10)]),
      birthDate: new FormControl(birthDate, Validators.required),
      address: new FormControl(user._address),
      postCode: new FormControl(user._postcode),
      city: new FormControl(user._city),
      gender: new FormControl(user._gender, Validators.required),
      sector: new FormControl(user._sector, Validators.required)
    });
  }

  ngOnInit() {
  }

  saveUser() {
    this.dialogRef.close(this.formProfile.value);
  }

  cancelClick() {
    this.dialogRef.close('cancel');
  }
}

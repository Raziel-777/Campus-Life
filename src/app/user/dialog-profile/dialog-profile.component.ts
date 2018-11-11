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
  formFirstNameInput: FormControl;
  formLastNameInput: FormControl;
  formPresentationInput: FormControl;
  formEmailInput: FormControl;
  formPhone1Input: FormControl;
  formPhone2Input: FormControl;
  formBirthDateInput: FormControl;
  formAddressInput: FormControl;
  formPostcodeInput: FormControl;
  formCityInput: FormControl;
  formGenderInput: FormControl;
  formAvatarInput: FormControl;

  constructor(private dialogRef: MatDialogRef<DialogProfileComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              formBuilder: FormBuilder) {
    const user: User = data.user;
    this.formProfile = formBuilder.group({});
    this.formFirstNameInput = new FormControl(user.firstName);
    this.formLastNameInput = new FormControl(user.lastName);
    this.formPresentationInput = new FormControl(user.presentation);
    this.formEmailInput = new FormControl(user.email);
    this.formPhone1Input = new FormControl(user.phone1);
    this.formPhone2Input = new FormControl(user.phone2);
    this.formBirthDateInput = new FormControl(new Date(user.birthDate).toISOString());
    this.formAddressInput = new FormControl(user.address);
    this.formPostcodeInput = new FormControl(user.postcode);
    this.formCityInput = new FormControl(user.city);
    this.formGenderInput = new FormControl(user.gender);
    this.formAvatarInput = new FormControl('');
  }

  ngOnInit() {
  }

}

import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {User} from '../user';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {ImageCroppedEvent} from 'ngx-image-cropper';

@Component({
  selector: 'app-dialog-profile',
  templateUrl: './dialog-profile.component.html',
  styleUrls: ['./dialog-profile.component.css']
})
export class DialogProfileComponent implements OnInit {

  formTitle: string;
  formProfile: FormGroup;
  startDate: string = null;
  displayForm = true;
  imageChangedEvent: any = '';
  croppedImage = '';
  imageToSave: Blob = null;
  @ViewChild('avatarInput')
  avatarInput: ElementRef;
  displayPassword: boolean;


  constructor(private dialogRef: MatDialogRef<DialogProfileComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              formBuilder: FormBuilder,
              public snackBar: MatSnackBar) {
    this.displayPassword = !!data.password;
    this.formTitle = data.formTitle;
    const user: User = (data.user) ? data.user : {};
    let birthDate;
    if (user._birthDate) {
      birthDate = new Date(user._birthDate).toISOString();
      this.startDate = null;
    } else {
      this.startDate = new Date(Date.now() - 788400000000).toISOString();
    }
    this.formProfile = formBuilder.group({
      firstName: new FormControl(user._firstName || '', Validators.required),
      lastName: new FormControl(user._lastName || '', Validators.required),
      presentation: new FormControl(user._presentation || '', Validators.maxLength(255)),
      email: new FormControl(user._email || data.email, [Validators.required, Validators.email]),
      phone1: new FormControl(user._phone1 || '', [Validators.minLength(10), Validators.maxLength(10),
        Validators.pattern('^([0-9]*)$')]),
      phone2: new FormControl(user._phone2 || '', [Validators.minLength(10), Validators.maxLength(10),
        Validators.pattern('^([0-9]*)$')]),
      birthDate: new FormControl(birthDate, Validators.required),
      address: new FormControl(user._address || ''),
      postCode: new FormControl(user._postcode || ''),
      city: new FormControl(user._city || ''),
      gender: new FormControl(user._gender || '', Validators.required),
      sector: new FormControl(user._sector || 'undefined', Validators.required)
    });
    if (data.password) {
      const password = new FormControl('', [Validators.required, Validators.pattern('^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$')]);
      const repeatPassword = new FormControl('', [Validators.required]);
      this.formProfile.addControl('password', password);
      this.formProfile.addControl('repeatPassword', repeatPassword);
      this.formProfile.setValidators(DialogProfileComponent.matchingConfirmPasswords('password', 'repeatPassword'));
    }
  }

  static matchingConfirmPasswords(password: string, repeatPassword: string): ValidatorFn {
    return (formGroup: FormGroup): ValidationErrors => {
      const control = formGroup.controls[password];
      const matchingControl = formGroup.controls[repeatPassword];
      if (matchingControl.errors && !matchingControl.errors.matchingConfirm) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({matchingConfirm: true});
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  ngOnInit() {
  }

  saveUser() {
    if (!this.formProfile.invalid) {
      this.dialogRef.close({formValue: this.formProfile.value, avatar: this.imageToSave});
    }
  }

  cancelClick() {
    this.dialogRef.close('cancel');
  }

  openFileUpload(event: any) {
    event.preventDefault();
    this.avatarInput.nativeElement.click();
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.imageToSave = event.file;
  }

  imageLoaded() {
    this.dialogRef.disableClose = true;
    this.displayForm = false;
  }

  loadImageFailed() {
    this.openSnackBar('Incorrect format, it must be png, jpg or gif.', '');
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      panelClass: 'dangerSnackBar'
    });
  }

  cancelCrop() {
    this.dialogRef.disableClose = false;
    this.imageChangedEvent = null;
    this.avatarInput.nativeElement.value = '';
    this.croppedImage = '';
    this.imageToSave = null;
    this.displayForm = true;
  }

  saveCrop() {
    this.dialogRef.disableClose = false;
    this.imageChangedEvent = null;
    this.avatarInput.nativeElement.value = '';
    this.displayForm = true;
  }

  getEmailErrorMessage() {
    return this.formProfile.controls.email.hasError('required') ? 'This field is required' :
      this.formProfile.controls.email.hasError('email') ? 'Enter a correct email address' :
        '';
  }

  getPasswordErrorMessage() {
    return this.formProfile.controls.password.hasError('required') ? 'This field is required' :
      this.formProfile.controls.password.hasError('pattern') ?
        'Password must contain at least 6 characters with 1 capital and 1 digit at least' :
        '';
  }

  getRepeatPasswordErrorMessage() {
    return this.formProfile.controls.repeatPassword.hasError('matchingConfirm') ? 'Confirm password must match password' :
      this.formProfile.controls.repeatPassword.hasError('required') ? 'This field is required' :
        '';
  }

  getFirstNameErrorMessage() {
    return this.formProfile.controls.firstName.hasError('required') ? 'This field is required' :
      '';
  }

  getLastNameErrorMessage() {
    return this.formProfile.controls.lastName.hasError('required') ? 'This field is required' :
      '';
  }

  getPhone1ErrorMessage() {
    return this.formProfile.controls.phone1.hasError('minlength') ? 'Invalid phone number' :
      this.formProfile.controls.phone1.hasError('maxlength') ? 'Invalid phone number' :
        this.formProfile.controls.phone1.hasError('pattern') ? 'Invalid phone number' :
          '';
  }

  getPhone2ErrorMessage() {
    return this.formProfile.controls.phone2.hasError('minlength') ? 'Invalid phone number' :
      this.formProfile.controls.phone2.hasError('maxlength') ? 'Invalid phone number' :
        this.formProfile.controls.phone2.hasError('pattern') ? 'Invalid phone number' :
      '';
  }

  getGenderErrorMessage() {
    return this.formProfile.controls.gender.hasError('required') ? 'You have to choose' :
      '';
  }
}

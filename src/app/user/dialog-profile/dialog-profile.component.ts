import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {User} from '../user';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ImageCroppedEvent} from 'ngx-image-cropper';
import {MatSnackBar} from '@angular/material';

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
  croppedImage: any = '';
  @ViewChild('avatarInput')
  avatarInput: ElementRef;


  constructor(private dialogRef: MatDialogRef<DialogProfileComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              formBuilder: FormBuilder,
              public snackBar: MatSnackBar) {
    this.formTitle = data.formTitle;
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
    this.dialogRef.close({formValue: this.formProfile.value, avatar: this.croppedImage});
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
    });
  }

  cancelCrop() {
    this.dialogRef.disableClose = false;
    this.imageChangedEvent = null;
    this.avatarInput.nativeElement.value = '';
    this.croppedImage = '';
    this.displayForm = true;
  }

  saveCrop() {
    this.dialogRef.disableClose = false;
    this.imageChangedEvent = null;
    this.avatarInput.nativeElement.value = '';
    this.displayForm = true;
  }
}

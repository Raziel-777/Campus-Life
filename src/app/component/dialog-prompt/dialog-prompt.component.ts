import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-dialog-prompt',
  templateUrl: './dialog-prompt.component.html',
  styleUrls: ['./dialog-prompt.component.css']
})
export class DialogPromptComponent implements OnInit {

  promptType: string;
  message: string;
  placeHolder: string;
  responseOne: string;
  responseTwo: string;
  prompt: FormControl;

  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: {
    promptType: string,
    state: string,
    message: string,
    responseOne: string,
    responseTwo: string
  }) {
    this.promptType = data.promptType;
    this.message = data.message;
    this.responseOne = data.responseOne;
    this.responseTwo = data.responseTwo;
    if (data.promptType === 'email') {
      this.prompt = new FormControl('', [Validators.required, Validators.email]);
      this.placeHolder = 'Your email...';
    }
  }

  ngOnInit() {
  }

  response(response: string) {
    if (response === 'Ok') {
      this.dialogRef.close(this.prompt.value);
    } else {
      this.dialogRef.close();
    }
  }

  getEmailErrorMessage() {
    return this.prompt.hasError('required') ? 'This field is required' :
      this.prompt.hasError('email') ? 'Enter a correct email address' :
        '';
  }
}

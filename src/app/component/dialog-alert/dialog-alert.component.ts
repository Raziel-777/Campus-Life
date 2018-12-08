import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-dialog-alert',
  templateUrl: './dialog-alert.component.html',
  styleUrls: ['./dialog-alert.component.css']
})
export class DialogAlertComponent implements OnInit {

  state: string;
  message: string;
  responseOne: string;
  responseTwo: string;

  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: {
    state: string,
    message: string,
    responseOne: string,
    responseTwo: string
  }) {
    this.state = data.state;
    this.message = data.message;
    this.responseOne = data.responseOne;
    this.responseTwo = data.responseTwo;
  }

  ngOnInit() {
  }

  response(response: string) {
    this.dialogRef.close(response);
  }
}

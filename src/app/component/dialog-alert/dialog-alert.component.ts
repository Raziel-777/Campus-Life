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

  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: { state: string, message: string }) {
    this.state = data.state;
    this.message = data.message;
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close('save');
  }

  delete() {
    this.dialogRef.close('delete');
  }

  ngOnInit() {
  }

}

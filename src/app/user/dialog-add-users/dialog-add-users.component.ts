import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {FirebaseService} from '../../services/database/firebase.service';

@Component({
  selector: 'app-dialog-add-users',
  templateUrl: './dialog-add-users.component.html',
  styleUrls: ['./dialog-add-users.component.css']
})
export class DialogAddUsersComponent implements OnInit {

  @ViewChild('textArea')
  textArea: ElementRef;
  loaderOn = false;
  resultOn = false;
  resultMessageError: string;
  success: number;
  failures: string[];
  loaderOptions: { color: string, mode: string, value: number } = {color: 'primary', mode: 'determinate', value: 0};

  constructor(private firebase: FirebaseService, private dialogRef: MatDialogRef<DialogAddUsersComponent>) {
  }

  ngOnInit() {
  }

  cancel() {
    this.dialogRef.close();
  }

  addUsers() {
    const authorizedEmails = this.textArea.nativeElement.value.split(/[\n;, ]+/).filter(email =>
      email.length > 4);
    if (authorizedEmails.length > 0) {
      this.loaderOn = true;
      this.success = 0;
      this.failures = [];
      const incrementLoader = Math.ceil(100 / authorizedEmails.length);
      this.addAuthorizedEmails(authorizedEmails, incrementLoader).then(() => {
        this.loaderOn = false;
        this.resultOn = true;
      });
    } else {
      this.resultOn = true;
      this.resultMessageError = 'No valid email address found';
    }
  }

  addAuthorizedEmails(authorizedEmails, incrementLoader) {
    return new Promise((resolve, reject) => {
      for (const email of authorizedEmails) {
        this.firebase.addAuthorizedEmail(email).then(() => {
          this.success++;
          this.loaderOptions.value += incrementLoader;
          if (this.loaderOptions.value >= 100) {
            resolve();
          }
        }, (emailFailure) => {
          this.failures.push(emailFailure);
          this.loaderOptions.value += incrementLoader;
          if (this.loaderOptions.value >= 100) {
            resolve();
          }
        });
      }
    });
  }
}

import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor(private firestore: AngularFirestore) { }

  storeError(error: any) {
    const date = new Date(Date.now()).toISOString();
    this.firestore.collection('errors')
      .doc(date)
      .set({
        code: error.code,
        message: error.message,
        name: error.name
      }).then(null);
  }
}

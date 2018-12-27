import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from '../../user/user';
import {FirebaseService} from '../database/firebase.service';
import {Router} from '@angular/router';
import {LoggerService} from '../logger/logger.service';
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<User>;

  constructor(private fireAuth: AngularFireAuth, private firebaseService: FirebaseService,
              public router: Router, private logger: LoggerService) {
    this.user = this.fireAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.firebaseService.getObservableData(`users/${user.uid}`);
        } else {
          return of(null);
        }
      })
    );
  }

  get authenticated(): boolean {
    return this.user !== null;
  }

  get currentUser(): any {
    return this.authenticated ? this.user : null;
  }

  // get currentUserObservable(): Observable<User> {
  //   return this.fireAuth.authState;
  // }

  // get currentUserId(): string {
  //   return this.authenticated ? this.authState.uid : '';
  // }

  signUp(data) {
    return new Promise(((resolve, reject) => {
      this.fireAuth.auth.createUserWithEmailAndPassword(data.formValue.email, data.formValue.password)
        .then((auth) => {
          this.firebaseService.saveNewUser(data, auth.user.uid)
            .then(() => {
              resolve();
            }, (error) => {
              this.deleteUser();
              reject(error);
            });
        }, (err) => {
          reject(err);
        });
    }));
  }

  signIn(userData) {
    return new Promise(((resolve, reject) => {
      this.fireAuth.auth.signInWithEmailAndPassword(userData.email, userData.password)
        .then((user) => {
          resolve();
        }, (error) => {
          reject(error);
        });
    }));
  }

  signOut() {
    return new Promise((resolve, reject) => {
      this.fireAuth.auth.signOut().then(() => {
        resolve();
      }, (error) => {
        reject(error);
      });
    });
  }

  resetPassword(email: string) {
    return new Promise((resolve, reject) => {
      this.fireAuth.auth.sendPasswordResetEmail(email).then(() => {
        resolve();
      }, (error) => {
        reject(error);
      });
    });
  }

  deleteUser() {
    this.fireAuth.auth.currentUser.delete()
      .then(() => {
        this.router.navigate(['/login']).then(null);
      })
      .catch((error) => {
        this.logger.storeError(error);
      });

  }
}


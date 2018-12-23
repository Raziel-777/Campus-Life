import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireStorage} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState: any = null;

  constructor(private firestore: AngularFirestore, private fireAuth: AngularFireAuth, private fireStorage: AngularFireStorage) {
    this.fireAuth.authState.subscribe((auth) => {
      this.authState = auth;
    });
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  get currentUser(): any {
    return this.authenticated ? this.authState : null;
  }

  get currentUserObservable(): any {
    return this.fireAuth.authState;
  }

  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  signUp(data) {
    const userData = data.formValue;
    const avatarData = (data.avatar) ? data.avatar : null;
    return new Promise(((resolve, reject) => {
      this.fireAuth.auth.createUserWithEmailAndPassword(userData.email, userData.password)
        .then((user) => {
          this.authState = user;
          if (avatarData) {
            this.saveUserAvatar(avatarData)
              .then((userUrl) => {
                userData.avatar = userUrl;
                this.saveUserData(userData)
                  .then(() => {
                    this.deleteAuthorizedEmail(userData.email);
                    resolve();
                  }, (error) => {
                    reject(error);
                  });
              }, (error) => {
                reject(error);
              });
          } else {
            this.randomBaseAvatar(userData.gender).then((baseUrl) => {
              userData.avatar = baseUrl;
              this.saveUserData(userData)
                .then(() => {
                  this.deleteAuthorizedEmail(userData.email);
                  resolve();
                }, (error) => {
                  reject(error);
                });
            });
          }
        }, (err) => {
          reject(err);
        });
    }));
  }

  private saveUserAvatar(file) {
    return new Promise(((resolve, reject) => {
      const storageRef = this.fireStorage.storage.ref();
      const fileRef = storageRef.child('avatar/users/' + this.currentUserId);
      fileRef.put(file)
        .then(() => {
          fileRef.getDownloadURL().then((userUrl) => {
            resolve(userUrl);
          }, (error) => {
            reject(error);
          });
        }, (error) => {
          reject(error);
        });
    }));
  }

  private saveUserData(userData) {
    return new Promise((resolve, reject) => {
      this.firestore.collection('users')
        .doc(this.currentUserId)
        .set({
          firstName: userData.firstName,
          lastName: userData.lastName,
          birthDate: userData.birthDate.getTime(),
          gender: userData.gender,
          email: userData.email,
          address: userData.address,
          postcode: userData.postCode,
          city: userData.city,
          phone1: userData.phone1,
          phone2: userData.phone2,
          avatar: userData.avatar,
          presentation: userData.presentation,
          sector: userData.sector
        }).then(() => {
        resolve();
      }, (err) => {
        reject(err);
      });
    });
  }

  private randomBaseAvatar(gender) {
    const index = [1, 2, 3, 4];
    const rand = index[Math.floor(Math.random() * index.length)];
    const baseRef = this.fireStorage.storage.ref();
    const avatarRef = baseRef.child('avatar/base/' + gender + rand.toString() + '.png');
    return new Promise(((resolve, reject) => {
      avatarRef.getDownloadURL().then((baseUrl) => {
        resolve(baseUrl);
      }, (error) => {
        reject(error);
      });
    }));
  }

  private deleteAuthorizedEmail(emailToDelete) {
    this.firestore.collection('authorizedEmail').doc(emailToDelete).delete()
      .then(null);
  }

  signIn(userData) {
    return new Promise(((resolve, reject) => {
      this.fireAuth.auth.signInWithEmailAndPassword(userData.email, userData.password)
        .then((user) => {
          this.authState = user;
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



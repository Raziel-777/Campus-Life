import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireStorage} from '@angular/fire/storage';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: AngularFirestore, private fireStorage: AngularFireStorage) {
  }

  getObservableData(pathToData): Observable<any> {
    return this.firestore.doc(pathToData).valueChanges();
  }

  saveNewUser(data, userId) {
    const userData = data.formValue;
    const avatarData = (data.avatar) ? data.avatar : null;
    return new Promise((resolve, reject) => {
      if (avatarData) {
        this.saveUserAvatar(avatarData, userId)
          .then((userUrl) => {
            userData.avatar = userUrl;
            this.saveUserData(userData, userId)
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
          this.saveUserData(userData, userId)
            .then(() => {
              this.deleteAuthorizedEmail(userData.email);
              resolve();
            }, (error) => {
              reject(error);
            });
        });
      }
    });
  }

  private saveUserAvatar(file, userId) {
    return new Promise(((resolve, reject) => {
      const storageRef = this.fireStorage.storage.ref();
      const fileRef = storageRef.child('avatar/users/' + userId);
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

  private saveUserData(userData, userId) {
    return new Promise((resolve, reject) => {
      this.firestore.collection('users')
        .doc(userId)
        .set({
          firstName: userData.firstName,
          lastName: userData.lastName,
          birthDate: userData.birthDate.getTime(),
          gender: userData.gender,
          email: userData.email,
          role: 'user',
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
    // this.firestore.collection('authorizedEmail').doc(emailToDelete).delete()
    //   .then(null);
  }
}


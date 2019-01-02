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

  getCollection<type>(pathToCollection): Observable<type[]> {
    return this.firestore.collection<type>(pathToCollection).valueChanges();
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
              }, (error) => reject(error));
          }, (error) => reject(error));
      } else {
        this.randomBaseAvatar(userData.gender).then((baseUrl) => {
          userData.avatar = baseUrl;
          this.saveUserData(userData, userId)
            .then(() => {
              this.deleteAuthorizedEmail(userData.email);
              resolve();
            }, (error) => reject(error));
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
          fileRef.getDownloadURL().then((userUrl) => resolve(userUrl), (error) => reject(error));
        }, (error) => reject(error));
    }));
  }

  private saveUserData(userData, userId) {
    return new Promise((resolve, reject) => {
      this.firestore.collection('users').doc(userId)
        .set({
          userID: userId,
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
        }).then(() => resolve(), (err) => reject(err));
    });
  }

  updateUser(data, user) {
    const userData = data.formValue;
    const avatarData = (data.avatar) ? data.avatar : null;
    return new Promise((resolve, reject) => {
      if (avatarData) {
        this.saveUserAvatar(avatarData, user.userID)
          .then((userUrl) => {
            userData.avatar = userUrl;
            this.updateUserData(userData, user.userID)
              .then(() => resolve(), (error) => reject(error));
          }, (error) => reject(error));
      } else {
        userData.avatar = user.avatar;
        this.updateUserData(userData, user.userID)
          .then(() => resolve(), (error) => reject(error));
      }
    });
  }

  private updateUserData(userData, userId) {
    return new Promise((resolve, reject) => {
      this.firestore.collection('users')
        .doc(userId)
        .update({
          firstName: userData.firstName,
          lastName: userData.lastName,
          birthDate: userData.birthDate.getTime(),
          gender: userData.gender,
          address: userData.address,
          postcode: userData.postCode,
          city: userData.city,
          phone1: userData.phone1,
          phone2: userData.phone2,
          avatar: userData.avatar,
          presentation: userData.presentation,
          sector: userData.sector
        }).then(() => resolve(), (err) => reject(err));
    });
  }

  deleteUser(userId) {
    return new Promise((resolve, reject) => {
      this.firestore.collection('users')
        .doc(userId)
        .delete()
        .then(() => resolve(), (error) => reject(error));
    });
  }

  addAuthorizedEmail(email: string) {
    return new Promise((resolve, reject) => {
      this.firestore.collection('authorizedEmail').doc(email)
        .set({
          email: email
        }).then(() => resolve(), () => reject(email));
    });
  }

  saveGroup(dataToSend: { groups: {}, size: number, sector: string, createdAt: number }) {
    return new Promise((resolve, reject) => {
      this.firestore.collection('groupLists').add({
        groups: dataToSend.groups,
        size: dataToSend.size,
        sector: dataToSend.sector,
        createdAt: dataToSend.createdAt
      }).then((docRef) => {
        const id = docRef.id;
        this.firestore.collection('groupLists').doc(id).update({
          id: id
        }).then(() => resolve(id), (error) => reject(error));
      }, (error) => reject(error));
    });
  }

  private randomBaseAvatar(gender) {
    const index = [1, 2, 3, 4];
    const rand = index[Math.floor(Math.random() * index.length)];
    const baseRef = this.fireStorage.storage.ref();
    const avatarRef = baseRef.child('avatar/base/' + gender + rand.toString() + '.png');
    return new Promise(((resolve, reject) => {
      avatarRef.getDownloadURL().then((baseUrl) => resolve(baseUrl), (error) => reject(error));
    }));
  }

  private deleteAuthorizedEmail(emailToDelete) {
    this.firestore.collection('authorizedEmail')
      .doc(emailToDelete).delete()
      .then(null);
  }
}


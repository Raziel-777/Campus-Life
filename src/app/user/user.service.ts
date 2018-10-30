import {EventEmitter, Injectable, Output} from '@angular/core';
import {User} from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  @Output() sendDetails: EventEmitter<User> = new EventEmitter();

  private usersJson = {
    'users': [
      {
        'userID': 1,
        'firstName': 'Gerard',
        'lastName': 'Lebranchu',
        'birthDate': 278518305,
        'gender': 'male',
        'address': '40 allée de la boustifaille',
        'postcode': '75500',
        'city': 'Paris',
        'phone1': '0547125896',
        'phone2': '0785124578',
        'email': 'lepetitbranchu@gmail.com',
        'avatar': 'assets/img/avatar/baseMale.png',
        'presentation': 'Aime le foot et la bière'
      },
      {
        'userID': 2,
        'firstName': 'Robert',
        'lastName': 'Dubois',
        'birthDate': 341676705,
        'gender': 'male',
        'address': '8 rue des totems',
        'postcode': '75500',
        'city': 'Paris',
        'phone1': '0547147966',
        'phone2': '0714254578',
        'email': 'bebertdu75@gmail.com',
        'avatar': 'assets/img/avatar/baseMale.png',
        'presentation': 'Aime le foot et la bière'
      },
      {
        'userID': 3,
        'firstName': 'Julie',
        'lastName': 'Cousine',
        'birthDate': 814975905,
        'gender': 'female',
        'address': '78 avenue Gerard Lebranchu',
        'postcode': '42600',
        'city': 'Saint Etienne',
        'phone1': '0541025896',
        'phone2': '',
        'email': 'petitefleur@gmail.com',
        'avatar': 'assets/img/avatar/baseFemale.png',
        'presentation': 'Caissière à Mammouth'
      }
    ]
  };

  private readonly users: User[];

  constructor() {
    this.users = [];
    for (const user of this.usersJson.users) {
      const newUser = new User(user.userID, user.firstName, user.lastName, user.birthDate, user.gender, user.email, user.city, user.address,
        user.postcode, user.phone1, user.phone2, user.avatar, user.presentation);
      this.users.push(newUser);
    }
  }

  getUsers(): User[] {
    return this.users;
  }

  showDetails(id: number) {
    const userToShow = this.users.find(i => i.userID === id);
    this.sendDetails.emit(userToShow);
  }
}

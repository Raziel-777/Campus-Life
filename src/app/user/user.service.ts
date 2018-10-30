import {Injectable} from '@angular/core';
import {User} from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersJson = {
    'users': [
      {
        'userID': 1,
        'firstname': 'Gerard',
        'lastname': 'Lebranchu',
        'birthdate': 278518305,
        'gender': 'male',
        'address': '40 allée de la boustifaille',
        'postcode': '75500',
        'city': 'Paris',
        'phone1': '0547125896',
        'phone2': '0785124578',
        'email': 'lepetitbranchu@gmail.com',
        'avatar': 'assets/img/avatar/baseMale.png',
        'presentation': ''
      },
      {
        'userID': 2,
        'firstname': 'Robert',
        'lastname': 'Dubois',
        'birthdate': 341676705,
        'gender': 'male',
        'address': '8 rue des totems',
        'postcode': '75500',
        'city': 'Paris',
        'phone1': '0547147966',
        'phone2': '0714254578',
        'email': 'bebertdu75@gmail.com',
        'avatar': 'assets/img/avatar/baseMale.png',
        'presentation': ''
      },
      {
        'userID': 3,
        'firstname': 'Julie',
        'lastname': 'Cousine',
        'birthdate': 814975905,
        'gender': 'female',
        'address': '78 avenue Gerard Lebranchu',
        'postcode': '42600',
        'city': 'Saint Etienne',
        'phone1': '0541025896',
        'phone2': '0785123658',
        'email': 'petitefleur@gmail.com',
        'avatar': 'assets/img/avatar/baseFemale.png',
        'presentation': 'Caissière à Mammouth'
      }
    ]
  };

  private users: User[];

  constructor() {
    this.users = [];
    for (const user of this.usersJson.users) {
      const newUser = new User(user.userID, user.firstname, user.lastname, user.birthdate, user.gender, user.email, user.city, user.address,
        user.postcode, user.phone1, user.phone2, user.avatar, user.presentation);
      this.users.push(newUser);
    }
  }

  getUsers(): User[] {
    return this.users;
  }
}

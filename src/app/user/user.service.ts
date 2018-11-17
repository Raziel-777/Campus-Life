import {EventEmitter, Injectable, Output} from '@angular/core';
import {User} from './user';
import users from '../../assets/users.json';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly users: User[];
  private userSearchResult: User[];
  private currentUsersGroup: Object;
  private currentUserDetail: User;

  constructor(public router: Router) {
    this.users = [];
    for (const user of users.students) {
      const newUser = new User(user.userID, user.firstName, user.lastName, user.birthDate, user.gender, user.email, user.city, user.address,
        user.postcode, user.phone1, user.phone2, user.avatar, user.presentation);
      this.users.push(newUser);
    }
  }

  @Output() sendDetails: EventEmitter<User> = new EventEmitter();
  @Output() sendGroup: EventEmitter<object> = new EventEmitter();
  @Output() sendSearch: EventEmitter<User[]> = new EventEmitter();

  static randomItem(items: User[]): User {
    return items[Math.floor(Math.random() * items.length)];
  }

  getUsers(): User[] {
    return this.users;
  }

  get _currentUserDetail(): User {
    return this.currentUserDetail;
  }

  get _currentUsersGroup(): Object {
    return this.currentUsersGroup;
  }

  showDetails(id: number) {
    const userToShow = this.users.find(i => i.userID === id);
    this.sendDetails.emit(userToShow);
    this.currentUserDetail = userToShow;
  }

  search(input: string) {
    this.userSearchResult = [];
    this.currentUserDetail = null;
    for (const user of this.users) {
      if (user.firstName.toLowerCase().includes(input.toLowerCase()) || user.lastName.toLowerCase().includes(input.toLowerCase())) {
        this.userSearchResult.push(user);
      }
    }
    this.router.navigate(['/students']).then(() => {
      this.sendSearch.emit(this.userSearchResult);
    });
  }

  makeGroup(groupSize: number, option: string) {
    const usersList = Object.assign([], this.users);
    const result: User[][] = [];
    const fullGroupNumber = Math.trunc(this.users.length / groupSize);
    if (option === 'parityNo') {

      for (let i = 0; i < fullGroupNumber; i++) {
        const group: User[] = [];
        for (let j = 0; j < groupSize; j++) {
          const randomUser = UserService.randomItem(usersList);
          group.push(randomUser);
          usersList.splice(usersList.indexOf(randomUser), 1);
        }
        result.push(group);
      }
      if (usersList.length > 0) {
        result.push(usersList);
      }
      this.sendGroup.emit({groups: result, size: groupSize});
    } else if (option === 'parityYes') {
      const manGroup: User[] = [];
      const womanGroup: User[] = [];
      for (const user of usersList) {
        if (user.gender === 'male') {
          manGroup.push(user);
        } else {
          womanGroup.push(user);
        }
      }
      let pingPong = 'manGroup';
      for (let i = 0; i < fullGroupNumber; i++) {
        const group: User[] = [];
        for (let j = 0; j < groupSize; j++) {
          if (pingPong === 'manGroup') {
            if (manGroup.length > 0) {
              const randomUser = UserService.randomItem(manGroup);
              group.push(randomUser);
              manGroup.splice(manGroup.indexOf(randomUser), 1);
              pingPong = 'womanGroup';
              continue;
            } else {
              pingPong = 'womanGroup';
              j--;
              continue;
            }
          } else if (pingPong === 'womanGroup') {
            if (womanGroup.length > 0) {
              const randomUser = UserService.randomItem(womanGroup);
              group.push(randomUser);
              womanGroup.splice(womanGroup.indexOf(randomUser), 1);
              pingPong = 'manGroup';
              continue;
            } else {
              pingPong = 'manGroup';
              j--;
              continue;
            }
          }
        }
        result.push(group);
      }
      const lastGroup: User[] = womanGroup.concat(manGroup);
      if (lastGroup.length > 0) {
        result.push(lastGroup);
      }
      this.sendGroup.emit({groups: result, size: groupSize});
    }
    this.currentUsersGroup = {groups: result, size: groupSize};
  }
}

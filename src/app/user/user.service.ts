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
  private currentUsersGroup: { groups: User[][], size: number } = null;
  private currentUsersGroupIndex: number = null;
  private currentUserDetail: User;
  private usersGroupList: { groups: User[][], size: number }[];
  private usersGroupListExample: { groups: Number[][], size: number }[] = [
    {'groups': [[12, 19], [7, 1], [2, 15], [10, 13], [3, 16], [18, 5], [17, 8], [4, 14], [11, 22], [20, 9], [21, 6]], 'size': 2},
    {'groups': [[14, 19, 8], [20, 1, 2], [10, 17, 18], [12, 4, 13], [11, 5, 6], [9, 16, 7], [3, 21, 22], [15]], 'size': 3},
    {'groups': [[19, 5, 1, 21, 8, 15], [12, 10, 13, 3, 11, 22], [4, 2, 14, 7, 9, 16], [6, 17, 18, 20]], 'size': 6},
    {'groups': [[19, 5, 1, 21, 8, 15], [12, 10, 13, 3, 11, 22], [4, 2, 14, 7, 9, 16], [6, 17, 18, 20]], 'size': 6},
    {'groups': [[19, 5, 1, 21, 8, 15], [12, 10, 13, 3, 11, 22], [4, 2, 14, 7, 9, 16], [6, 17, 18, 20]], 'size': 6},
    {'groups': [[19, 5, 1, 21, 8, 15], [12, 10, 13, 3, 11, 22], [4, 2, 14, 7, 9, 16], [6, 17, 18, 20]], 'size': 6},
    {'groups': [[19, 5, 1, 21, 8, 15], [12, 10, 13, 3, 11, 22], [4, 2, 14, 7, 9, 16], [6, 17, 18, 20]], 'size': 6}
  ];
  private defaultUser: Object = {
    'userID': null,
    'firstName': 'Deleted user',
    'lastName': 'Deleted user',
    'birthDate': null,
    'gender': null,
    'email': null,
    'address': null,
    'postcode': null,
    'city': null,
    'phone1': null,
    'phone2': null,
    'avatar': 'assets/img/avatar/baseMale.jpg',
    'presentation': null
  };

  constructor(public router: Router) {
    this.users = [];
    // TODO faire une API service
    for (const user of users.students) {
      const newUser = new User(user.userID, user.firstName, user.lastName, user.birthDate, user.gender, user.email, user.city, user.address,
        user.postcode, user.phone1, user.phone2, user.avatar, user.presentation);
      this.users.push(newUser);
    }
    this.fetchUsersGroupList();
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

  getUsersGroupList() {
    return this.usersGroupList;
  }

  get _currentUserDetail(): User {
    return this.currentUserDetail;
  }

  get _currentUsersGroup(): { groups: User[][]; size: number } {
    return this.currentUsersGroup;
  }

  get _currentUsersGroupIndex(): number {
    return this.currentUsersGroupIndex;
  }

  set _currentUsersGroup(value: { groups: User[][]; size: number }) {
    this.currentUsersGroup = value;
  }

  // TODO faire api service
  fetchUsersGroupList() {
    this.usersGroupList = [];
    for (const groupObjectList of this.usersGroupListExample) {
      const groupObject = {} as { groups: User[][], size: number };
      groupObject.groups = [];
      for (const group of groupObjectList.groups) {
        const userGroup: User[] = [];
        for (const userId of group) {
          const user: User = this.users.find(i => i._userID === userId);
          if (user) {
            userGroup.push(user);
          }
        }
        groupObject.groups.push(userGroup);
      }
      groupObject.size = groupObjectList.size;
      this.usersGroupList.push(groupObject);
    }
  }

  showDetails(id: number) {
    const userToShow = this.users.find(i => i._userID === id);
    this.sendDetails.emit(userToShow);
    this.currentUserDetail = userToShow;
  }

  showGroups(index: number) {
    this.currentUsersGroupIndex = index;
    this.sendGroup.emit(this.usersGroupList[index]);
    this._currentUsersGroup = this.usersGroupList[index];
  }

  search(input: string) {
    this.userSearchResult = [];
    this.currentUserDetail = null;
    for (const user of this.users) {
      if (user._firstName.toLowerCase().includes(input.toLowerCase()) || user._lastName.toLowerCase().includes(input.toLowerCase())) {
        this.userSearchResult.push(user);
      }
    }
    this.router.navigate(['/students']).then(() => {
      this.sendSearch.emit(this.userSearchResult);
    });
  }

  saveCurrentGroups() {
    const dataToSend: { groups: Number[][], size: number } = {} as { groups: Number[][], size: number };
    dataToSend.groups = [];
    for (const group of this.currentUsersGroup.groups) {
      const dataGroup: number[] = [];
      for (const user of group) {
        dataGroup.push(user._userID);
      }
      dataToSend.groups.push(dataGroup);
    }
    dataToSend.size = this.currentUsersGroup.size;
    console.log(JSON.stringify(dataToSend));
    // TODO: enlever bouton save groups si save ok
  }

  makeGroup(groupSize: number, option: string) {
    this.currentUsersGroup = null;
    this.currentUsersGroupIndex = null;
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
        if (user._gender === 'male') {
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
    this._currentUsersGroup = {groups: result, size: groupSize};
  }
}

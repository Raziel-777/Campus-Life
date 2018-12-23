// import {EventEmitter, Injectable, Output} from '@angular/core';
// import {User} from '../../user/user';
// import users from '../../../assets/users.json';
// import UserFunctions from '../../user/static/userFunctions';
// import {Router} from '@angular/router';
//
//
// @Injectable({
//   providedIn: 'root'
// })
// export class GroupService {
//
//   private readonly users: User[];
//   private readonly usersIndus: User[];
//   private readonly usersWeb: User[];
//   private userSearchResult: User[];
//   private currentUsersGroup: { groups: User[][], size: number } = null;
//   private currentUsersGroupIndex: number = null;
//   private currentUserDetail: User;
//   private usersGroupList: { groups: User[][], size: number, sector: string }[];
//   private usersGroupListExample: { groups: Number[][], size: number, sector: string }[] = [
//     {
//       'groups': [[12, 19], [7, 1], [2, 15], [10, 13], [3, 16], [18, 5], [17, 8], [4, 14], [11, 22], [20, 9], [21, 6]],
//       'size': 2,
//       'sector': 'indus'
//     },
//     {
//       'groups': [[14, 19, 8], [20, 1, 2], [10, 17, 18], [12, 4, 13], [11, 5, 6], [9, 16, 7], [3, 21, 22], [15]],
//       'size': 3, 'sector': 'web'
//     },
//     {
//       'groups': [[19, 5, 1, 21, 8, 15], [12, 10, 13, 3, 11, 22], [4, 2, 14, 7, 9, 16], [6, 17, 18, 20]],
//       'size': 6,
//       'sector': 'all'
//     },
//     {
//       'groups': [[19, 5, 1, 21, 8, 15], [12, 10, 13, 3, 11, 22], [4, 2, 14, 7, 9, 16], [6, 17, 18, 20]],
//       'size': 6,
//       'sector': 'web'
//     },
//     {
//       'groups': [[19, 5, 1, 21, 8, 15], [12, 10, 13, 3, 11, 22], [4, 2, 14, 7, 9, 16], [6, 17, 18, 20]],
//       'size': 6,
//       'sector': 'indus'
//     },
//     {
//       'groups': [[19, 5, 1, 21, 8, 15], [12, 10, 13, 3, 11, 22], [4, 2, 14, 7, 9, 16], [6, 17, 18, 20]],
//       'size': 6,
//       'sector': 'web'
//     },
//     {
//       'groups': [[19, 5, 1, 21, 8, 15], [12, 10, 13, 3, 11, 22], [4, 2, 14, 7, 9, 16], [6, 17, 18, 20]],
//       'size': 6,
//       'sector': 'indus'
//     }
//   ];
//   private deletedUser: User = new User(null, 'Deleted', 'Deleted', null,
//     null, null, null, null, null, null, null,
//     'assets/img/avatar/baseMale.png', null, 'undefined');
//
//   constructor(public router: Router) {
//     this.users = [];
//     this.usersWeb = [];
//     this.usersIndus = [];
//     // TODO faire une API service
//     for (const user of users.students) {
//       const newUser = new User(user.userID, user.firstName, user.lastName, user.birthDate, user.gender, user.email, user.city, user.address,
//         user.postcode, user.phone1, user.phone2, user.avatar, user.presentation, user.sector);
//       this.users.push(newUser);
//       if (newUser._sector === 'indus') {
//         this.usersIndus.push(newUser);
//       } else if (newUser._sector === 'web') {
//         this.usersWeb.push(newUser);
//       }
//     }
//     this.fetchUsersGroupList();
//   }
//
//   @Output() sendDetails: EventEmitter<User> = new EventEmitter();
//   @Output() sendGroup: EventEmitter<object> = new EventEmitter();
//   @Output() sendSearch: EventEmitter<User[]> = new EventEmitter();
//   @Output() sendExportGroupPdf: EventEmitter<any> = new EventEmitter();
//
//   getUsers(): User[] {
//     return this.users;
//   }
//
//   getUsersWeb(): User[] {
//     return this.usersWeb;
//   }
//
//   getUsersIndus(): User[] {
//     return this.usersIndus;
//   }
//
//   getUsersGroupList() {
//     return this.usersGroupList;
//   }
//
//   get _currentUserDetail(): User {
//     return this.currentUserDetail;
//   }
//
//   get _currentUsersGroup(): { groups: User[][]; size: number } {
//     return this.currentUsersGroup;
//   }
//
//   get _currentUsersGroupIndex(): number {
//     return this.currentUsersGroupIndex;
//   }
//
//   set _currentUsersGroup(value: { groups: User[][]; size: number }) {
//     this.currentUsersGroup = value;
//   }
//
//   // TODO faire api service
//   fetchUsersGroupList() {
//     this.usersGroupList = [];
//     for (const groupObjectList of this.usersGroupListExample) {
//       const groupObject = {} as { groups: User[][], size: number, sector: string };
//       groupObject.groups = [];
//       for (const group of groupObjectList.groups) {
//         const userGroup: User[] = [];
//         for (const userId of group) {
//           const user: User = this.users.find(i => i._userID === userId);
//           if (user) {
//             userGroup.push(user);
//           } else {
//             userGroup.push(this.deletedUser);
//           }
//         }
//         groupObject.groups.push(userGroup);
//       }
//       groupObject.size = groupObjectList.size;
//       groupObject.sector = groupObjectList.sector;
//       this.usersGroupList.push(groupObject);
//     }
//   }
//
//   showDetails(id: number) {
//     const userToShow = this.users.find(i => i._userID === id);
//     this.sendDetails.emit(userToShow);
//     this.currentUserDetail = userToShow;
//   }
//
//   showGroups(index: number) {
//     this.currentUsersGroupIndex = index;
//     this.sendGroup.emit(this.usersGroupList[index]);
//     this._currentUsersGroup = this.usersGroupList[index];
//   }
//
//   search(input: string) {
//     this.userSearchResult = [];
//     this.currentUserDetail = null;
//     for (const user of this.users) {
//       if (user._firstName.toLowerCase().includes(input.toLowerCase()) || user._lastName.toLowerCase().includes(input.toLowerCase())) {
//         this.userSearchResult.push(user);
//       }
//     }
//     this.router.navigate(['/students']).then(() => {
//       this.sendSearch.emit(this.userSearchResult);
//     });
//   }
//
//   saveCurrentGroups() {
//     const dataToSend: { groups: Number[][], size: number } = {} as { groups: Number[][], size: number };
//     dataToSend.groups = [];
//     for (const group of this.currentUsersGroup.groups) {
//       const dataGroup: number[] = [];
//       for (const user of group) {
//         dataGroup.push(user._userID);
//       }
//       dataToSend.groups.push(dataGroup);
//     }
//     dataToSend.size = this.currentUsersGroup.size;
//     console.log(JSON.stringify(dataToSend));
//     // TODO: enlever bouton save groups si save ok
//   }
//
//   makeGroup(groupSize: number, parity: string, sector: string) {
//     this.currentUsersGroup = null;
//     this.currentUsersGroupIndex = null;
//     let usersList;
//     switch (sector) {
//       case 'all':
//         usersList = Object.assign([], this.users);
//         break;
//       case 'indus':
//         usersList = Object.assign([], this.usersIndus);
//         break;
//       case 'web':
//         usersList = Object.assign([], this.usersWeb);
//         break;
//       default:
//         usersList = Object.assign([], this.users);
//     }
//     const result = UserFunctions.randomGroupMaker(usersList, this.usersGroupList, groupSize, parity);
//     this._currentUsersGroup = {groups: result, size: groupSize};
//     this.sendGroup.emit({groups: result, size: groupSize});
//   }
//
//   exportGroupPdf() {
//     this.sendExportGroupPdf.emit();
//   }
// }

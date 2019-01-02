import {EventEmitter, Injectable, Output} from '@angular/core';
import {User} from '../../user/user';
import UserFunctions from '../../user/static/userFunctions';
import {Router} from '@angular/router';
import {FirebaseService} from '../database/firebase.service';
import {AuthService} from '../auth/auth.service';
import {Observable, of, Subscription} from 'rxjs';
import {LoggerService} from '../logger/logger.service';

interface UsersGroupListAPI {
  id: string;
  groups: {};
  size: number;
  sector: string;
  createdAt: number;
}

interface UsersGroupList {
  id: string;
  groups: User[][];
  size: number;
  sector: string;
  createdAt: number;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  // USERS //
  private usersSubscription: Subscription;
  private usersObservable: Observable<User[]> = of(null);
  users: User[];
  usersIndus: User[];
  usersWeb: User[];
  usersAdmin: User[];
  // USERS GROUP LIST //
  private usersGroupListSubscription: Subscription;
  private usersGroupListObservable: Observable<UsersGroupListAPI[]>;
  private usersGroupListAPI: UsersGroupListAPI[];
  usersGroupList: UsersGroupList[];
  // USER //
  currentUserDetail: User;
  private userSearchResult: User[];
  private currentUsersGroup: { groups: User[][], size: number, sector: string } = null;
  private currentUsersGroupId: string = null;

  constructor(private authService: AuthService, private firebaseService: FirebaseService, private router: Router,
              private logger: LoggerService) {
    this.authService.currentUserObservable.subscribe((user) => {
      if (user) {
        this.init();
      }
    });
    authService.user.subscribe(user => {
      if (user && user.role === 'admin') {
        this.initAdmin();
      }
    });
  }

  @Output() sendDetails: EventEmitter<User> = new EventEmitter();
  @Output() sendGroup: EventEmitter<object> = new EventEmitter();
  @Output() sendSearch: EventEmitter<User[]> = new EventEmitter();
  @Output() sendExportGroupPdf: EventEmitter<any> = new EventEmitter();
  @Output() sendRefreshUsers: EventEmitter<any> = new EventEmitter();
  @Output() sendGroupSaved: EventEmitter<any> = new EventEmitter();

  init() {
    this.usersObservable = this.firebaseService.getCollection<User>('users');
    this.usersSubscription = this.usersObservable.subscribe(users => {
      if (users) {
        this.users = users;
        this.arrangeUsers();
      }
    });
  }

  initAdmin() {
    this.usersGroupListObservable = this.firebaseService.getCollection<UsersGroupListAPI>('groupLists');
    this.usersGroupListSubscription = this.usersGroupListObservable.subscribe(usersGroupList => {
      if (usersGroupList) {
        this.usersGroupListAPI = usersGroupList;
        this.fetchUsersGroupList();
      }
    });
  }

  unsubscribeUsers() {
    this.usersSubscription.unsubscribe();
    if (this.usersGroupListSubscription) {
      this.usersGroupListSubscription.unsubscribe();
    }
  }

  arrangeUsers() {
    this.usersWeb = [];
    this.usersIndus = [];
    this.usersAdmin = [];
    for (const user of this.users) {
      if (user.role === 'admin') {
        this.usersAdmin.push(user);
      } else {
        if (user.sector === 'indus') {
          this.usersIndus.push(user);
        } else if (user.sector === 'web') {
          this.usersWeb.push(user);
        }
      }
    }
  }

  get _currentUsersGroup(): { groups: User[][]; size: number, sector: string } {
    return this.currentUsersGroup;
  }

  get _currentUsersGroupIndex(): string {
    return this.currentUsersGroupId;
  }

  set _currentUsersGroup(value: { groups: User[][]; size: number, sector: string }) {
    this.currentUsersGroup = value;
  }

  fetchUsersGroupList() {
    this.usersGroupList = [];
    for (const usersGroupObject of this.usersGroupListAPI) {
      const groupObject = {} as { id: string, groups: User[][], size: number, sector: string, createdAt: number };
      const objEntries = Object.entries(usersGroupObject.groups);
      const objToArray = [];
      objEntries.forEach((element) => objToArray.push(element[1]));
      groupObject.groups = [];
      for (const usersGroup of objToArray) {
        const userGroup: User[] = [];
        for (const userId of usersGroup) {
          const user: User = this.users.find(i => i.userID === userId);
          if (user) {
            userGroup.push(user);
          }
        }
        groupObject.groups.push(userGroup);
      }
      groupObject.id = usersGroupObject.id;
      groupObject.size = usersGroupObject.size;
      groupObject.sector = usersGroupObject.sector;
      groupObject.createdAt = usersGroupObject.createdAt;
      this.usersGroupList.push(groupObject);
    }
    this.usersGroupList.sort((a, b) => b.createdAt - a.createdAt);
    this.sendGroupSaved.emit();
  }

  refreshUsers(userToShowId?) {
    this.sendRefreshUsers.emit();
    if (this.currentUserDetail && userToShowId) {
      this.showDetails(userToShowId);
    }
  }

  showDetails(id: string) {
    const userToShow = this.users.find(i => i.userID === id);
    this.sendDetails.emit(userToShow);
    this.currentUserDetail = userToShow;
  }

  showGroups(id: string) {
    this.currentUsersGroupId = id;
    this.sendGroup.emit(this.usersGroupList.find(element => element.id === id));
    this._currentUsersGroup = this.usersGroupList[id];
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

  saveCurrentGroups() {
    const dataToSend: UsersGroupListAPI = {} as UsersGroupListAPI;
    dataToSend.groups = {};
    let index = 0;
    for (const group of this.currentUsersGroup.groups) {
      const dataGroup: string[] = [];
      for (const user of group) {
        dataGroup.push(user.userID);
      }
      dataToSend.groups[index] = dataGroup;
      index++;
    }
    dataToSend.size = this.currentUsersGroup.size;
    dataToSend.sector = this.currentUsersGroup.sector;
    dataToSend.createdAt = Date.now();
    this.firebaseService.saveGroup(dataToSend).then((id) => {
      this.currentUsersGroupId = <string>id;
      this.sendGroupSaved.emit(id);
    }, (error) => this.logger.storeError(error));
  }

  makeGroup(groupSize: number, parity: string, sector: string) {
    this.currentUsersGroup = null;
    this.currentUsersGroupId = null;
    let usersList;
    switch (sector) {
      case 'all':
        usersList = Object.assign([], this.users).filter((value, index, arr) => {
          return value.role !== 'admin';
        });
        break;
      case 'indus':
        usersList = Object.assign([], this.usersIndus);
        break;
      case 'web':
        usersList = Object.assign([], this.usersWeb);
        break;
      default:
        usersList = Object.assign([], this.users).filter((value, index, arr) => {
          return value.role !== 'admin';
        });
    }
    const result = UserFunctions.randomGroupMaker(usersList, this.usersGroupList, groupSize, parity);
    this._currentUsersGroup = {groups: result, size: groupSize, sector: sector};
    this.sendGroup.emit({groups: result, size: groupSize, sector: sector});
  }

  exportGroupPdf() {
    this.sendExportGroupPdf.emit();
  }

  triggerShowDetails(userId) {
    this.showDetails(userId);
    this.router.navigate(['/students']).then(null);
  }
}

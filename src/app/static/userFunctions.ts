import {User} from '../user/user';

export default class UserFunctions {

  static alreadyGrouped(user: User, groupsList: { groups: User[][], size: number, sector: string }[]): User[] {
    let usersFound: User[] = [];
    for (const obj of groupsList) {
      for (const group of obj.groups) {
        if (group.includes(user)) {
          usersFound = usersFound.concat(group);
        }
      }
    }
    const unique: User[] = Array.from(new Set(usersFound));
    unique.splice(unique.indexOf(user), 1);
    return unique;
  }

  static randomUser(items: User[]): User {
    return items[Math.floor(Math.random() * items.length)];
  }

  static splitParityGroup(groupToSplit: User[]): [User[], User[]] {
    const manGroup: User[] = [];
    const womanGroup: User[] = [];
    for (const user of groupToSplit) {
      if (user._gender === 'male') {
        manGroup.push(user);
      } else {
        womanGroup.push(user);
      }
    }
    if (manGroup.length > womanGroup.length) {
      return [manGroup, womanGroup];
    } else if (manGroup.length < womanGroup.length) {
      return [womanGroup, manGroup];
    } else {
      return [manGroup, womanGroup];
    }
  }

  static removeAlreadyGrouped(usersFound: User[], usersGroup: User[][], remainingSize: number): User[][] {
    for (let z = 0; z < usersFound.length; z++) {
      if (usersGroup[0].length + usersGroup[1].length > remainingSize) {
        const userToRemove = UserFunctions.randomUser(usersFound);
        const indexMajorGroup = usersGroup[0].indexOf(userToRemove);
        if (indexMajorGroup !== -1) {
          usersGroup[0].splice(indexMajorGroup, 1);
        } else {
          const indexMinorGroup = usersGroup[1].indexOf(userToRemove);
          if (indexMinorGroup !== -1) {
            usersGroup[1].splice(indexMinorGroup, 1);
          }
        }
      }
    }
    return usersGroup;
  }

  static randomGroupMaker(
    usersList: User[],
    usersGroupList: { groups: User[][], size: number, sector: string }[],
    groupSize: number,
    parity: string): User[][] {

    const result: User[][] = [];
    const fullGroupNumber = Math.trunc(usersList.length / groupSize);
    const splitGroup = UserFunctions.splitParityGroup(usersList);
    const majorGroup = splitGroup[0];
    const minorGroup = splitGroup[1];
    if (parity === 'parityNo' || majorGroup.length === 0 || minorGroup.length === 0) {
      for (let i = 0; i < fullGroupNumber; i++) {
        const noDuplicate: User[] = Object.assign([], usersList);
        const group: User[] = [];
        for (let j = 0; j < groupSize; j++) {
          const randomUser = UserFunctions.randomUser(noDuplicate);
          group.push(randomUser);
          usersList.splice(usersList.indexOf(randomUser), 1);
          noDuplicate.splice(noDuplicate.indexOf(randomUser), 1);
          const usersFound = UserFunctions.alreadyGrouped(randomUser, usersGroupList);
          for (let z = 0; z < usersFound.length; z++) {
            if (noDuplicate.length >= groupSize - z - 1) {
              const userToRemove = UserFunctions.randomUser(usersFound);
              const index = noDuplicate.indexOf(userToRemove);
              if (index !== -1) {
                noDuplicate.splice(index, 1);
              }
            }
          }
        }
        result.push(group);
      }
      if (usersList.length > 0) {
        result.push(usersList);
      }
      return result;

    } else if (parity === 'parityYes' && majorGroup.length > 0 && minorGroup.length > 0) {
      const totalRatio = majorGroup.length / minorGroup.length;
      for (let i = 0; i < fullGroupNumber; i++) {
        let noDuplicateMajor: User[] = Object.assign([], majorGroup);
        let noDuplicateMinor: User[] = Object.assign([], minorGroup);
        const group: User[] = [];
        let majorNumber = 0;
        let minorNumber = 0;
        let randomUser: User = null;
        let usersFound: User[] = null;
        if (noDuplicateMinor.length > 0) {
          randomUser = UserFunctions.randomUser(noDuplicateMinor);
          group.push(randomUser);
          minorNumber++;
          minorGroup.splice(minorGroup.indexOf(randomUser), 1);
          noDuplicateMinor.splice(noDuplicateMinor.indexOf(randomUser), 1);
          usersFound = UserFunctions.alreadyGrouped(randomUser, usersGroupList);
          [noDuplicateMajor, noDuplicateMinor] = UserFunctions.removeAlreadyGrouped(usersFound,
            [noDuplicateMajor, noDuplicateMinor],
            groupSize - 1);
          for (let j = 0; j < groupSize - 1; j++) {
            if (majorNumber / minorNumber <= totalRatio) {
              if (noDuplicateMajor.length > 0) {
                randomUser = UserFunctions.randomUser(noDuplicateMajor);
                group.push(randomUser);
                majorNumber++;
                majorGroup.splice(majorGroup.indexOf(randomUser), 1);
                noDuplicateMajor.splice(noDuplicateMajor.indexOf(randomUser), 1);
              } else {
                randomUser = UserFunctions.randomUser(noDuplicateMinor);
                group.push(randomUser);
                minorNumber++;
                minorGroup.splice(minorGroup.indexOf(randomUser), 1);
                noDuplicateMinor.splice(noDuplicateMinor.indexOf(randomUser), 1);
              }
            } else {
              if (noDuplicateMinor.length > 0) {
                randomUser = UserFunctions.randomUser(noDuplicateMinor);
                group.push(randomUser);
                minorNumber++;
                minorGroup.splice(minorGroup.indexOf(randomUser), 1);
                noDuplicateMinor.splice(noDuplicateMinor.indexOf(randomUser), 1);
              } else {
                randomUser = UserFunctions.randomUser(noDuplicateMajor);
                group.push(randomUser);
                majorNumber++;
                majorGroup.splice(majorGroup.indexOf(randomUser), 1);
                noDuplicateMajor.splice(noDuplicateMajor.indexOf(randomUser), 1);
              }
            }
            usersFound = UserFunctions.alreadyGrouped(randomUser, usersGroupList);
            for (let z = 0; z < usersFound.length; z++) {
              if (noDuplicateMajor.length + noDuplicateMinor.length >= groupSize - j - 2) {
                const userToRemove = UserFunctions.randomUser(usersFound);
                const indexMajorGroup = noDuplicateMajor.indexOf(userToRemove);
                if (indexMajorGroup !== -1) {
                  noDuplicateMajor.splice(indexMajorGroup, 1);
                } else {
                  const indexMinorGroup = noDuplicateMinor.indexOf(userToRemove);
                  if (indexMinorGroup !== -1) {
                    noDuplicateMinor.splice(indexMinorGroup, 1);
                  }
                }
              }
            }
          }
        } else {

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



import {User} from '../user/user';

export default class UserFunctions {

  static alreadyGrouped(user: User, groupsList: { groups: User[][], size: number, sector: string }[]): User[] {
    let usersFound: User[] = [];
    for (const obj of groupsList) {
      for (const group of obj.groups) {
        if (group.includes(user)) {
          const filteredGroup = group.filter(userToCheck => userToCheck._firstName !== 'Deleted');
          usersFound = usersFound.concat(filteredGroup);
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

  static splitParityGroup(groupToSplit: User[]): { users: User[], gender: string }[] {
    const manGroup: { users: User[], gender: string } = {users: [], gender: 'male'};
    const womanGroup: { users: User[], gender: string } = {users: [], gender: 'female'};
    for (const user of groupToSplit) {
      if (user._gender === 'male') {
        manGroup.users.push(user);
      } else {
        womanGroup.users.push(user);
      }
    }
    if (manGroup.users.length > womanGroup.users.length) {
      return [manGroup, womanGroup];
    } else if (manGroup.users.length < womanGroup.users.length) {
      return [womanGroup, manGroup];
    } else {
      return [manGroup, womanGroup];
    }
  }

  static removeAlreadyGrouped(
    usersFound: User[],
    usersGroup: { users: User[], gender: string }[],
    remainingSize: number, ratioToKeep: number): { users: User[], gender: string }[] {
    const splitGroupToRemove: { users: User[], gender: string }[] = UserFunctions.splitParityGroup(usersFound);
    let majorGroupToRemove: { users: User[], gender: string } = {} as { users: User[], gender: string };
    let minorGroupToRemove: { users: User[], gender: string } = {} as { users: User[], gender: string };
    if (usersGroup[0].gender === splitGroupToRemove[0].gender) {
      majorGroupToRemove = splitGroupToRemove[0];
      minorGroupToRemove = splitGroupToRemove[1];
    } else {
      majorGroupToRemove = splitGroupToRemove[1];
      minorGroupToRemove = splitGroupToRemove[0];
    }
    const usersFoundLength = usersFound.length;
    for (let z = 0; z < usersFoundLength; z++) {
      if (usersGroup[0].users.length + usersGroup[1].users.length > remainingSize) {
        if (usersGroup[1].users.length > 0) {
          if (usersGroup[0].users.length / usersGroup[1].users.length >= ratioToKeep) {
            const userToRemove = UserFunctions.randomUser(majorGroupToRemove.users);
            majorGroupToRemove.users.splice(majorGroupToRemove.users.indexOf(userToRemove), 1);
            const index = usersGroup[0].users.indexOf(userToRemove);
            if (index !== -1) {
              usersGroup[0].users.splice(index, 1);
            }
          } else {
            const userToRemove = UserFunctions.randomUser(minorGroupToRemove.users);
            minorGroupToRemove.users.splice(minorGroupToRemove.users.indexOf(userToRemove), 1);
            const index = usersGroup[1].users.indexOf(userToRemove);
            if (index !== -1) {
              usersGroup[1].users.splice(index, 1);
            }
          }
        } else if (usersGroup[0].users.length > 0) {
          const userToRemove = UserFunctions.randomUser(majorGroupToRemove.users);
          majorGroupToRemove.users.splice(majorGroupToRemove.users.indexOf(userToRemove), 1);
          const index = usersGroup[0].users.indexOf(userToRemove);
          if (index !== -1) {
            usersGroup[0].users.splice(index, 1);
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
    const splitGroup: { users: User[], gender: string }[] = UserFunctions.splitParityGroup(usersList);
    const majorGroup: { users: User[], gender: string } = splitGroup[0];
    const minorGroup: { users: User[], gender: string } = splitGroup[1];
    if (parity === 'parityNo' || majorGroup.users.length === 0 || minorGroup.users.length === 0) {
      for (let i = 0; i < fullGroupNumber; i++) {
        const noDuplicate: User[] = Object.assign([], usersList);
        const group: User[] = [];
        for (let j = 0; j < groupSize; j++) {
          const randomUser = UserFunctions.randomUser(noDuplicate);
          group.push(randomUser);
          usersList.splice(usersList.indexOf(randomUser), 1);
          noDuplicate.splice(noDuplicate.indexOf(randomUser), 1);
          if (groupSize - j - 1 !== 0) {
            const usersFound = UserFunctions.alreadyGrouped(randomUser, usersGroupList);
            const usersFoundLength = usersFound.length;
            for (let z = 0; z < usersFoundLength; z++) {
              if (noDuplicate.length > groupSize - j - 1) {
                const userToRemove = UserFunctions.randomUser(usersFound);
                usersFound.splice(usersFound.indexOf(userToRemove), 1);
                const index = noDuplicate.indexOf(userToRemove);
                if (index !== -1) {
                  noDuplicate.splice(index, 1);
                }
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

    } else if (parity === 'parityYes' && majorGroup.users.length > 0 && minorGroup.users.length > 0) {
      const totalRatio = majorGroup.users.length / minorGroup.users.length;
      for (let i = 0; i < fullGroupNumber; i++) {
        let noDuplicateMajor: { users: User[], gender: string } = {users: Object.assign([], majorGroup.users), gender: majorGroup.gender};
        let noDuplicateMinor: { users: User[], gender: string } = {users: Object.assign([], minorGroup.users), gender: minorGroup.gender};
        const group: User[] = [];
        let majorNumber = 0;
        let minorNumber = 0;
        let randomUser: User = null;
        let usersFound: User[] = null;
        if (noDuplicateMinor.users.length > 0) {
          randomUser = UserFunctions.randomUser(noDuplicateMinor.users);
          group.push(randomUser);
          minorNumber++;
          minorGroup.users.splice(minorGroup.users.indexOf(randomUser), 1);
          noDuplicateMinor.users.splice(noDuplicateMinor.users.indexOf(randomUser), 1);
          usersFound = UserFunctions.alreadyGrouped(randomUser, usersGroupList);
          [noDuplicateMajor, noDuplicateMinor] = UserFunctions.removeAlreadyGrouped(usersFound,
            [noDuplicateMajor, noDuplicateMinor], groupSize - 1, totalRatio);
          for (let j = 0; j < groupSize - 1; j++) {
            if (majorNumber / minorNumber <= totalRatio) {
              if (noDuplicateMajor.users.length > 0) {
                randomUser = UserFunctions.randomUser(noDuplicateMajor.users);
                group.push(randomUser);
                majorNumber++;
                majorGroup.users.splice(majorGroup.users.indexOf(randomUser), 1);
                noDuplicateMajor.users.splice(noDuplicateMajor.users.indexOf(randomUser), 1);
              } else {
                randomUser = UserFunctions.randomUser(noDuplicateMinor.users);
                group.push(randomUser);
                minorNumber++;
                minorGroup.users.splice(minorGroup.users.indexOf(randomUser), 1);
                noDuplicateMinor.users.splice(noDuplicateMinor.users.indexOf(randomUser), 1);
              }
            } else {
              if (noDuplicateMinor.users.length > 0) {
                randomUser = UserFunctions.randomUser(noDuplicateMinor.users);
                group.push(randomUser);
                minorNumber++;
                minorGroup.users.splice(minorGroup.users.indexOf(randomUser), 1);
                noDuplicateMinor.users.splice(noDuplicateMinor.users.indexOf(randomUser), 1);
              } else {
                randomUser = UserFunctions.randomUser(noDuplicateMajor.users);
                group.push(randomUser);
                majorNumber++;
                majorGroup.users.splice(majorGroup.users.indexOf(randomUser), 1);
                noDuplicateMajor.users.splice(noDuplicateMajor.users.indexOf(randomUser), 1);
              }
            }
            if (groupSize - j - 2 !== 0) {
              usersFound = UserFunctions.alreadyGrouped(randomUser, usersGroupList);
              [noDuplicateMajor, noDuplicateMinor] = UserFunctions.removeAlreadyGrouped(usersFound,
                [noDuplicateMajor, noDuplicateMinor], groupSize - j - 2, totalRatio);
            }
          }
        } else {
          for (let z = 0; z < groupSize; z++) {
            randomUser = UserFunctions.randomUser(noDuplicateMajor.users);
            group.push(randomUser);
            majorGroup.users.splice(majorGroup.users.indexOf(randomUser), 1);
            noDuplicateMajor.users.splice(noDuplicateMajor.users.indexOf(randomUser), 1);
            if (groupSize - z - 1 !== 0) {
              usersFound = UserFunctions.alreadyGrouped(randomUser, usersGroupList);
              [noDuplicateMajor, noDuplicateMinor] = UserFunctions.removeAlreadyGrouped(usersFound,
                [noDuplicateMajor, noDuplicateMinor], groupSize - z - 1, totalRatio);
            }
          }
        }
        result.push(group);
      }
      const lastGroup: User[] = majorGroup.users.concat(minorGroup.users);
      if (lastGroup.length > 0) {
        result.push(lastGroup);
      }
      return result;
    }
  }
}



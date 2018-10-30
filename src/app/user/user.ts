export class User {

  private _userID: number;
  private _firstName: string;
  private _lastName: string;
  private _birthDate: number; // timestamp
  private _gender: string;
  private _email: string;
  private _address?: string;
  private _postcode?: string;
  private _city?: string;
  private _phone1?: string;
  private _phone2?: string;
  private _avatar?: string;
  private _presentation?: string;

  constructor(userID: number, firstName: string, lastName: string, birthDate: number, gender: string, email: string, city: string,
              address: string, postcode: string, phone1: string, phone2: string, avatar: string, presentation: string) {

    this._userID = userID;
    this._firstName = firstName;
    this._lastName = lastName;
    this._birthDate = birthDate;
    this._gender = gender;
    this._email = email;
    if (address.length > 0 && address != null) {
      this._address = address;
    }
    if (postcode.length > 0 && postcode != null) {
      this._postcode = postcode;
    }
    if (city.length > 0 && city != null) {
      this._city = city;
    }
    if (phone1.length > 0 && phone1) {
      this._phone1 = phone1;
    }
    if (phone2.length > 0 && phone2 != null) {
      this._phone2 = phone2;
    }
    if (avatar.length > 0 && avatar != null) {
      this._avatar = avatar;
    }
    if (presentation.length > 0 && presentation != null) {
      this._presentation = presentation;
    }
  }

  get userID(): number {
    return this._userID;
  }

  set userID(value: number) {
    this._userID = value;
  }

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  get birthDate(): number {
    return this._birthDate;
  }

  set birthDate(value: number) {
    this._birthDate = value;
  }

  get gender(): string {
    return this._gender;
  }

  set gender(value: string) {
    this._gender = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get address(): string {
    return this._address;
  }

  set address(value: string) {
    this.address = value;
  }

  get postcode(): string {
    return this._postcode;
  }

  set postcode(value: string) {
    this._postcode = value;
  }

  get city(): string {
    return this._city;
  }

  set city(value: string) {
    this._city = value;
  }

  get phone1(): string {
    return this._phone1;
  }

  set phone1(value: string) {
    this._phone1 = value;
  }

  get phone2(): string {
    return this._phone2;
  }

  set phone2(value: string) {
    this._phone2 = value;
  }

  get avatar(): string {
    return this._avatar;
  }

  set avatar(value: string) {
    this._avatar = value;
  }

  get presentation(): string {
    return this._presentation;
  }

  set presentation(value: string) {
    this._presentation = value;
  }
}

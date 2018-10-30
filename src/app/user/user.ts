export class User {

  private _userID: number;
  private _firstname: string;
  private _lastname: string;
  private _birthdate: number; // timestamp
  private _gender: string;
  private _email: string;
  private _address?: string;
  private _postcode?: string;
  private _city?: string;
  private _phone1?: string;
  private _phone2?: string;
  private _avatar?: string;
  private _presentation?: string;

  constructor(userID: number, firstname: string, lastname: string, birthdate: number, gender: string, email: string, city: string,
              address: string, postcode: string, phone1: string, phone2: string, avatar: string, presentation: string) {

    this._userID = userID;
    this._firstname = firstname;
    this._lastname = lastname;
    this._birthdate = birthdate;
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

  get firstname(): string {
    return this._firstname;
  }

  set firstname(value: string) {
    this._firstname = value;
  }

  get lastname(): string {
    return this._lastname;
  }

  set lastname(value: string) {
    this._lastname = value;
  }

  get birthdate(): number {
    return this._birthdate;
  }

  set birthdate(value: number) {
    this._birthdate = value;
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
    this._address = value;
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

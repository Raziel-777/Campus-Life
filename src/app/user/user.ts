export class User {

  private userID: number;
  private firstName: string;
  private lastName: string;
  private birthDate: number; // timestamp
  private gender: string;
  private email: string;
  private address?: string;
  private postcode?: string;
  private city?: string;
  private phone1?: string;
  private phone2?: string;
  private avatar?: string;
  private presentation?: string;
  private sector?: string;

  constructor(userID: number, firstName: string, lastName: string, birthDate: number, gender: string, email: string, city: string,
              address: string, postcode: string, phone1: string, phone2: string, avatar: string, presentation: string, sector: string) {

    this.userID = userID;
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthDate = birthDate;
    this.gender = gender;
    this.email = email;
    this.address = address;
    this.postcode = postcode;
    this.city = city;
    this.phone1 = phone1;
    this.phone2 = phone2;
    this.avatar = avatar;
    this.presentation = presentation;
    this.sector = sector;
  }

  get _sector(): string {
    return this.sector;
  }

  set _sector(value: string) {
    this.sector = value;
  }

  get _userID(): number {
    return this.userID;
  }

  set _userID(value: number) {
    this.userID = value;
  }

  get _firstName(): string {
    return this.firstName;
  }

  set _firstName(value: string) {
    this.firstName = value;
  }

  get _lastName(): string {
    return this.lastName;
  }

  set _lastName(value: string) {
    this.lastName = value;
  }

  get _birthDate(): number {
    return this.birthDate;
  }

  set _birthDate(value: number) {
    this.birthDate = value;
  }

  get _gender(): string {
    return this.gender;
  }

  set _gender(value: string) {
    this.gender = value;
  }

  get _email(): string {
    return this.email;
  }

  set _email(value: string) {
    this.email = value;
  }

  get _address(): string {
    return this.address;
  }

  set _address(value: string) {
    this.address = value;
  }

  get _postcode(): string {
    return this.postcode;
  }

  set _postcode(value: string) {
    this.postcode = value;
  }

  get _city(): string {
    return this.city;
  }

  set _city(value: string) {
    this.city = value;
  }

  get _phone1(): string {
    return this.phone1;
  }

  set _phone1(value: string) {
    this.phone1 = value;
  }

  get _phone2(): string {
    return this.phone2;
  }

  set _phone2(value: string) {
    this.phone2 = value;
  }

  get _avatar(): string {
    return this.avatar;
  }

  set _avatar(value: string) {
    this.avatar = value;
  }

  get _presentation(): string {
    return this.presentation;
  }

  set _presentation(value: string) {
    this.presentation = value;
  }
}

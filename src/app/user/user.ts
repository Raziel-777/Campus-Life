export class User {

  userID: string;
  firstName: string;
  lastName: string;
  birthDate: number; // timestamp
  gender: string;
  email: string;
  readonly role: string;
  address: string;
  postcode: string;
  city: string;
  phone1: string;
  phone2: string;
  avatar: string;
  presentation: string;
  sector: string;

  constructor(userID: string, firstName: string, lastName: string, birthDate: number, gender: string, email: string, role: string,
              address: string, postcode: string, city: string, phone1: string, phone2: string, avatar: string, presentation: string,
              sector: string) {

    this.userID = userID;
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthDate = birthDate;
    this.gender = gender;
    this.email = email;
    this.role = role;
    this.address = address;
    this.postcode = postcode;
    this.city = city;
    this.phone1 = phone1;
    this.phone2 = phone2;
    this.avatar = avatar;
    this.presentation = presentation;
    this.sector = sector;
  }

  get _role() {
    return this.role;
  }
}

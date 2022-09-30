export class SignUpInfo {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  phone: string;

  constructor(username: string, firstName: string, lastName: string, password: string, email: string, phone: string) {
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.email = email;
    this.phone = phone;
  }


}

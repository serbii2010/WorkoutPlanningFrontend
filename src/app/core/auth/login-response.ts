export class LoginResponse {
  constructor(username: string, firstName: string, lastName: string, email: string, phone: string, role: string) {
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.role = role;
  }

  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string = 'user';
}

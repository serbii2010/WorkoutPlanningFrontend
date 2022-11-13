export class LoginResponse {
  constructor(userId: number, username: string, firstName: string, lastName: string, email: string, phone: string, role: string) {
    this.id = userId;
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.role = role;
  }

  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string = 'client';
}

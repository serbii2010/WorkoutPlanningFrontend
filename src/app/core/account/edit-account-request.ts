export class EditAccountRequest {
  constructor(firstName: string | null, lastName: string | null, email: string | null, phone: string | null) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
  }

  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phone: string | null;
}

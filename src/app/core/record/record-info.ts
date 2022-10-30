export class RecordInfo {
  id: number;
  username: string
  firstName: string;
  lastName: string;
  trainerUsername: string;
  dateTimeWorkout: string;
  dateTimeRecord: string;
  status: string;

  constructor(id: number,
              username: string,
              firstName: string,
              lastName: string,
              trainerUsername: string,
              dateTimeWorkout: string,
              dateTimeRecord: string,
              status: string) {
    this.id = id;
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.trainerUsername = trainerUsername;
    this.dateTimeWorkout = dateTimeWorkout;
    this.dateTimeRecord = dateTimeRecord;
    this.status = status;
  }
}

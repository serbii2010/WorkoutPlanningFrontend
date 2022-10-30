export class InsertRecordInfo {
  username: String;
  workoutId: number

  constructor(username: String, workoutId: number) {
    this.username = username;
    this.workoutId = workoutId;
  }
}

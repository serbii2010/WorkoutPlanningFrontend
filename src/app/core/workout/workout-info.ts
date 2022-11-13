import {RecordStatus} from "../record/record-status";

export class WorkoutInfo {
  id: number;
  date: string;
  timeStart: string;
  trainer: string;
  duration: number;
  typeWorkout: string;
  totalSeats: number;
  availableSeats: number;
  recordStatus: string;

  constructor(id: number,
              date: string,
              timeStart: string,
              trainer: string,
              duration: number,
              typeWorkout: string,
              totalSeats: number,
              availableSeats: number,
              recordStatus: string = RecordStatus.UNDEFINED) {
    this.id = id;
    this.date = date;
    this.timeStart = timeStart;
    this.trainer = trainer;
    this.duration = duration;
    this.typeWorkout = typeWorkout;
    this.totalSeats = totalSeats;
    this.availableSeats = availableSeats;
    this.recordStatus = recordStatus;
  }

}

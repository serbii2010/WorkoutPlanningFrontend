import {StatusRecord} from "../record/status-record";

export class WorkoutInfo {
  id: number;
  date: string;
  timeStart: string;
  trainer: string;
  duration: number;
  typeWorkout: string;
  totalSeats: number;
  availableSeats: number;
  statusRecord: string;

  constructor(id: number,
              date: string,
              timeStart: string,
              trainer: string,
              duration: number,
              typeWorkout: string,
              totalSeats: number,
              availableSeats: number,
              statusRecord: string = StatusRecord.UNDEFINED) {
    this.id = id;
    this.date = date;
    this.timeStart = timeStart;
    this.trainer = trainer;
    this.duration = duration;
    this.typeWorkout = typeWorkout;
    this.totalSeats = totalSeats;
    this.availableSeats = availableSeats;
    this.statusRecord = statusRecord;
  }

}

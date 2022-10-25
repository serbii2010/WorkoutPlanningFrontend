export class WorkoutInfo {
  id: number;
  date: string;
  timeStart: string;
  trainer: string;
  duration: number;
  typeWorkout: string;
  totalSeats: number;
  availableSeats: number;

  constructor(id: number, date: string, timeStart: string, trainer: string, duration: number, typeWorkout: string, totalSeats: number, availableSeats: number) {
    this.id = id;
    this.date = date;
    this.timeStart = timeStart;
    this.trainer = trainer;
    this.duration = duration;
    this.typeWorkout = typeWorkout;
    this.totalSeats = totalSeats;
    this.availableSeats = availableSeats;
  }

}

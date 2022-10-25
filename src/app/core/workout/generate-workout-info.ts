export class GenerateWorkoutInfo {
  dateStart: string;
  dateEnd: string;
  period: string;
  timeStart: string;
  trainer: string;
  typeWorkout: string;
  duration: number;
  totalSeats: number;


  constructor(dateStart: string, dateEnd: string, period: string, timeStart: string, trainer: string, type: string, duration: number, totalSeats: number) {
    this.dateStart = dateStart;
    this.dateEnd = dateEnd;
    this.period = period;
    this.timeStart = timeStart;
    this.trainer = trainer;
    this.typeWorkout = type;
    this.duration = duration;
    this.totalSeats = totalSeats;
  }
}

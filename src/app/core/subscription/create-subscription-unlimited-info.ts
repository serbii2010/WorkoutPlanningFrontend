import {SubscriptionType} from "./subscription-type";

export class CreateSubscriptionUnlimitedInfo {
  username: string;
  type: string = SubscriptionType.UNLIMITED;
  fromDate: string;
  countMonth: number;

  constructor(username: string, fromDate: string, countMonth: number) {
    this.username = username;
    this.fromDate = fromDate;
    this.countMonth = countMonth;
  }
}

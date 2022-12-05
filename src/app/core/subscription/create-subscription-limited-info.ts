import {SubscriptionType} from "./subscription-type";

export class CreateSubscriptionLimitedInfo {
  username: string;
  type: string = SubscriptionType.LIMITED;
  total: number;

  constructor(username: string, total: number) {
    this.username = username;
    this.total = total;
  }
}

import {BaseSubscriptionInfo} from "./base-subscription-info";

export class SubscriptionUnlimitedInfo implements BaseSubscriptionInfo{
  id: number;
  isActive: boolean;
  creationTimestamp: string;
  username: string;

  fromDate: string;
  toDate: string;

  constructor(id: number, isActive: boolean, timestamp: string, username: string, fromDate: string, toDate: string) {
    this.id = id;
    this.isActive = isActive;
    this.creationTimestamp = timestamp;
    this.username = username;
    this.fromDate = fromDate;
    this.toDate = toDate;
  }
}

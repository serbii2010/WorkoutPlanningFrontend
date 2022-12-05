import {BaseSubscriptionInfo} from "./base-subscription-info";

export class SubscriptionLimitedInfo implements BaseSubscriptionInfo{
  id: number;
  isActive: boolean;
  creationTimestamp: string;
  username: string;

  total: number;
  remaining: number;

  constructor(id: number, isActive: boolean, timestamp: string, username: string, total: number, remaining: number) {
    this.id = id;
    this.isActive = isActive;
    this.creationTimestamp = timestamp;
    this.username = username;
    this.total = total;
    this.remaining = remaining;
  }
}

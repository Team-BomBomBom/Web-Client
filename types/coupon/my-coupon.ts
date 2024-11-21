export interface MyCoupon {
  id: number;
  title: string;
  description: string;
  rewardType: string;
  rewardValue: number;
  expireAt: Date;
  isUsed: boolean;
}

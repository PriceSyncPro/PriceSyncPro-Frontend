export interface Coupon {
  discount: number;
  type: "percentage" | "fixed";
  description: string;
}

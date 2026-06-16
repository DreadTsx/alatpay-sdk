import type { Currency } from "../enums.ts";

export type Customer = {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  metadata: string;
};

export type GenerateVirtualAccountPayload = {
  businessId?: string;
  amount: number;
  currency: Currency;
  orderId: string;
  description: string;
  customer: Customer;
};

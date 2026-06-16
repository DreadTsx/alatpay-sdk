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

export type CreatePaymentLinkPayload = {
  email: string;
  redirectUrl: string;
  amount: number;
  currency: Currency;
};

export type GetTransactionsQuery = {
  page: number;
  businessId: string;
  limit?: number;
  merchantId?: string;
  paymentMethod?: string;
  status?: string;
  amount?: number;
  startAt?: string;
  endAt?: string;
};

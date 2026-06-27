import type { Currency, PaymentChannel, StaticWalletType } from "../enums.ts";

export type Customer = {
  email: string;
  phone?: string;
  firstName: string;
  lastName: string;
  metadata?: string;
};

export type PayViaVirtualAccountPayload = {
  businessId?: string;
  amount: number;
  currency?: Currency;
  orderId: string;
  description?: string;
  customer: Customer;
};

export type CreatePaymentLinkPayload = {
  email: string;
  redirectUrl?: string;
  amount: number;
  currency?: Currency;
};

export type GetTransactionsQuery = {
  page: number;
  businessId?: string;
  limit?: number;
  merchantId?: string;
  paymentMethod?: string;
  status?: string;
  amount?: number;
  startAt?: string;
  endAt?: string;
};

export type GetSettlementsQuery = {
  businessId?: string;
  merchantId?: string;
  status?: string;
  startAt?: string;
  endAt?: string;
};

export type InitCreateStaticWalletPayload = {
  businessId?: string;
  staticWalletType: StaticWalletType;
  bvn: string;
  email?: string;
};

export type InitPayViaUSSDPayload = {
  amount: number;
  currency: Currency;
  customer: Customer;
  phonenumber: string;
  businessId?: string;
};

export type FinalizePayViaUSSDPayload = {
  phonenumber: string;
  amount: number;
  businessId?: string;
  currency: Currency;
  transactionId: string;
};

export type InitPayViaBankDetailsPayload = {
  businessId?: string;
  businessName: string;
  amount: number;
  currency: Currency;
  orderId: string;
  description: string;
  channel: PaymentChannel;
  customer: Customer;
  accountNumber: string;
  bankCode?: string;
};

export type FinalizePayViaBankDetailsPayload = {
  otp: string;
  transactionId: string;
};

export type FinalizeCreateStaticWalletPayload = {
  staticWalletId: string;
  businessId: string;
  otp: string;
  trackingId: string;
};

export type GetStaticWalletsQuery = {
  page: number;
  limit: number;
  status?: string;
  businessId?: string;
};

export type GetStaticWalletCollectionHistoryQuery = {
  page: number;
  limit: number;
  status?: number;
  businessId?: string;
  pageSize?: number;
};

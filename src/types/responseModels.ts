import type { Currency } from "../enums.ts";
import type { Customer } from "./global.ts";

export type APISuccessResponse<T> = {
  status: true;
  message: string;
  data: T;
};

export type APIErrorResponse = {
  status: false;
  message: string;
  data: null;
};

export type PaginatedAPIResponse = {};

export type VirtualAccount = {
  readonly status: string;
  readonly businessId: string;
  readonly amount: number;
  readonly currency: Currency;
  readonly orderId: string;
  readonly description: string;
  readonly customer: Customer;
  readonly id: string;
  readonly merchantId: string;
  readonly virtualBankCode: string;
  readonly virtualBankAccountNumber: string;
  readonly businessBankAccountNumber: string;
  readonly businessBankCode: string;
  readonly transactionId: string;
  readonly expiredAt: string;
  readonly settlementType: string | null;
  readonly createdAt: string;
readonly subBusinessCode: string | null;
  readonly  expectedFee:number | null;
   readonly passCharge: boolean;
};

export type APIResponse<T> = {
  status: boolean;
  message: string;
  data: T;
};

export type PaginatedAPIResponse = {};

export type VirtualAccount = {
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
  readonly settlementType: "manual";
  readonly createdAt: string;
};

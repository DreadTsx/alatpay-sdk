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

export type APIValidationErrorResponse = {
  type: string;
  title: string;
  status: number;
  traceId: string;
  errors: Record<string, string[]>;
};

export type PaginatedData<T> = {
  items: T;
  currentPage: number;
  totalItems: number;
  totalPages: number;
  pathUrl: string;
  previousPageUrl: string | null;
  nextPageUrl: string | null;
};

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
  readonly expectedFee: number | null;
  readonly passCharge: boolean;
};

export type PaymentLink = {
  readonly id: string;
  readonly paymentUrl: string;
  readonly paymentReference: string;
  readonly redirectUrl: string;
};

export type PaymentLinkTransaction = {
  readonly id: string;
  readonly businessId: string;
  readonly primaryApiKey: string;
  readonly updatedAt: string;
  readonly createdAt: string;
  readonly link: string;
  readonly description: string;
  readonly amount: number;
  readonly paymentLinkReference: string;
  readonly isActive: boolean;
  readonly status: string;
  readonly transactions: {
    readonly amount: number;
    readonly orderId: string;
    readonly description: string;
    readonly paymentMethodId: string;
    readonly sessionId: string | null;
    readonly merchantName: string | null;
    readonly settlementId: string;
    readonly customer: {
      readonly id: string;
      readonly transactionId: string;
      readonly createdAt: string;
      readonly email: string;
      readonly phone: string;
      readonly firstName: string;
      readonly lastName: string;
      readonly metadata: string;
    };
    readonly id: string;
    readonly merchantId: string;
    readonly businessId: string;
    readonly channel: string;
    readonly callbackUrl: string;
    readonly feeAmount: number;
    readonly businessName: string;
    readonly businessBankAccountNumber: string | null;
    readonly businessBankCode: string | null;
    readonly currency: Currency;
    readonly status: string;
    readonly statusReason: string | null;
    readonly settlementType: string;
    readonly createdAt: string;
    readonly updatedAt: string;
    readonly settledAt: string;
  };
  readonly currency: Currency;
  readonly splitCode: string | null;
  readonly redirectUrl: string;
};

export type Transaction = {
  amount: number;
  description: string;
  paymentMethodId: number;
  sessionId: string;
  merchantName: string | null;
  settlementId: string;
  customer: {
    id: string;
    transactionId: string;
    createdAt: string;
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    metadata: string;
  };
  isEPosTransaction: boolean;
  userId: string | null;
  ePosTransactionReference: string | null;
  cardScheme: string | null;
  ePosTransactionStan: string | null;
  eposTransactionRrn: string | null;
  terminalId: string | null;
  cardPan: string | null;
  cardExpiryDate: string | null;
  cardHolderName: string | null;
  applicationPanSequenceNumber: string | null;
  isStaticWallet: boolean;
  subBusinessCode: string | null;
  subBusiness: string | null;
  isCallbackValidated: boolean;
  splitCode: string | null;
  feeBearer: number;
  id: string;
  merchantId: string;
  businessId: string;
  channel: string;
  callbackUrl: string | null;
  feeAmount: number;
  businessName: string;
  currency: Currency;
  status: string;
  statusReason: string | null;
  settlementType: string;
  createdAt: string;
  updatedAt: string;
  settledAt: string;
  orderId: string;
  ngnVirtualBankAccountNumber: string | null;
  ngnVirtualBankCode: string | null;
  usdVirtualAccountNumber: string | null;
  usdVirtualBankCode: string | null;
};

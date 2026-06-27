export const PaymentChannel = {
  ALL: "*",
  CARD: "1",
  BANK_TRANSFER: "2",
  BANK_DETAILS: "3",
  USSD: "5",
  STATIC_ACCOUNT: "8",
} as const;

export type PaymentChannel = (typeof PaymentChannel)[keyof typeof PaymentChannel];

export const Currency = {
  NGN: "NGN",
} as const;

export const StaticWalletType = {
  INDIVIDUAL: "1",
  COLLECTION: "2",
};

export type StaticWalletType = (typeof StaticWalletType)[keyof typeof StaticWalletType];

export type Currency = (typeof Currency)[keyof typeof Currency];

export const HTTPMethod = {
  GET: "GET",
  POST: "POST",
  PATCH: "PATCH",
  PUT: "PUT",
  DELETE: "DELETE",
} as const;

export type HTTPMethod = (typeof HTTPMethod)[keyof typeof HTTPMethod];

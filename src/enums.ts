export const PaymentChannel = {
  ALL: "*",
  CARD: "1",
  BANK_TRASFER: "2",
  BANK_DETAILS: "3",
  USSD: "5",
  STATIC_ACCOUNT: "8",
} as const;

export type PaymentChannel = (typeof PaymentChannel)[keyof typeof PaymentChannel];

export const HTTPMethod = {
  GET: "GET",
  POST: "POST",
  PATCH: "PATCH",
  PUT: "PUT",
  DELETE: "DELETE",
} as const;

export type HTTPMethod = (typeof HTTPMethod)[keyof typeof HTTPMethod];

import RESTClient from "./restClient.ts";
import type {
  CreatePaymentLinkPayload,
  GenerateVirtualAccountPayload,
  GetTransactionsQuery,
} from "./types/global.ts";
import type {
  APIErrorResponse,
  APISuccessResponse,
  PaymentLink,
  PaymentLinkTransaction,
  VirtualAccount,
} from "./types/responseModels.ts";
import { HTTPMethod } from "./enums.ts";
import { ClientError } from "./errors.ts";

export default class ALATPayClient {
  client: RESTClient;

  constructor(
    secretKey?: string,
    businessId?: string,
    webhookSecretKey?: string,
    publicKey?: string,
  ) {
    this.client = new RESTClient(
      secretKey,
      businessId,
      webhookSecretKey,
      publicKey,
    );
  }

  generateVirtualAccount(
    payload: GenerateVirtualAccountPayload,
  ): Promise<APISuccessResponse<VirtualAccount> | APIErrorResponse> {
    const _payload = structuredClone(payload);
    if (!_payload.businessId && this.client.businessId == "") {
      throw new ClientError(
        "businessId not provided in payload, set in environmental variables or provided on client instantiation",
      );
    }
    if (!_payload.businessId) _payload.businessId = this.client.businessId;
    return this.client.call(
      "/bank-transfer/api/v1/bankTransfer/virtualAccount",
      HTTPMethod.POST,
      _payload,
    );
  }

  initPayViaUSSD() {}

  finalizePayViaUSSD() {}

  initPayViaBankDetails() {}

  finalizePayViaBankDetails() {}

  initCreateStaticWallet() {}

  finalizeCreateStaticWallet() {}

  getStaticWallet() {}

  getStaticWallets() {}

  getStaticWalletCollectionHistory() {}

  getTransaction() {}

  getTransactions(
    query: GetTransactionsQuery,
  ): Promise<APISuccessResponse<PaymentLink> | APIErrorResponse> {
    const endpoint = this.client.addQueryParams(
      "/alatpaytransaction/api/v1/transactions",
      query,
    );
    return this.client.call(
      endpoint,
      HTTPMethod.GET,
    );
  }

  getSettlements() {}

  createPaymentLink(
    payload: CreatePaymentLinkPayload,
  ): Promise<APISuccessResponse<PaymentLink> | APIErrorResponse> {
    return this.client.call(
      "/merchant-onboarding/api/v1/payment/initialize",
      HTTPMethod.POST,
      payload,
    );
  }

  getTransactionViaPaymentLink(
    paymentReference: string,
  ): Promise<APISuccessResponse<PaymentLinkTransaction> | APIErrorResponse> {
    return this.client.call(
      `/merchant-onboarding/api/v1/payment/status/${paymentReference}`,
      HTTPMethod.GET,
    );
  }
}

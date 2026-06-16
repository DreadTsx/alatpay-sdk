import RESTClient from "./restClient.ts";
import type { GenerateVirtualAccountPayload } from "./types/global.ts";
import type {
  APIErrorResponse,
  APISuccessResponse,
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

  async initPayViaUSSD() {}

  async finalizePayViaUSSD() {}

  async initPayViaBankDetails() {}

  async finalizePayViaBankDetails() {}

  async initCreateStaticWallet() {}

  async finalizeCreateStaticWallet() {}

  async getStaticWallet() {}

  async getStaticWallets() {}

  async getStaticWalletCollectionHistory() {}

  async getTransaction() {}

  async getTransactions() {}

  async getSettlements() {}

  async createPaymentLink() {}

  async getTransactionViaPaymentLink() {}
}

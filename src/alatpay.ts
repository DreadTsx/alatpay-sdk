import RESTClient from "./restClient.ts";
import type { GenerateVirtualAccountPayload } from "./types/global.ts";

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

  async generateVirtualAccount(
    payload: GenerateVirtualAccountPayload,
  ): Promise<APIResponse<VirtualAccount>> {
    return this.client.call(
      "/bank-transfer/api/v1/bankTransfer/virtualAccount",
      HTTPMethod.POST,
      payload,
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

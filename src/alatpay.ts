import RestClient from "./restClient.ts";

export default class ALATPayClient {
  private client: RestClient;

  constructor() {}

  async generateVirtualAccount() {}

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

import RESTClient from "./restClient.ts";
import type {
  CreatePaymentLinkPayload,
  PayViaVirtualAccountPayload,
  GetTransactionsQuery,
  GetSettlementsQuery,
  InitCreateStaticWalletPayload,
  InitPayViaUSSDPayload,
  FinalizePayViaUSSDPayload,
  InitPayViaBankDetailsPayload,
  FinalizePayViaBankDetailsPayload,
  FinalizeCreateStaticWalletPayload,
  GetStaticWalletsQuery,
  GetStaticWalletCollectionHistoryQuery,
} from "./types/global.ts";
import type {
  APIErrorResponse,
  APISuccessResponse,
  PaymentLink,
  PaymentLinkTransaction,
  Transaction,
  VirtualAccount,
  PaginatedData,
} from "./types/responseModels.ts";
import { HTTPMethod } from "./enums.ts";
import { ClientError } from "./errors.ts";

const MISSING_BUSINESS_ID_ERROR = new ClientError(
  "businessId not provided in payload, set in environmental variables or provided on client instantiation",
);

/**
 * A class for interfacing with ALATPay API in your JS/TS project.
 */
export default class ALATPayClient {
  restClient: RESTClient;

  /**
   * @constructor Instantiate an ALATPayClient.
   *
   * @remarks When no params are passed in, the client will attempt to load the
   * secretKey, businessId, webhookSecretKey, publicKey via their respective default
   * environmental variable name.  'ALATPAY_PUBLIC_KEY','ALATPAY_BUSINESS_ID',
   * 'ALATPAY_SECRET_KEY' and 'ALATPAY_ENCRYPTION_KEY', If these credentials are
   * passed in to the constructor, they take precedence over the values set in the environmental
   * variables. Only secretKey is most important, businessId, if not provided
   * on instantiation, may be supplied to the method params that request it
   *
   * @param secretKey - Your ALATPay integration public key. Omit if
   * 'ALATPay_SECRET_KEY' is set in your environmental variables.
   * @param businessId - Your ALATPay integration business ID. Omit if
   * 'ALATPAY_BUSINESS_ID' is set in your environmental variables or your
   * want to defer to when it's used
   * @param webhookSecretKey - Your ALATPay integration webhook secret key. Omit if
   * 'ALATPAY_WEBHOOK_SECRET_KEY' is set in your environmental variables or your
   * want to defer to when it's used
   * @param publicKey - Your ALATPay integration public key. Omit if
   * 'ALATPAY_PUBLIC_KEY' is set in your environmental variables  or your
   * want to defer to when it's used
   */
  constructor(
    secretKey?: string,
    businessId?: string,
    webhookSecretKey?: string,
    publicKey?: string,
  ) {
    this.restClient = new RESTClient(secretKey, businessId, webhookSecretKey, publicKey);
  }

  /**
   * Receive payments via a virtual account. Customers can thus make payments using either an intra-bank or interbank transfers.
   *
   * @param payload - {@link PayViaVirtualAccountPayload} is the data sent to ALATPay.
   *
   * @returns A promise containing {@link APISuccessResponse<VirtualAccount>} or {@link APIErrorResponse}
   */
  payViaVirtualAccount(
    payload: PayViaVirtualAccountPayload,
  ): Promise<APISuccessResponse<VirtualAccount> | APIErrorResponse> {
    const _payload = this.ensureBusinessId(payload);
    return this.restClient.call(
      "/bank-transfer/api/v1/bankTransfer/virtualAccount",
      HTTPMethod.POST,
      _payload,
    );
  }

  /**
   *  Initiate a debit request for your customer via phone USSD.
   *
   * @param payload - {@link InitPayViaUSSDPayload} is the data sent to ALATPay.
   *
   * @returns A promise containing `unknown` or {@link APIErrorResponse}
   */
  initPayViaUSSD(payload: InitPayViaUSSDPayload): Promise<unknown | APIErrorResponse> {
    const _payload = this.ensureBusinessId(payload);
    return this.restClient.call(
      "/alatpay-phone-number/api/v1/phone-number-payment/initialize",
      HTTPMethod.POST,
      _payload,
    );
  }

  /**
   *  Finalize a debit request for your customer via phone USSD.
   *
   * @param payload - {@link FinalizePayViaUSSDPayload} is the data sent to ALATPay.
   *
   * @returns A promise containing `unknown` or {@link APIErrorResponse}
   */
  finalizePayViaUSSD(payload: FinalizePayViaUSSDPayload): Promise<unknown | APIErrorResponse> {
    const _payload = this.ensureBusinessId(payload);
    return this.restClient.call(
      "/alatpay-phone-number/api/v1/phone-number-payment/complete-phonenumber-payment",
      HTTPMethod.POST,
      _payload,
    );
  }

  /**
   *  Initiate a debit request for your customer via bank details.
   *
   *  @remarks This is applicable when your customers need to make payments using their
   *  Wema Bank account numbers. Upon approval, a direct debit request would be made to
   *  the customer's account.
   *
   * @param payload - {@link InitPayViaBankDetailsPayload} is the data sent to ALATPay.
   *
   * @returns A promise containing `unknown` or {@link APIErrorResponse}
   */
  initPayViaBankDetails(
    payload: InitPayViaBankDetailsPayload,
  ): Promise<unknown | APIErrorResponse> {
    const _payload = this.ensureBusinessId<InitPayViaBankDetailsPayload>(payload);
    if (!_payload.bankCode) _payload.bankCode = "035";
    return this.restClient.call(
      "/alatpayaccountnumber/api/v1/accountNumber/sendOtp",
      HTTPMethod.POST,
      _payload,
    );
  }

  /**
   *  Finalize a debit request for your customer via bank details.
   *
   *  @remarks This is applicable when your customers need to make payments using their
   *  Wema Bank account numbers. Upon approval, a direct debit request would be made to
   *  the customer's account.
   *
   * @param payload - {@link FinalizePayViaBankDetailsPayload} is the data sent to ALATPay.
   *
   * @returns A promise containing `unknown` or {@link APIErrorResponse}
   */
  finalizePayViaBankDetails(
    payload: FinalizePayViaBankDetailsPayload,
  ): Promise<unknown | APIErrorResponse> {
    return this.restClient.call(
      "/alatpayaccountnumber/api/v1/accountNumber/validateAndPay",
      HTTPMethod.POST,
      payload,
    );
  }

  /**
   *  Initialize the creation of the a static wallet
   *
   * @param payload - {@link InitCreateStaticWalletPayload} is the data sent to ALATPay.
   *
   * @returns A promise containing `unknown` or {@link APIErrorResponse}
   */
  initCreateStaticWallet(
    payload: InitCreateStaticWalletPayload,
  ): Promise<unknown | APIErrorResponse> {
    const _payload = this.ensureBusinessId(payload);
    return this.restClient.call("/alatpay-wallet/api/v1/staticaccount", HTTPMethod.POST, _payload);
  }

  /**
   *  Finalize the creation of the a static wallet
   *
   * @param payload - {@link FinalizeCreateStaticWalletPayload} is the data sent to ALATPay.
   *
   * @returns A promise containing `unknown` or {@link APIErrorResponse}
   */
  finalizeCreateStaticWallet(
    payload: FinalizeCreateStaticWalletPayload,
  ): Promise<unknown | APIErrorResponse> {
    return this.restClient.call(
      "/alatpay-wallet/api/v1/staticaccount/validateAndCreate",
      HTTPMethod.POST,
      payload,
    );
  }

  /**
   *  Retrieve a static wallet by it's walletId
   *
   * @param walletId - The id of the static wallet you want to retrieve.
   *
   * @returns A promise containing `unknown` or {@link APIErrorResponse}
   */
  getStaticWallet(walletId: string): Promise<unknown | APIErrorResponse> {
    return this.restClient.call(
      `/alatpay-wallet/api/v1/staticaccount/staticAccountId?StaticAccountId=${walletId}`,
      HTTPMethod.GET,
    );
  }

  /**
   *  Retrieve static wallets in your account
   *
   * @param query - {@link GetStaticWalletsQuery} let's you filter the returned static wallets.
   *
   * @returns A promise containing `unknown` or {@link APIErrorResponse}
   */
  getStaticWallets(query: GetStaticWalletsQuery): Promise<unknown | APIErrorResponse> {
    const _query = this.ensureBusinessId(query);
    const endpoint = this.restClient.addQueryParams("/alatpay-wallet/api/v1/staticaccount", _query);
    return this.restClient.call(endpoint, HTTPMethod.GET);
  }

  /**
   *  Retrieve a list of all transaction records for a particular Static Wallet.
   *
   * @param query - {@link GetStaticWalletCollectionHistoryQuery} let's you filter the returned transactions.
   *
   * @returns A promise containing `unknown` or {@link APIErrorResponse}
   */
  getStaticWalletCollectionHistory(
    query: GetStaticWalletCollectionHistoryQuery,
  ): Promise<unknown | APIErrorResponse> {
    const _query = this.ensureBusinessId(query);
    const endpoint = this.restClient.addQueryParams(
      "https://apibox.alatpay.ng/alatpay-wallet/api/v1/staticaccount/collectionhistory",
      _query,
    );
    return this.restClient.call(endpoint, HTTPMethod.GET);
  }

  /**
   *  Retrieve a transction
   *
   * @param transactionId - The id of the transaction you want to retrieve.
   *
   * @returns A promise containing {@link APISuccessResponse<Transaction>} or {@link APIErrorResponse}
   */
  getTransaction(
    transactionId: string,
  ): Promise<APISuccessResponse<Transaction> | APIErrorResponse> {
    return this.restClient.call(
      `/alatpaytransaction/api/v1/transactions/${transactionId}`,
      HTTPMethod.GET,
    );
  }

  /**
   *  Retrieve a list of all transaction records.
   *
   * @param query - {@link GetTransactionsQuery} let's you filter the returned transactions.
   *
   * @returns A promise containing {@link APISuccessResponse<PaginatedData<Transaction[]>>} or {@link APIErrorResponse}
   */
  getTransactions(
    query: GetTransactionsQuery,
  ): Promise<APISuccessResponse<PaginatedData<Transaction[]>> | APIErrorResponse> {
    const _query = this.ensureBusinessId(query);
    const endpoint = this.restClient.addQueryParams(
      "/alatpaytransaction/api/v1/transactions",
      _query,
      true,
    );
    return this.restClient.call(endpoint, HTTPMethod.GET);
  }

  /**
   *  Retrieve settlements on your integration.
   *
   * @param query - {@link GetSettlementsQuery} let's you filter the returned settlements.
   *
   * @returns A promise containing {@link APISuccessResponse<PaginatedData<Transaction[]>>} or {@link APIErrorResponse}
   */
  getSettlements(query?: GetSettlementsQuery): Promise<unknown | APIErrorResponse> {
    let endpoint = "/payment-settlement/api/v1/settlements";
    if (query) {
      const _query = this.ensureBusinessId(query);
      endpoint = this.restClient.addQueryParams("/payment-settlement/api/v1/settlements", _query);
    }
    return this.restClient.call(endpoint, HTTPMethod.GET);
  }

  /**
   *  Create a payment link
   *
   * @param payload - {@link CreatePaymentLinkPayload} is the data sent to ALATPay.
   *
   * @returns A promise containing `unknown` or {@link APIErrorResponse}
   */
  createPaymentLink(
    payload: CreatePaymentLinkPayload,
  ): Promise<APISuccessResponse<PaymentLink> | APIErrorResponse> {
    return this.restClient.call(
      "/merchant-onboarding/api/v1/payment/initialize",
      HTTPMethod.POST,
      payload,
    );
  }

  /**
   *  Retrieve a transction made via a payment link
   *
   * @param paymentReference - The id of the transaction you want to retrieve.
   *
   * @returns A promise containing {@link APISuccessResponse<PaymentLinkTransaction>} or {@link APIErrorResponse}
   */
  getTransactionViaPaymentLink(
    paymentReference: string,
  ): Promise<APISuccessResponse<PaymentLinkTransaction> | APIErrorResponse> {
    return this.restClient.call(
      `/merchant-onboarding/api/v1/payment/status/${paymentReference}`,
      HTTPMethod.GET,
    );
  }

  /**
   * Used to ensure the businessId is included in the payload data
   *
   * There are cases where a payload or query may define `businessId` as
   * optional, but it's required in the API call to be made, this method
   * attempts to inject the businessId if it's available in the client
   * or throw an error if it can find a `businessId` to set.
   *
   */
  ensureBusinessId<T extends { businessId?: string }>(data: T): T {
    const _data = structuredClone(data);
    if (!_data.businessId && this.restClient.businessId == "") {
      throw MISSING_BUSINESS_ID_ERROR;
    }
    if (!_data.businessId) _data.businessId = this.restClient.businessId;

    return _data;
  }
}

import { HTTPMethod } from "./enums.ts";
import { ClientError } from "./errors.ts";

type KeyDisplayNames =
  | "public key"
  | "secret key"
  | "business id"
  | "webhook secret key";

export default class RESTClient {
  static BASE_URL = "https://apibox.alatpay.ng";
  static ALATPAY_BUSINESS_ID_NAME = "ALATPAY_BUSINESS_ID";
  static ALATPAY_PUBLIC_KEY_NAME = "ALATPAY_PUBLIC_KEY";
  static ALATPAY_SECRET_KEY_NAME = "ALATPAY_SECRET_KEY";
  static ALATPAY_WEBHOOK_SECRET_KEY_NAME = "ALATPAY_WEBHOOK_SECRET_KEY";

  secretKey: string = "";
  businessId: string = "";
  webhookSecretKey: string = "";
  publicKey: string = "";

  constructor(
    secretKey?: string,
    businessId?: string,
    webhookSecretKey?: string,
    publicKey?: string,
  ) {
    this.loadKey(
      "secret key",
      RESTClient.ALATPAY_SECRET_KEY_NAME,
      secretKey,
    );
    this.loadKey(
      "business id",
      RESTClient.ALATPAY_BUSINESS_ID_NAME,
      businessId,
      true,
    );
    this.loadKey(
      "public key",
      RESTClient.ALATPAY_PUBLIC_KEY_NAME,
      publicKey,
      true,
    );
    this.loadKey(
      "webhook secret key",
      RESTClient.ALATPAY_WEBHOOK_SECRET_KEY_NAME,
      webhookSecretKey,
      false,
    );
  }

  async call(
    endpoint: string,
    method: HTTPMethod,
    data?: any,
  ) {
    const request = new Request(`${RESTClient.BASE_URL}${endpoint}`, {
      method,
      headers: this.secureHeaders,
      body: JSON.stringify(data),
    });
    const response = await fetch(request);
    return response.json();
  }

  private get baseHeaders() {
    return {
      "User-Agent": "@gray-adeyi/alatpay-sdk 0.0.0",
      Accept: "application/json",
      "Content-Type": "application/json",
    };
  }

  private get secureHeaders() {
    return {
      ...this.baseHeaders,
      "Ocp-Apim-Subscription-Key": this.secretKey,
    };
  }

  private loadKey(
    keyName: KeyDisplayNames,
    keyEnvName: string,
    value?: string,
    deferRequirement: boolean = false,
  ) {
    // TODO: Make use of a single switch statement
    if (value) {
      switch (keyName) {
        case "public key":
          this.publicKey = value;
          break;
        case "secret key":
          this.secretKey = value;
          break;
        case "business id":
          this.businessId = value;
          break;
        case "webhook secret key":
          this.webhookSecretKey = value;
      }
      return;
    }
    if (!Deno.env.has(keyEnvName) && !deferRequirement) {
      throw new ClientError(
        `${keyName} was not provided on instantiation or set in environmental variables as ${keyEnvName}`,
      );
    }
    if (!Deno.env.has(keyEnvName) && deferRequirement) return;
    const envValue = Deno.env.get(keyEnvName) as string;
    switch (keyName) {
      case "public key":
        this.publicKey = envValue;
        break;
      case "secret key":
        this.secretKey = envValue;
        break;
      case "business id":
        this.businessId = envValue;
        break;
      case "webhook secret key":
        this.webhookSecretKey = envValue;
    }
  }
}

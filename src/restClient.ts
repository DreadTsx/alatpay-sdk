import type { HTTPMethod } from "./enums.ts";
import { ClientError } from "./errors.ts";

type KeyDisplayNames = "public key" | "secret key" | "business id" | "webhook secret key";

const BEARER_TOKEN_ISSUE_ERROR_MSG = `The client method you called requires a Bearer token 
for authentication which is different from the "Ocp-Apim-Subscription-Key" that the client 
currently supports, please contact ALATPay on how to resolve this.
The resolve might require extending the client.
Please create an issue on how to resolves this so the SDK supports it in the next release`;

const NETWORK_ERROR_MSG = `No network connection or unable to reach server, please check your internet connection`;

export default class RESTClient {
  static BASE_URL = "https://apibox.alatpay.ng";
  static ALATPAY_BUSINESS_ID_ENV_NAME = "ALATPAY_BUSINESS_ID";
  static ALATPAY_PUBLIC_KEY_ENV_NAME = "ALATPAY_PUBLIC_KEY";
  static ALATPAY_SECRET_KEY_ENV_NAME = "ALATPAY_SECRET_KEY";
  static ALATPAY_WEBHOOK_SECRET_KEY_ENV_NAME = "ALATPAY_WEBHOOK_SECRET_KEY";

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
    this.loadKey("secret key", RESTClient.ALATPAY_SECRET_KEY_ENV_NAME, secretKey);
    this.loadKey("business id", RESTClient.ALATPAY_BUSINESS_ID_ENV_NAME, businessId, true);
    this.loadKey("public key", RESTClient.ALATPAY_PUBLIC_KEY_ENV_NAME, publicKey, true);
    this.loadKey(
      "webhook secret key",
      RESTClient.ALATPAY_WEBHOOK_SECRET_KEY_ENV_NAME,
      webhookSecretKey,
      false,
    );
  }

  async call<T>(endpoint: string, method: HTTPMethod, data?: Record<string, unknown>): Promise<T> {
    const request = new Request(`${RESTClient.BASE_URL}${endpoint}`, {
      method,
      headers: this.secureHeaders,
      body: JSON.stringify(data),
    });
    try {
      const response = await fetch(request);
      if (response.status === 401) {
        const authenticationMode = response.headers.get("www-authenticate");
        if (authenticationMode === "Bearer") throw new ClientError(BEARER_TOKEN_ISSUE_ERROR_MSG);
      }
      return response.json();
    } catch (err) {
      if (err instanceof TypeError) {
        throw new ClientError(NETWORK_ERROR_MSG);
      } else throw err;
    }
  }

  addQueryParams(
    endpoint: string,
    queryParams?: Record<string, unknown>,
    convertCase: boolean = false,
  ): string {
    if (!queryParams) return endpoint;
    const url = new URL(endpoint, "https://_");
    let transformedQueryParams = queryParams;
    if (convertCase) transformedQueryParams = this.camelToPascalKeys(queryParams);
    Object.entries(transformedQueryParams).forEach(([key, value]) => {
      url.searchParams.append(key, `${value}`);
    });
    return url.pathname + url.search;
  }

  private camelToPascalKeys(obj: Record<string, unknown>) {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        key.charAt(0).toUpperCase() + key.slice(1),
        value,
      ]),
    );
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

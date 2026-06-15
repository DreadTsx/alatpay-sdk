import { HTTPMethod } from "./enums.ts";

export default class RestClient {
  static BASE_URL = "";

  async call(endpoint: string, method: HTTPMethod, data?: any, noAuth: boolean = false) {
    const request = new Request(`${RestClient.BASE_URL}${endpoint}`, {
      method,
      headers: this.secureHeaders,
      body: JSON.stringify(data),
    });
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
      "Ocp-Apim-Subscription-Key": "",
    };
  }
}

import { beforeAll, describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert";
import { load } from "@std/dotenv";
import ALATPayClient from "../src/alatpay.ts";
import { Currency } from "../src/enums.ts";

describe("ALATPayClient", () => {
  let client: ALATPayClient;

  beforeAll(async () => {
    await load({ envPath: ".env", export: true });
    client = new ALATPayClient();
  });

  it.skip("generateVirtualAccount", async () => {
    const payload = {
      amount: 100,
      currency: Currency.NGN,
      orderId: crypto.randomUUID(),
      description: "test payin",
      customer: {
        email: "adeyigbenga005@gmail.com",
        phone: "08033221129",
        firstName: "Gbenga",
        lastName: "Adeyi",
        metadata: "",
      },
    };
    const response = await client.generateVirtualAccount(payload);
    console.log(response);
  });

  it.skip("initPayViaUSSD", () => {});
});

import { beforeAll, describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert";
import { load } from "@std/dotenv";
import ALATPayClient from "../src/alatpay.ts";
import { Currency, PaymentChannel, StaticWalletType } from "../src/enums.ts";

describe("ALATPayClient", () => {
  let client: ALATPayClient;

  beforeAll(async () => {
    await load({ envPath: ".env", export: true });
    client = new ALATPayClient();
  });
  // TODO: It's quite hard to harden live tests, because it's dependent on the
  // integration, need to find a better resolve, that does not invole mocking

  it.skip("payViaVirtualAccount", async () => {
    const payload = {
      amount: 100,
      orderId: crypto.randomUUID(),
      description: "test payin",
      customer: {
        email: "johndoe@example.com",
        phone: "08012345678",
        firstName: "John",
        lastName: "Doe",
      },
    };
    const response = await client.payViaVirtualAccount(payload);
    console.log(response);
  });

  it.skip("initPayViaUSSD", async () => {
    const payload = {
      amount: 250,
      currency: Currency.NGN,
      phonenumber: "08012345678",
      customer: {
        email: "johndoe@example.com",
        phone: "08012345679",
        firstName: "John",
        lastName: "Doe",
      },
    };
    const response = await client.initPayViaUSSD(payload);
    console.log(response);
  });

  it.skip("finalizePayViaUSSD", async () => {
    const payload = {
      phonenumber: "08134529895",
      amount: 100,
      currency: Currency.NGN,
      transactionId: "eb98a8fa-71d1-4582-b398-ccac8f84e9ca",
    };
    const response = await client.finalizePayViaUSSD(payload);
    console.log(response);
  });

  it.skip("initPayViaBankDetails", async () => {
    const payload = {
      businessName: "Byte Vibez",
      amount: 2500,
      currency: Currency.NGN,
      orderId: "eb98a8fa-71d1-4582-b398-ccac8f84e9cb",
      description: "a test description",
      channel: PaymentChannel.ALL,
      customer: {
        email: "johndoe@example.com",
        phone: "08012345678",
        firstName: "John",
        lastName: "Doe",
      },
      accountNumber: "5273681014",
    };
    const response = await client.initPayViaBankDetails(payload);
    console.log(response);
  });

  it.skip("finalizePayViaBankDetails", async () => {
    const payload = {
      otp: "543215",
      transactionId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    };
    const response = await client.finalizePayViaBankDetails(payload);
    console.log(response);
  });

  it.skip("initCreateStaticWallet", async () => {
    const payload = {
      staticWalletType: StaticWalletType.INDIVIDUAL,
      bvn: "12345637890",
    };
    const response = await client.initCreateStaticWallet(payload);
    console.log(response);
  });

  it.skip("finalizeCreateStaticWallet", async () => {
    const payload = {
      staticWalletId: "714f126-7100-4006-bd4d-b545rft24cbb",
      businessId: "8909d16f-e6bd-409f-7dce-08ddbd774ihj",
      otp: "332610",
      trackingId: "a93e1364-3c0a-4dad-b64a-c8afe975f85c",
    };
    const response = await client.finalizeCreateStaticWallet(payload);
    console.log(response);
  });

  it.skip("getSettlements", async () => {
    const response = await client.getSettlements();
    console.log(response);
  });

  it.skip("getStaticWallets", async () => {
    const query = { page: 1, limit: 25 };
    const response = await client.getStaticWallets(query);
    console.log(response);
  });

  it.skip("getStaticWalletCollectionHistory", async () => {
    const query = { page: 1, limit: 25 };
    const response = await client.getStaticWalletCollectionHistory(query);
    console.log(response);
  });

  it.skip("getTransaction", async () => {
    const response = await client.getTransaction("ba5ceeaa-27e6-4efe-9dfe-b510fb0e6b76");
    console.log(response);
  });

  it.skip("getTransactions", async () => {
    const query = { page: 1 };
    const response = await client.getTransactions(query);
    console.log(response);
  });

  it.skip("getSettlements", async () => {
    const response = await client.getSettlements();
    console.log(response);
  });

  it.skip("createPaymentLink", async () => {
    const payload = {
      email: "johndoe@example.com",
      amount: 100,
    };
    const response = await client.createPaymentLink(payload);
    console.log(response);
  });

  it.skip("getTransactionViaPaymentLink", async () => {
    const response = await client.getTransactionViaPaymentLink(
      "a93e1364-3c0a-4dad-b64a-c8afe975f85c",
    );
    console.log(response);
  });
});

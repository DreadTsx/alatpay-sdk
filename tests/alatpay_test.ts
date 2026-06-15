import { beforeAll, describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert";
import { load } from "@std/dotenv";
import ALATPayClient from '../src/alatpay.ts'

describe("ALATPayClient", () => {
  let client: ALATPayClient;

beforeAll(async () => {
    await load({ envPath: ".env", export: true });
    client = new ALATPayClient();
  });

it("generateVirtualAccount", () => {
    const  payload = {}
    const response = client.generateVirtualAccount(payload)
  });

  it.skip("initPayViaUSSD", () => {});
})

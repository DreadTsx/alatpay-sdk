# ALATPay SDK (JavaScript/TypeScript)

A JavaScript/TypeScript client SDK for integrating with the ALATPay API.

## Features

- Full TypeScript support.
- Implements methods corresponding to ALATPay's public API.
- Supports automatic credential loading from environment variables.
- Exposes the underlying REST client, making it easy to extend the SDK when new endpoints become available.

## Installation

### npm

```bash
npm install @gray-adeyi/alatpay-sdk
```

### yarn

```bash
yarn add @gray-adeyi/alatpay-sdk
```

### pnpm

```bash
pnpm add @gray-adeyi/alatpay-sdk
```

### bun

```bash
bun add @gray-adeyi/alatpay-sdk
```

### Deno

```bash
deno add @gray-adeyi/alatpay-sdk
```

## Usage

```typescript
// You may provide your credentials through environment variables.
// The client automatically loads the following variables:
//
// ALATPAY_SECRET_KEY=""            // Required
// ALATPAY_BUSINESS_ID=""          // Optional. If omitted, methods that require
//                                 // a business ID will require one explicitly.
// ALATPAY_WEBHOOK_SECRET_KEY=""   // Optional
// ALATPAY_PUBLIC_KEY=""           // Optional
//
// Credentials passed to the client constructor take precedence over
// environment variables.

import { ALATPayClient } from "@gray-adeyi/alatpay-sdk";

// Instantiate the client.
// Credentials may be passed directly if they are not available
// in the environment.
const client = new ALATPayClient();

// Create a debit request via virtual account.
const payload = {
  amount: 100, // Amount is specified in major units (Naira).
  orderId: crypto.randomUUID(),
  description: "Test pay-in",
  customer: {
    email: "johndoe@example.com",
    phone: "08012345678",
    firstName: "John",
    lastName: "Doe",
  },
};

const response = await client.payViaVirtualAccount(payload);

console.log(response); // Use the response data in your application.
```

For TypeScript users, payload and return types are fully defined to provide autocomplete and help ensure correctness.

## Notes

There may occasionally be discrepancies between the SDK types and the actual API payloads or responses. Examples include:

- Misspelled field names.
- Missing fields.
- Incorrect field types.

In such cases, you may choose to send the correct payload or transform the response appropriately. TypeScript may report errors, but the request itself may still work correctly.

If you encounter such issues, please open an issue so they can be fixed.

## Extending the Client

One common problem with SDKs is that they can lag behind the APIs they wrap. Most of the time, this means:

- New endpoints have been introduced.
- Existing methods contain bugs or outdated typings.

To avoid blocking your work, the SDK exposes its underlying REST client, allowing you to extend or customize the client as needed.

---

## 1. Fixing Missing or Misspelled Fields

Suppose `PayViaVirtualAccountPayload` mistakenly defines `customer.firtName` instead of `customer.firstName`, and ALATPay introduces a new `expiresAt` field.

Although you could simply send the correct payload, TypeScript would complain. To maintain type safety, you can extend `ALATPayClient`.

```typescript
// Type defined by the SDK
export type PayViaVirtualAccountPayload = {
  amount: number;
  orderId: string;
  description: string;
  customer: {
    email: string;
    phone: string;
    firtName: string; // Typo (hypothetical)
    lastName: string;
    metadata: string;
  };
};

// Corrected type
type MyPayViaVirtualAccountPayload = {
  amount: number;
  orderId: string;
  description: string;
  expiresAt: string; // Newly added field
  businessId?: string;

  customer: {
    email: string;
    phone: string;
    firstName: string; // Typo fixed
    lastName: string;
    metadata: string;
  };
};

import { ALATPayClient, HTTPMethod } from "@gray-adeyi/alatpay-sdk";

class MyALATPayClient extends ALATPayClient {
  override payViaVirtualAccount(
    payload: MyPayViaVirtualAccountPayload
  ) {
    const _payload = this.ensureBusinessId(payload);

    return this.restClient.call(
      "/bank-transfer/api/v1/bankTransfer/virtualAccount",
      HTTPMethod.POST,
      _payload
    );
  }
}
```

You can now use your custom client while waiting for the SDK to be updated.
Create an issue when you encounter this.

---

## 2. Adding Support for New Endpoints

Suppose ALATPay introduces a new endpoint:

```text
/customers/api/v1/all
```

which returns the customers associated with your integration, but the SDK has not yet been updated.

You can add support yourself by extending the client.

```typescript
import { ALATPayClient, HTTPMethod } from "@gray-adeyi/alatpay-sdk";

type GetCustomersQuery = {
  page: number;
  businessId?: string;
  limit?: number;
};

class MyALATPayClient extends ALATPayClient {
  getCustomers(query: GetCustomersQuery) {
    // Inject the business ID if one has been configured.
    const _query = this.ensureBusinessId(query);

    // Add query parameters to the endpoint.
    // Example:
    // { page: 2, limit: 25 }
    // becomes:
    // /customers/api/v1/all?page=2&limit=25
    const endpoint = this.restClient.addQueryParams(
      "/customers/api/v1/all",
      _query
    );

    return this.restClient.call(
      endpoint,
      HTTPMethod.GET
    );
  }
}
```

This approach lets you continue using newly introduced endpoints without waiting for a new SDK release.

---

## Issues and Contributions

If you discover bugs, missing endpoints, incorrect typings, or any other issues, please open an issue or submit a pull request. Contributions are welcome.

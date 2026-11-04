// DisputeDesk - PayPal Sandbox Order Creation & Capture Script
// Verifies Orders v2 API in sandbox environment.

import { loadEnv, assertSandbox, formatSecretStatus } from './load-env.mjs';

loadEnv();

const apiBase = assertSandbox();
const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

console.log('--- DisputeDesk: PayPal Sandbox Order Creation Check ---');
console.log(`API Base: ${apiBase} (SANDBOX GUARD PASSED)`);
console.log(`PAYPAL_CLIENT_ID: ${formatSecretStatus(clientId)}`);
console.log(`PAYPAL_CLIENT_SECRET: ${formatSecretStatus(clientSecret)}`);

if (!clientId || !clientSecret || clientId.includes('your_') || clientSecret.includes('your_')) {
  console.log('\n[INFO] PayPal sandbox credentials are not configured.');
  console.log('Add PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET to .env.local to test sandbox orders.');
  console.log('Result: SKIPPED (No credentials configured)');
  process.exit(0);
}

async function getAccessToken() {
  const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const res = await fetch(`${apiBase}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${authHeader}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
    body: 'grant_type=client_credentials',
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to obtain access token: HTTP ${res.status} - ${err}`);
  }
  const data = await res.json();
  return data.access_token;
}

async function createOrder(token) {
  const orderUrl = `${apiBase}/v2/checkout/orders`;
  const referenceId = `ORDER-SPIKE-${Date.now()}`;
  const payload = {
    intent: 'CAPTURE',
    purchase_units: [
      {
        reference_id: referenceId,
        description: 'DisputeDesk Sandbox Spike Test Order',
        amount: {
          currency_code: 'USD',
          value: '49.99',
          breakdown: {
            item_total: {
              currency_code: 'USD',
              value: '49.99',
            },
          },
        },
        items: [
          {
            name: 'Wireless Ergonomic Keyboard',
            unit_amount: {
              currency_code: 'USD',
              value: '49.99',
            },
            quantity: '1',
            category: 'PHYSICAL_GOODS',
          },
        ],
        shipping: {
          name: {
            full_name: 'Jane Doe',
          },
          address: {
            address_line_1: '123 Tech Park Blvd',
            admin_area_2: 'San Jose',
            admin_area_1: 'CA',
            postal_code: '95131',
            country_code: 'US',
          },
        },
      },
    ],
    application_context: {
      return_url: 'https://example.com/return',
      cancel_url: 'https://example.com/cancel',
    },
  };

  console.log(`\nCreating sandbox order via POST ${orderUrl}...`);
  const startTime = Date.now();

  const res = await fetch(orderUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'PayPal-Request-Id': `req-${Date.now()}`,
    },
    body: JSON.stringify(payload),
  });

  const elapsed = Date.now() - startTime;
  const data = await res.json();

  if (!res.ok) {
    console.error(`\n[ERROR] Order creation failed with HTTP ${res.status} (${elapsed}ms):`);
    console.error(JSON.stringify(data, null, 2));
    process.exit(1);
  }

  console.log(`\n[SUCCESS] Order created in ${elapsed}ms!`);
  console.log(`Order ID: ${data.id}`);
  console.log(`Status: ${data.status}`);
  console.log(`Intent: ${data.intent}`);
  
  const approveLink = (data.links || []).find(l => l.rel === 'approve');
  if (approveLink) {
    console.log(`Buyer Approve URL: ${approveLink.href}`);
    console.log('\n[NOTE FOR SPIKE REPORT]');
    console.log('To complete the capture and potentially create a dispute on this transaction:');
    console.log('1. A test buyer logs into sandbox at the Approve URL above.');
    console.log('2. The order is approved.');
    console.log('3. Capture is called via POST /v2/checkout/orders/{id}/capture.');
    console.log('4. The buyer then logs into sandbox.paypal.com/disputes/ to file a claim.');
  }

  return data;
}

async function run() {
  try {
    const token = await getAccessToken();
    console.log('[OK] Access token obtained.');
    await createOrder(token);
  } catch (err) {
    console.error(`\n[FATAL] Error running order test: ${err.message}`);
    process.exit(1);
  }
}

run();


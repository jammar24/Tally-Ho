// DisputeDesk - PayPal Sandbox Disputes Listing Test Script
// Verifies reading disputes from GET /v1/customer/disputes in sandbox.

import { loadEnv, assertSandbox, formatSecretStatus } from './load-env.mjs';

loadEnv();

const apiBase = assertSandbox();
const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

console.log('--- DisputeDesk: PayPal Sandbox Disputes List Check ---');
console.log(`API Base: ${apiBase} (SANDBOX GUARD PASSED)`);
console.log(`PAYPAL_CLIENT_ID: ${formatSecretStatus(clientId)}`);
console.log(`PAYPAL_CLIENT_SECRET: ${formatSecretStatus(clientSecret)}`);

if (!clientId || !clientSecret || clientId.includes('your_') || clientSecret.includes('your_')) {
  console.log('\n[INFO] PayPal sandbox credentials are not configured.');
  console.log('Add PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET to .env.local to test against live sandbox.');
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

async function listDisputes() {
  try {
    const token = await getAccessToken();
    console.log('[OK] Access token obtained.');

    const disputesUrl = `${apiBase}/v1/customer/disputes`;
    console.log(`Fetching disputes from: ${disputesUrl}...`);
    const startTime = Date.now();

    const res = await fetch(disputesUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    const elapsed = Date.now() - startTime;
    const data = await res.json();

    if (!res.ok) {
      console.error(`\n[ERROR] Disputes API returned HTTP ${res.status} (${elapsed}ms):`);
      console.error(JSON.stringify(data, null, 2));
      if (res.status === 403 || res.status === 401) {
        console.error('\nTip: Verify that the "Customer Disputes" permission is checked in your Sandbox REST App settings.');
      }
      process.exit(1);
    }

    const items = data.items || [];
    console.log(`\n[SUCCESS] Disputes fetched in ${elapsed}ms.`);
    console.log(`Total disputes in sandbox account: ${items.length}`);

    if (items.length === 0) {
      console.log('\n[OBSERVATION]');
      console.log('Sandbox dispute inbox is currently EMPTY.');
      console.log('In PayPal sandbox, disputes are created when a test Personal (Buyer) account');
      console.log('logs into https://www.sandbox.paypal.com/disputes/ and files a dispute on an eligible transaction.');
      console.log('If no buyer disputes have been manually submitted, the sandbox API returns items: [].');
      console.log('This confirms why DisputeDesk Plan B (hybrid mode with realistic demo disputes) is essential.');
    } else {
      console.log('\nDisputes found:');
      items.forEach((d, idx) => {
        const amt = d.dispute_amount ? `${d.dispute_amount.value} ${d.dispute_amount.currency_code}` : 'N/A';
        console.log(`  [${idx + 1}] ID: ${d.dispute_id} | Status: ${d.status} | Reason: ${d.reason} | Amount: ${amt}`);
      });
    }
  } catch (err) {
    console.error(`\n[FATAL] Error listing disputes: ${err.message}`);
    process.exit(1);
  }
}

listDisputes();


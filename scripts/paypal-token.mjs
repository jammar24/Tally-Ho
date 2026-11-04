// DisputeDesk - PayPal Sandbox OAuth Token Test Script
// Verifies sandbox authentication and app credentials without exposing secrets.

import { loadEnv, assertSandbox, formatSecretStatus } from './load-env.mjs';

loadEnv();

const apiBase = assertSandbox();
const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

console.log('--- DisputeDesk: PayPal Sandbox OAuth Token Check ---');
console.log(`Environment: ${process.env.PAYPAL_ENV || 'sandbox'}`);
console.log(`API Base: ${apiBase} (SANDBOX GUARD PASSED)`);
console.log(`PAYPAL_CLIENT_ID: ${formatSecretStatus(clientId)}`);
console.log(`PAYPAL_CLIENT_SECRET: ${formatSecretStatus(clientSecret)}`);

if (!clientId || !clientSecret || clientId.includes('your_') || clientSecret.includes('your_')) {
  console.log('\n[INFO] PayPal sandbox credentials are not configured in .env.local.');
  console.log('To test live PayPal sandbox operations:');
  console.log('1. Visit https://developer.paypal.com/dashboard/applications/sandbox');
  console.log('2. Create or select a REST App with "Customer Disputes" enabled.');
  console.log('3. Copy Client ID and Secret to .env.local:');
  console.log('   PAYPAL_CLIENT_ID=...');
  console.log('   PAYPAL_CLIENT_SECRET=...\n');
  console.log('Result: SKIPPED (No credentials configured)');
  process.exit(0);
}

async function testOAuthToken() {
  const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const tokenUrl = `${apiBase}/v1/oauth2/token`;

  console.log(`\nRequesting OAuth token from: ${tokenUrl}...`);
  const startTime = Date.now();

  try {
    const res = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${authHeader}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      body: 'grant_type=client_credentials',
    });

    const elapsed = Date.now() - startTime;
    const data = await res.json();

    if (!res.ok) {
      console.error(`\n[ERROR] PayPal OAuth request failed with HTTP ${res.status} (${elapsed}ms):`);
      console.error(`Error: ${data.error || 'unknown'}`);
      console.error(`Description: ${data.error_description || JSON.stringify(data)}`);
      process.exit(1);
    }

    console.log(`\n[SUCCESS] OAuth 2.0 access token obtained in ${elapsed}ms!`);
    console.log(`Token Type: ${data.token_type}`);
    console.log(`App ID: ${data.app_id || 'N/A'}`);
    console.log(`Expires In: ${data.expires_in} seconds (~${Math.round(data.expires_in / 3600)} hours)`);
    console.log(`Token Length: ${data.access_token ? data.access_token.length : 0} characters`);
    console.log(`Scopes: ${data.scope ? data.scope.split(' ').length : 0} permissions granted`);
    if (data.scope) {
      const scopeList = data.scope.split(' ');
      const disputeScope = scopeList.some(s => s.includes('dispute'));
      console.log(`Disputes permission present in scopes: ${disputeScope ? 'YES' : 'NO (Check REST app settings)'}`);
    }
  } catch (err) {
    console.error(`\n[FATAL] Network error connecting to PayPal sandbox: ${err.message}`);
    process.exit(1);
  }
}

testOAuthToken();


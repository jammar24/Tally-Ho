// DisputeDesk safe environment loader
// Loads .env.local and .env without printing secrets or depending on external packages.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

/**
 * Parse an env file and return key-value pairs
 * @param {string} filePath
 * @returns {Record<string, string>}
 */
function parseEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return {};
  }
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split(/\r?\n/);
  const result = {};

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) {
      continue;
    }
    const key = trimmed.slice(0, eqIdx).trim();
    let val = trimmed.slice(eqIdx + 1).trim();

    // Strip inline comments if not inside quotes
    if (val.startsWith('"') && val.endsWith('"')) {
      val = val.slice(1, -1);
    } else if (val.startsWith("'") && val.endsWith("'")) {
      val = val.slice(1, -1);
    } else {
      const commentIdx = val.indexOf('#');
      if (commentIdx !== -1) {
        val = val.slice(0, commentIdx).trim();
      }
    }
    result[key] = val;
  }
  return result;
}

/**
 * Load environment variables into process.env
 * Priority: process.env (already set) > .env.local > .env
 */
export function loadEnv() {
  const envLocal = parseEnvFile(path.join(rootDir, '.env.local'));
  const envDefault = parseEnvFile(path.join(rootDir, '.env'));

  // Combine defaults: .env.local takes precedence over .env
  const combined = { ...envDefault, ...envLocal };

  for (const [k, v] of Object.entries(combined)) {
    if (!process.env[k]) {
      process.env[k] = v;
    }
  }

  return process.env;
}

/**
 * Hard Sandbox Guard
 * Throws immediately if PAYPAL_API_BASE does not contain "sandbox"
 * @param {string} [baseUrl]
 */
export function assertSandbox(baseUrl) {
  const url = baseUrl || process.env.PAYPAL_API_BASE || 'https://api-m.sandbox.paypal.com';
  if (!url.toLowerCase().includes('sandbox')) {
    console.error('\n=============================================================');
    console.error('FATAL SAFETY VIOLATION: Non-sandbox PayPal environment detected!');
    console.error(`PAYPAL_API_BASE is: "${url}"`);
    console.error('DisputeDesk is strictly SANDBOX ONLY and refuses to run.');
    console.error('=============================================================\n');
    process.exit(1);
  }
  return url;
}

/**
 * Safely format a secret status without printing the secret value.
 * @param {string | undefined} secret
 * @returns {string} "[SET: length N]" or "[MISSING]"
 */
export function formatSecretStatus(secret) {
  if (!secret || secret.trim() === '' || secret.includes('your_') || secret.includes('here')) {
    return '[MISSING / UNCONFIGURED]';
  }
  return `[SET (${secret.length} chars)]`;
}


import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { clientId, clientSecret } = body;

    if (!clientId || !clientSecret) {
      return NextResponse.json(
        { success: false, error: 'Debes proporcionar PayPal Client ID y Client Secret' },
        { status: 400 }
      );
    }

    const auth = Buffer.from(`${clientId.trim()}:${clientSecret.trim()}`).toString('base64');

    // Test OAuth token generation directly against PayPal Sandbox
    const res = await fetch('https://api-m.sandbox.paypal.com/v1/oauth2/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.warn(`[PayPal Connect] Sandbox OAuth failed: ${res.status} - ${errorText}`);
      return NextResponse.json(
        {
          success: false,
          error: 'Credenciales inválidas de PayPal Sandbox. Verifica que correspondan al entorno Sandbox (no Live).',
        },
        { status: 401 }
      );
    }

    const data = await res.json();

    // Update in-memory environment variables
    process.env.PAYPAL_CLIENT_ID = clientId.trim();
    process.env.PAYPAL_CLIENT_SECRET = clientSecret.trim();

    // Persist to .env.local safely
    try {
      const envPath = path.join(process.cwd(), '.env.local');
      if (fs.existsSync(envPath)) {
        let content = fs.readFileSync(envPath, 'utf-8');
        content = content.replace(/^PAYPAL_CLIENT_ID=.*$/m, `PAYPAL_CLIENT_ID=${clientId.trim()}`);
        content = content.replace(/^PAYPAL_CLIENT_SECRET=.*$/m, `PAYPAL_CLIENT_SECRET=${clientSecret.trim()}`);
        fs.writeFileSync(envPath, content, 'utf-8');
      }
    } catch (fsErr) {
      console.warn('[PayPal Connect] Could not write to .env.local:', fsErr);
    }

    return NextResponse.json({
      success: true,
      connected: true,
      expiresIn: data.expires_in,
      maskedClientId: `${clientId.trim().slice(0, 6)}...${clientId.trim().slice(-4)}`,
      message: '¡Conexión con PayPal Sandbox exitosa! Tu cuenta está conectada y activa.',
    });
  } catch (error: any) {
    console.error('[PayPal Connect] Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Error al conectar con PayPal Sandbox' },
      { status: 500 }
    );
  }
}

export async function GET() {
  const clientId = process.env.PAYPAL_CLIENT_ID || '';
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET || '';

  if (!clientId || !clientSecret) {
    return NextResponse.json({
      connected: false,
      maskedClientId: 'No configurado',
    });
  }

  try {
    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    const res = await fetch('https://api-m.sandbox.paypal.com/v1/oauth2/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    return NextResponse.json({
      connected: res.ok,
      maskedClientId: `${clientId.slice(0, 6)}...${clientId.slice(-4)}`,
    });
  } catch (err) {
    return NextResponse.json({
      connected: false,
      maskedClientId: `${clientId.slice(0, 6)}...${clientId.slice(-4)}`,
    });
  }
}


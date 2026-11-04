import { NextResponse } from 'next/server';
import { getPayPalAccessToken } from '@/lib/paypal';
import { env } from '@/lib/env';

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    const token = await getPayPalAccessToken();

    if (!token) {
      // Mock order if no active credentials in sandbox
      return NextResponse.json({
        id: `MOCK-ORD-${Date.now()}`,
        status: 'CREATED',
        mode: 'demo',
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: { currency_code: 'USD', value: '120.00' },
            description: 'Demo Merchant Store Order',
          },
        ],
        create_time: new Date().toISOString(),
      });
    }

    const res = await fetch(`${env.PAYPAL_API_BASE}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: { currency_code: 'USD', value: '120.00' },
            description: 'Sandbox Test Order',
          },
        ],
      }),
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


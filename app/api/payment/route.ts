import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { email, amount, session_id, tier } = await req.json()

  const res = await fetch('https://api.paystack.co/transaction/initialize', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      amount: amount * 100, // Paystack uses kobo
      metadata: { session_id, tier },
      callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/verify`,
    }),
  })

  const data = await res.json()
  if (!data.status) return NextResponse.json({ error: data.message }, { status: 400 })
  return NextResponse.json({ url: data.data.authorization_url, reference: data.data.reference })
}

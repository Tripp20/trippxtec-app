import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const reference = req.nextUrl.searchParams.get('reference')
  if (!reference) return NextResponse.json({ success: false })

  const res = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
    headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
  })
  const data = await res.json()

  if (data.status && data.data.status === 'success') {
    return NextResponse.json({ success: true, session_id: data.data.metadata?.session_id })
  }
  return NextResponse.json({ success: false })
}

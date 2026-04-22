'use client'
import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

function VerifyContent() {
  const params = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'success' | 'failed'>('loading')

  useEffect(() => {
    const reference = params.get('reference')
    if (!reference) { setStatus('failed'); return }

    const verify = async () => {
      const res = await fetch(`/api/payment/verify?reference=${reference}`)
      const data = await res.json()
      if (data.success) {
        await supabase.from('sessions').update({ status: 'matched', payment_reference: reference }).eq('id', data.session_id)
        setStatus('success')
      } else {
        setStatus('failed')
      }
    }
    verify()
  }, [params])

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        {status === 'loading' && <p className="text-gray-500">Verifying payment...</p>}
        {status === 'success' && (
          <>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">✓</div>
            <h1 className="text-2xl font-bold text-gray-900">Payment Confirmed!</h1>
            <p className="mt-3 text-gray-500">Your expert will reach out on WhatsApp within 30 minutes. Get ready to have your problem solved.</p>
            <Link href="/" className="mt-8 inline-block bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-800">Back to Home</Link>
          </>
        )}
        {status === 'failed' && (
          <>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">✗</div>
            <h1 className="text-2xl font-bold text-gray-900">Payment Failed</h1>
            <p className="mt-3 text-gray-500">Something went wrong. Please try again or contact us on WhatsApp.</p>
            <Link href="/submit" className="mt-8 inline-block bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-800">Try Again</Link>
          </>
        )}
      </div>
    </div>
  )
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p className="text-gray-400">Loading...</p></div>}>
      <VerifyContent />
    </Suspense>
  )
}

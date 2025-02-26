'use client'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function PromoCodeDisplay() {
  const searchParams = useSearchParams();
  const promoCode = searchParams.get('promo');
  const promoLength = searchParams.get('interval');
  return (
    <>
      { promoCode ? (
        <div>
          <p>Your exclusive promotion code: <strong>{promoCode}</strong></p>
          <p>Expires in {promoLength}</p>
        </div>
      ) : (
          <p>Thank you for your support!</p>
      )}
    </>
  )
}

export default function ThankYouPatron() {
    return (
        <div>
            <h1>Thank You for Becoming a Patron!</h1>
            <Suspense>
              <PromoCodeDisplay/>
            </Suspense>
            <p>A coupon code should be sent to your email within 24 hours.</p>
            <p>If not, please reach out to support@sleepygallows.com</p>
        </div>
    );
}

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
        <section>
            <h1>Thank You for Becoming a Patron!</h1>
            <Suspense>
              <PromoCodeDisplay/>
            </Suspense>
            <p>The coupon code should on your receipt and sent to your email within 24 hours.</p>
            <p>If not, please reach out to support@sleepygallows.com</p>
        </section>
    );
}

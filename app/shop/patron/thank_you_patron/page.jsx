'use client'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function PromoCodeDisplay() {
  const searchParams = useSearchParams();
  const promoCode = searchParams.get('promo');
  const promoLength = searchParams.get('interval');
  let duration = '30 days.';
  if (promoLength === 'once') {
    duration = '30 days.';
  } else if (promoLength === 'month') {
    duration = '30 days. A new code will be sent to you each month until you cancel.';
  } else if (promoLength === 'year') {
    duration = '1 year. A new code will be sent to you each year until you cancel.';
  }; 

  return (
    <>
      { promoCode ? (
        <div>
          <p>Your exclusive promotion code: <strong>{promoCode}</strong></p>
          <p>Expires in {duration}</p>
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
            <p>The coupon code should on your invoice and sent to your email within 24 hours.</p>
            <p>If not, please reach out to support@sleepygallows.com</p>
        </section>
    );
}

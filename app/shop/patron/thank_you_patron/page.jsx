'use client'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

export default function ThankYouPatron() {
    const searchParams = useSearchParams();
    const promoCode = searchParams.get('promo');
    const promoLength = searchParams.get('interval');

    return (
        <div>
            <h1>Thank You for Becoming a Patron!</h1>
            <Suspense>
              {promoCode ? (
                <div>
                  <p>Your exclusive promotion code: <strong>{promoCode}</strong></p>
                  <p>Expires in {promoLength}</p>
                </div>
              ) : (
                  <p>Thank you for your support!</p>
              )}
            </Suspense>
            <p>A coupn code should be sent to your email within 24 hours.</p>
            <p>If not, please reach out to bg@sleepygallows.com</p>
        </div>
    );
}

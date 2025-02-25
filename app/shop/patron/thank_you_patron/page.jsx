'use client';
import { useSearchParams } from 'next/navigation';

export default function ThankYouPatron() {
    const searchParams = useSearchParams();
    const promoCode = searchParams.get('promo');
    const promoLength = searchParams.get('interval');

    return (
        <div>
            <h1>Thank You for Becoming a Patron!</h1>
            {promoCode ? (
              <div>
                <p>Your exclusive promotion code: <strong>{promoCode}</strong></p>
                <p>Expires in {promoLength}</p>
              </div>
            ) : (
                <p>Thank you for your support!</p>
            )}
        </div>
    );
}

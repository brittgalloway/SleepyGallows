import { NextResponse } from 'next/server'
import { stripe, PATRON_COUPON } from '@/lib/stripe'

export async function POST(req) {
  try {
    const { interval } = await req.json();
    
    const duration = interval === "year" ? 12 : 1;
    
    const date = new Date();
    date.setMonth(date.getMonth() + duration);
    const expiresAt = Math.floor(date.getTime() / 1000);

    const promo = await stripe.promotionCodes.create({
      coupon: PATRON_COUPON,
      active: true,
      expires_at: expiresAt,
    });

    return NextResponse.json({ promo }, { status: 200 });
  } catch (error) {
    console.error('Error creating promotionCodes:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

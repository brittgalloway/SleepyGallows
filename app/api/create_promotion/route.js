import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

export async function POST() {
  try {
      const promo = await stripe.promotionCodes.create({
        coupon:'t_patron-y',
        active: true,
      });

    const createdPromo = await Promise(promo);
    return NextResponse.json({ createdPromo }, { status: 200 });
  } catch (error) {
    console.error('Error creating promotionCodes:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function OPTIONS() {
  return NextResponse.json({ message: 'POST method is allowed' }, { status: 200, headers: { Allow: 'POST' } });
}

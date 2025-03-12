import { stripe, STRIPE_WEBHOOK_SECRET } from '@/lib/stripe'
import { NextResponse } from 'next/server'


async function getRawBody(req) {
    const reader = req.body.getReader();
    let chunks = [];
    let done = false;

    while (!done) {
        const { value, done: readerDone } = await reader.read();
        if (value) chunks.push(value);
        done = readerDone;
    }

    return Buffer.concat(chunks);
}

export async function POST(req) {
    const sig = req.headers.get("stripe-signature");

    let event;
    try {
        const rawBody = await getRawBody(req);
        event = stripe.webhooks.constructEvent(rawBody, sig, STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error("Webhook error:", err.message);
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    if (event.type === "charge.succeeded") {
        const session = event.data.object;
        const customerEmail = session.customer_details.email;
        const promoCode = new URL(session.success_url).searchParams.get("promo");

        if (promoCode) {
            await sendPromoEmail(customerEmail, promoCode);
        }
    }

    return NextResponse.json({ received: true }, { status: 200 });
}

import nodemailer from 'nodemailer';

async function sendPromoEmail(toEmail, promoCode) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.zoho.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.ZOHO_EMAIL,
            pass: process.env.ZOHO_PASSWORD,
        },
    });

    const mailOptions = {
        from: `'Your Brand' <${process.env.ZOHO_EMAIL}>`,
        to: toEmail,
        subject: 'Your Exclusive Promo Code',
        html: `<h2>Thank You for Becoming a Patron! 🎉</h2>
               <p>Here is your exclusive promo code:</p>
               <h3 style="background: #f4f4f4; padding: 10px; border-radius: 5px;">${promoCode}</h3>
               <p>Use it at checkout to enjoy your discount.</p>
               <p>Best, <br> Your Brand Team</p>`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Promo code email sent to', toEmail);
    } catch (error) {
        console.error('Error sending promo email:', error);
    }
}

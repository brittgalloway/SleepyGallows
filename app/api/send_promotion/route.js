import { buffer } from 'micro'
import Stripe from 'stripe'
import nodemailer from 'nodemailer'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const sig = req.headers['stripe-signature'];
    let event;

    try {
        const buf = await buffer(req);
        event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error('Webhook Error:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'payment_intent.succeeded') {
        const session = event.data.object;
        const customerEmail = session.customer_details.email;
        const promoCode = new URL(session.success_url).searchParams.get('promo');

        if (promoCode) {
            await sendPromoEmail(customerEmail, promoCode);
        }
    }

    res.status(200).json({ received: true });
}

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
        from: `"Your Brand" <${process.env.ZOHO_EMAIL}>`,
        to: toEmail,
        subject: "Your Exclusive Promo Code",
        html: `
            <h2>Thank You for Becoming a Patron! 🎉</h2>
            <p>Here is your exclusive promo code:</p>
            <h3 style="background: #f4f4f4; padding: 10px; border-radius: 5px;">${promoCode}</h3>
            <p>Use it at checkout to enjoy your discount.</p>
            <p>Best, <br> Your Brand Team</p>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Promo code email sent to', toEmail);
    } catch (error) {
        console.error('Error sending promo email:', error);
    }
}

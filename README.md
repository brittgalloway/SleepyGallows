# Sleepy Gallows

A portfolio and eCommerce site for the creative work of Brittney and Crystal Galloway — animations, comics, illustrations, and a shop for high-end collage art, prints, stickers, and books.

Live at [sleepygallows.com](https://sleepygallows.com)

---

## Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Language | TypeScript (strict mode) |
| CMS | [Sanity.io](https://www.sanity.io/) |
| Payments | [Stripe Checkout](https://stripe.com/payments/checkout) |
| Animations | [Rive](https://rive.app/) |
| Styles | SCSS Modules |
| Testing | [Jest](https://jestjs.io/) + [React Testing Library](https://testing-library.com/) |
| Design | [Figma](https://www.figma.com/) |
| Deployment | [Vercel](https://vercel.com/) |

---

## Sections

**Animations** — Original shorts, client work, and personal projects, each with a dedicated watch and about page sourced from Sanity.

**Comics** — Currently featuring *Necahual* by Crystal Galloway and Sergio Silva, a Meso-American mythology webcomic also published on Webtoon.

**Art** — Crystal's illustration and visual development work. Brittney's sketches and collage art.

**Shop** — A fully functioning eCommerce store built with Stripe Checkout and Sanity for inventory. Supports:
- Physical products with variants (size, edition)
- Automatic stock management via Stripe webhooks
- Shipping calculation by product type
- Promo codes
- Patron donation tiers (one-time, monthly, yearly) with exclusive discount codes

**Webdev** — Brittney's web development portfolio.

---

## Shop Architecture

The shop uses a server-first approach to keep billing logic off the client:

- Product prices are fetched from Sanity server-side at checkout — client-supplied prices are ignored entirely
- Stripe webhooks handle post-payment stock updates and patron promo code generation
- The Sanity write client (`useCdn: false`) ensures patches are committed directly rather than against the CDN cache
- API routes are protected: `create_promotion` requires an internal secret header and is only callable server-to-server from `create_patron`

```
/api/create_checkout   — builds Stripe session with server-side prices from Sanity
/api/create_patron     — builds patron donation session, triggers promo code creation
/api/create_promotion  — generates a Stripe promo code (internal, protected)
/api/update_stock      — Stripe webhook: decrements Sanity stock after checkout.session.completed
```

---

## Environment Variables

```env
# Stripe
STRIPE_SECRET_TEST=
STRIPE_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_TEST=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WH_SECRET_TEST=
STRIPE_WH_SECRET=
STRIPE_PATRON_PRODUCT_TEST=
STRIPE_PATRON_PRODUCT=
STRIPE_PATRON_COUPON_TEST=
STRIPE_PATRON_COUPON=

# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
NEXT_PUBLIC_SANITY_API_VERSION=
SANITY_ACCESS_TOKEN=

# Internal
INTERNAL_API_SECRET=
ENVIRONMENT=
```

---

## Development

```bash
npm install
npm run dev
```

The Sanity Studio runs separately — see `sanity.config.ts` for configuration.

### Stripe webhooks locally

Use the [Stripe CLI](https://stripe.com/docs/stripe-cli) to forward webhook events to your local server:

```bash
stripe listen --forward-to localhost:3000/api/update_stock
```

Make sure your Stripe dashboard webhook is subscribed to `checkout.session.completed`.

---

## Testing

```bash
# Run all tests
npm test

# Run a specific file
npx jest app/shop/cartProduct.test.js --verbose

# Run only API tests
npx jest app/api --verbose
```

Tests are split into two environments via Jest `projects`:
- **ui** — jsdom, covers cart logic and component rendering
- **api** — node, covers all API route logic

### Coverage

| File | What's tested |
|---|---|
| `cartProduct.test.js` | Cart DOM, add/remove/qty, out-of-stock, checkout button visibility |
| `create_checkout.test.js` | Input validation, server-side price lookup, Stripe session properties |
| `create_patron.test.js` | Patron session creation, promo code flow, subscription vs one-time |
| `create_promotion.test.js` | Auth, interval duration logic, Stripe call shape |
| `update_stock.test.js` | Webhook verification, stock decrement, variant patching, multi-item orders |
| `patron.test.js` | Stripe constants and tier object shapes |
| `patronBtn.test.js` | Frequency switching, price selection, custom input, checkout flow |

---

## Project History

Originally built with Gatsby and DatoCMS with Lottie animations. Migrated to Next.js for better routing and maintainability, Sanity for a more flexible CMS, and Rive for performant interactive animations.

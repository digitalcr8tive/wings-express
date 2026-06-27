# Wing Express

Astro storefront and pickup-ordering foundation for Wing Express in Little Rock.

## Run locally

1. Copy `.env.example` to `.env` and fill any available integration keys.
2. Run `npm install`.
3. Run `npm run dev`.
4. Open `http://127.0.0.1:4321`.

Pay-at-pickup orders work without Stripe. Card checkout activates when `STRIPE_SECRET_KEY` is configured. Email, SMS, POS, and Instagram adapters are intentionally isolated behind environment variables for later setup.

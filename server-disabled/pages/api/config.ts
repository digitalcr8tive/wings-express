import type { APIRoute } from 'astro';
import { getOpenStatus } from '../../lib/hours';

export const GET: APIRoute = async () => Response.json({
  ...getOpenStatus(),
  stripeEnabled: Boolean(import.meta.env.STRIPE_SECRET_KEY),
  hours: 'Tuesday–Friday, 11:30 AM–2:30 PM and 4:00–7:00 PM',
  cutoffMinutes: 10,
  pickupOnly: true
});

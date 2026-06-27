import type { APIRoute } from 'astro';
import crypto from 'node:crypto';
import { readStore, writeStore } from '../../lib/store';
import { notifyBusiness } from '../../lib/notifications';

export const POST: APIRoute = async ({ request }) => {
  const secret = import.meta.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) return Response.json({ error: 'Stripe webhook is not configured.' }, { status: 503 });
  const payload = await request.text();
  const signature = request.headers.get('stripe-signature') || '';
  const pairs = Object.fromEntries(signature.split(',').map((part) => part.split('=')));
  if (!pairs.t || !pairs.v1) return Response.json({ error: 'Missing Stripe signature.' }, { status: 400 });
  const expected = crypto.createHmac('sha256', secret).update(`${pairs.t}.${payload}`).digest('hex');
  const valid = expected.length === pairs.v1.length && crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(pairs.v1));
  if (!valid) return Response.json({ error: 'Invalid Stripe signature.' }, { status: 400 });
  const event = JSON.parse(payload);
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const orders = await readStore<any[]>('orders.json', []);
    const order = orders.find((entry) => entry.id === session.client_reference_id);
    if (order) {
      order.status = 'pending-confirmation'; order.paidAt = new Date().toISOString(); order.stripeSessionId = session.id;
      await writeStore('orders.json', orders); await notifyBusiness({ ...order, cancelToken: undefined, type: 'paid-order' });
    }
  }
  return Response.json({ received: true });
};

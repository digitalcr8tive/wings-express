import type { APIRoute } from 'astro';
import { readStore } from '../../lib/store';

export const POST: APIRoute = async ({ request, url }) => {
  if (!import.meta.env.STRIPE_SECRET_KEY) return Response.json({ error: 'Online card payment is being connected. Choose pay at pickup for now.' }, { status: 503 });
  const { orderId, cancelToken } = await request.json().catch(() => ({}));
  const orders = await readStore<any[]>('orders.json', []);
  const order = orders.find((entry) => entry.id === orderId && entry.cancelToken === cancelToken && entry.status === 'awaiting-payment');
  if (!order) return Response.json({ error: 'We could not find that pending order.' }, { status: 404 });
  const form = new URLSearchParams();
  form.set('mode', 'payment');
  form.set('success_url', `${url.origin}/order-success?order=${encodeURIComponent(order.id)}&cancel=${encodeURIComponent(order.cancelToken)}&session_id={CHECKOUT_SESSION_ID}`);
  form.set('cancel_url', `${url.origin}/?checkout=cancelled`);
  form.set('client_reference_id', order.id);
  order.items.forEach((item: any, index: number) => {
    form.set(`line_items[${index}][price_data][currency]`, 'usd');
    form.set(`line_items[${index}][price_data][unit_amount]`, String(Math.round(item.price * 100)));
    form.set(`line_items[${index}][price_data][product_data][name]`, item.name);
    form.set(`line_items[${index}][quantity]`, String(item.quantity));
  });
  const stripe = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST', headers: { authorization: `Bearer ${import.meta.env.STRIPE_SECRET_KEY}`, 'content-type': 'application/x-www-form-urlencoded' }, body: form
  });
  const session = await stripe.json();
  if (!stripe.ok) return Response.json({ error: session?.error?.message || 'Card checkout could not be started.' }, { status: 502 });
  return Response.json({ url: session.url });
};

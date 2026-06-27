import type { APIRoute } from 'astro';
import { readStore, writeStore } from '../../../../lib/store';

export const POST: APIRoute = async ({ params, request }) => {
  const { cancelToken } = await request.json().catch(() => ({}));
  const orders = await readStore<any[]>('orders.json', []);
  const order = orders.find((entry) => entry.id === params.id);
  if (!order || order.cancelToken !== cancelToken) return Response.json({ error: 'Order not found.' }, { status: 404 });
  if (Date.now() > new Date(order.cancelUntil).getTime()) return Response.json({ error: 'The five-minute cancellation window has ended.' }, { status: 409 });
  if (!['pending-confirmation', 'awaiting-payment'].includes(order.status)) return Response.json({ error: 'This order can no longer be cancelled online.' }, { status: 409 });
  order.status = 'cancelled';
  order.cancelledAt = new Date().toISOString();
  await writeStore('orders.json', orders);
  return Response.json({ status: 'cancelled' });
};

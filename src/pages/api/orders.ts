import type { APIRoute } from 'astro';
import crypto from 'node:crypto';
import { menu } from '../../data/menu';
import { getOpenStatus, isValidScheduledPickup } from '../../lib/hours';
import { notifyBusiness } from '../../lib/notifications';
import { readStore, writeStore } from '../../lib/store';

type Order = Record<string, any>;

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json().catch(() => null);
  if (!body?.customer?.name || !body?.customer?.phone || !Array.isArray(body?.items) || body.items.length === 0) {
    return Response.json({ error: 'Add an item and enter your name and phone number.' }, { status: 400 });
  }
  const scheduled = body.pickup?.mode === 'scheduled';
  if (scheduled && !isValidScheduledPickup(body.pickup?.time)) {
    return Response.json({ error: 'Choose a Tuesday–Friday pickup time during 11:30 AM–2:20 PM or 4:00–6:50 PM.' }, { status: 409 });
  }
  if (!scheduled && !getOpenStatus().open) {
    return Response.json({ error: 'ASAP ordering is closed. Choose an available future pickup time.' }, { status: 409 });
  }
  const status = await readStore<Record<string, boolean>>('menu-status.json', {});
  const normalized = body.items.map((line: any) => {
    const item = menu.find((entry) => entry.id === line.id && !entry.catering);
    if (!item || status[item.id]) throw new Error(`${item?.name || 'An item'} is unavailable.`);
    const quantity = Math.max(1, Math.min(25, Number(line.quantity) || 1));
    return { id: item.id, name: item.name, price: item.price, quantity, options: line.options || {} };
  });
  const subtotal = normalized.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);
  const id = `WE-${Date.now().toString(36).toUpperCase()}`;
  const cancelToken = crypto.randomBytes(18).toString('hex');
  const order: Order = {
    id, cancelToken, createdAt: new Date().toISOString(), cancelUntil: new Date(Date.now() + 5 * 60_000).toISOString(),
    status: body.paymentMethod === 'card' ? 'awaiting-payment' : 'pending-confirmation',
    paymentMethod: body.paymentMethod, customer: body.customer, pickup: body.pickup, items: normalized, subtotal
  };
  const orders = await readStore<Order[]>('orders.json', []);
  orders.push(order);
  await writeStore('orders.json', orders);
  const notificationChannels = await notifyBusiness({ ...order, cancelToken: undefined });
  return Response.json({ id, cancelToken, cancelUntil: order.cancelUntil, status: order.status, subtotal, notificationChannels });
};

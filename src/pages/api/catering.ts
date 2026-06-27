import type { APIRoute } from 'astro';
import { readStore, writeStore } from '../../lib/store';
import { notifyBusiness } from '../../lib/notifications';

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json().catch(() => null);
  if (!body?.name || !body?.phone || !body?.date || !body?.platter) return Response.json({ error: 'Enter your contact details, date, and platter size.' }, { status: 400 });
  const requested = new Date(`${body.date}T12:00:00`);
  if (requested.getTime() < Date.now() + 3 * 24 * 60 * 60_000) return Response.json({ error: 'Catering requests need at least three days of notice.' }, { status: 400 });
  const requests = await readStore<any[]>('catering.json', []);
  const entry = { ...body, id: `CAT-${Date.now().toString(36).toUpperCase()}`, createdAt: new Date().toISOString(), status: 'pending-contact' };
  requests.push(entry);
  await writeStore('catering.json', requests);
  await notifyBusiness({ type: 'catering-request', ...entry });
  return Response.json({ id: entry.id, message: 'Request received. Wing Express will contact you to confirm availability and full payment.' });
};

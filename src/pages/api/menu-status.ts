import type { APIRoute } from 'astro';
import { readStore, writeStore } from '../../lib/store';

export const GET: APIRoute = async () => Response.json(await readStore<Record<string, boolean>>('menu-status.json', {}));

export const POST: APIRoute = async ({ request }) => {
  if (!import.meta.env.ADMIN_KEY || request.headers.get('x-admin-key') !== import.meta.env.ADMIN_KEY) {
    return Response.json({ error: 'Admin access is required.' }, { status: 401 });
  }
  const update = await request.json();
  if (!update || typeof update.id !== 'string' || typeof update.soldOut !== 'boolean') {
    return Response.json({ error: 'Choose an item and availability state.' }, { status: 400 });
  }
  const statuses = await readStore<Record<string, boolean>>('menu-status.json', {});
  statuses[update.id] = update.soldOut;
  await writeStore('menu-status.json', statuses);
  return Response.json(statuses);
};

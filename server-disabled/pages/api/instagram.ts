import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  if (!import.meta.env.INSTAGRAM_ACCESS_TOKEN || !import.meta.env.INSTAGRAM_USER_ID) return Response.json({ posts: [], connected: false });
  const endpoint = new URL(`https://graph.facebook.com/v23.0/${import.meta.env.INSTAGRAM_USER_ID}/media`);
  endpoint.searchParams.set('fields', 'id,caption,media_type,media_url,permalink,thumbnail_url,timestamp');
  endpoint.searchParams.set('access_token', import.meta.env.INSTAGRAM_ACCESS_TOKEN);
  const response = await fetch(endpoint);
  const data = await response.json();
  const posts = (data.data || []).filter((post: any) => new Date(post.timestamp) >= new Date('2026-06-27T00:00:00-05:00')).slice(0, 6);
  return Response.json({ posts, connected: true });
};

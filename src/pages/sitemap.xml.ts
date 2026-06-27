import type { APIRoute } from 'astro';
export const GET: APIRoute = ({ site }) => {
  const base = site || new URL('https://digitalcr8tive.github.io');
  const home = new URL(import.meta.env.BASE_URL, base);
  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${home}</loc><changefreq>weekly</changefreq><priority>1.0</priority></url></urlset>`;
  return new Response(xml, { headers: { 'content-type': 'application/xml' } });
};

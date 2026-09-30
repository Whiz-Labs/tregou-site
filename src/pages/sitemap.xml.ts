import type { APIRoute } from 'astro';
import { getPosts } from '../blog';

// Hand-rolled instead of @astrojs/sitemap: every .astro page is listed, minus
// the ones that ask to stay out of search (noindex in their BaseLayout).
// A new page shows up here by existing; a new noindex page goes in NOINDEX.
// Blog posts come from the content collection (drafts never ship).
const NOINDEX = new Set(['/comecar/']);

const pages = Object.keys(import.meta.glob('./**/*.astro'))
  .filter((file) => !file.includes('['))
  .map((file) => {
    const route = file.replace(/^\.\//, '/').replace(/\.astro$/, '').replace(/(^|\/)index$/, '');
    return route.endsWith('/') ? route : `${route}/`;
  })
  .filter((route) => !NOINDEX.has(route))
  .sort();

export const GET: APIRoute = async ({ site }) => {
  const posts = await getPosts();
  // A post carries its own date (or its update), so search can tell a changed
  // guide from an untouched one. Plain pages have no date worth claiming.
  const entries = [
    ...pages.map((route) => ({ route, lastmod: null as Date | null })),
    ...posts.map((p) => ({ route: `/blog/${p.id}/`, lastmod: p.data.updated ?? p.data.date })),
  ];
  const urls = entries
    .map(({ route, lastmod }) => {
      const date = lastmod ? `<lastmod>${lastmod.toISOString().slice(0, 10)}</lastmod>` : '';
      return `  <url><loc>${new URL(route, site)}</loc>${date}</url>`;
    })
    .join('\n');
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};

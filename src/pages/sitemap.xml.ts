import type { APIRoute } from 'astro';

// Hand-rolled instead of @astrojs/sitemap: every .astro page is listed, minus
// the ones that ask to stay out of search (noindex in their BaseLayout).
// A new page shows up here by existing; a new noindex page goes in NOINDEX.
const NOINDEX = new Set(['/comecar/']);

const pages = Object.keys(import.meta.glob('./**/*.astro'))
  .filter((file) => !file.includes('['))
  .map((file) => {
    const route = file.replace(/^\.\//, '/').replace(/\.astro$/, '').replace(/(^|\/)index$/, '');
    return route.endsWith('/') ? route : `${route}/`;
  })
  .filter((route) => !NOINDEX.has(route))
  .sort();

export const GET: APIRoute = ({ site }) => {
  const urls = pages.map((route) => `  <url><loc>${new URL(route, site)}</loc></url>`).join('\n');
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};

import type { APIRoute } from 'astro';
import { getPosts } from '../../blog';

// RSS for the blog, hand-rolled like the sitemap: readers and search pick up
// a new guide from here without waiting for the next crawl.
const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const GET: APIRoute = async ({ site }) => {
  const posts = await getPosts();
  const items = posts
    .map((p) => {
      const url = new URL(`/blog/${p.id}/`, site).toString();
      return `    <item>
      <title>${escape(p.data.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escape(p.data.description)}</description>
      <category>${escape(p.data.category)}</category>
      <pubDate>${p.data.date.toUTCString()}</pubDate>
    </item>`;
    })
    .join('\n');
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Blog do Tregou</title>
    <link>${new URL('/blog/', site)}</link>
    <atom:link href="${new URL('/blog/rss.xml', site)}" rel="self" type="application/rss+xml" />
    <description>Guias práticos para quem faz delivery com entregadores próprios.</description>
    <language>pt-BR</language>
${items}
  </channel>
</rss>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};

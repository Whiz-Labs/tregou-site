import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

/** Published posts, newest first. Drafts only in `npm run dev`. */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', (p) => import.meta.env.DEV || !p.data.draft);
  // Same-day posts would otherwise come out in whatever order the loader
  // found them; the id keeps the list stable between builds.
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf() || a.id.localeCompare(b.id));
}

/** ~200 words a minute, the usual reading pace for Portuguese prose. */
export function readingMinutes(body: string | undefined): number {
  const words = (body ?? '').trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export function formatDate(d: Date): string {
  return d.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).replace('.', '');
}

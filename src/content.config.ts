import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// A post is one markdown file in src/content/blog; its file name is the URL
// (/blog/<file name>/). It shows up in the blog list and the sitemap by itself.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    /** The page <title> and H1. */
    title: z.string(),
    /** Meta description and the line under the H1. */
    description: z.string(),
    category: z.enum(['Operação', 'Entregadores', 'Custos', 'Farmácias']),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    /** The search page this post leads to, from src/solutions.ts. */
    solution: z.string().optional(),
    /** Illustration on the card and at the top of the post (public/ path). */
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    /** 1200×630 share image with the title; falls back to the site's. */
    ogImage: z.string().optional(),
    /** Unpublished posts build locally but never ship. */
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };

// Flow 2.1-01 (canvas "Tregou · Fluxos"): a page that knows the business
// type sends it to the sign-up form (?segment=), so the form opens with it
// ticked; the others send none. Run after `npm run build`:
//   node scripts/check-signup-links.mjs
import { readFileSync } from 'node:fs';

const PAGES = {
  'sistema-de-entregas-para-restaurantes': 'restaurante',
  'entregas-para-farmacias': 'farmacia',
  'gestao-de-motoboys': null,
  '': null,
};

let failed = 0;
for (const [page, segment] of Object.entries(PAGES)) {
  const html = readFileSync(new URL(`../dist/${page ? page + '/' : ''}index.html`, import.meta.url), 'utf8');
  const links = [...html.matchAll(/href="(https:\/\/panel\.tregou\.app\/signup[^"]*)"/g)].map((m) =>
    new URL(m[1].replace(/&amp;/g, '&'))
  );
  const name = page || '/';
  if (links.length === 0) {
    console.error(`✕ ${name}: no sign-up link`);
    failed++;
    continue;
  }
  for (const u of links) {
    const got = u.searchParams.get('segment');
    if (got !== segment) {
      console.error(`✕ ${name}: ${u.search} → segment ${got}, expected ${segment}`);
      failed++;
    }
    if (!u.searchParams.get('src')) {
      console.error(`✕ ${name}: ${u.search} lost its src`);
      failed++;
    }
  }
  if (!failed) console.log(`✓ ${name}: ${links.length} link(s), segment ${segment}`);
}
process.exit(failed ? 1 : 0);

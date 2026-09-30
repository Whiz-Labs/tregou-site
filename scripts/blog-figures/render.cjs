// Renders a post's illustrations to PNG. Each figure is an element with an id
// in scripts/blog-figures/<slug>.html; it lands as public/blog/<slug>/<id>.png.
// Draw each inline figure twice: <id> at 1440 wide for desktop and <id>-m at
// 720 wide, stacked, so its text stays readable on a phone (<picture> in the
// post picks one). `og` is the 1200×630 share image with the title.
//
//   node scripts/blog-figures/render.cjs <slug>
//
// Needs playwright-core and a Chromium (npx playwright install chromium).
const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright-core');

(async () => {
  const slug = process.argv[2];
  if (!slug) throw new Error('usage: render.cjs <slug>');
  const src = path.join(__dirname, `${slug}.html`);
  const out = path.join(__dirname, '../../public/blog', slug);
  fs.mkdirSync(out, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1500, height: 900 } });
  await page.goto('file://' + src, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const ids = await page.evaluate(() => [...document.querySelectorAll('.fig[id]')].map((el) => el.id));
  for (const id of ids) {
    await page.locator('#' + id).screenshot({ path: path.join(out, `${id}.png`) });
    console.log(`public/blog/${slug}/${id}.png`);
  }
  await browser.close();
})();

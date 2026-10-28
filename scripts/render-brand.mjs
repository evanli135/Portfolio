// Renders brand/*.svg to the PNGs in public/. Run: npm run brand
// Uses a local Chrome; set CHROME_PATH if it isn't in the default macOS location.
import puppeteer from 'puppeteer-core';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const jobs = [
  ['brand/og.svg', 'public/og.png', 1200, 630],
  ['brand/banner.svg', 'docs/linkedin-banner.png', 1584, 396],
  ['brand/favicon.svg', 'public/favicon-32.png', 32, 32],
  ['brand/favicon.svg', 'public/apple-touch-icon.png', 180, 180],
];

const browser = await puppeteer.launch({
  executablePath: process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
});
for (const [src, out, w, h] of jobs) {
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: h });
  await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'light' }]);
  await page.goto(`file://${root}${src}`, { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({ path: `${root}${out}`, clip: { x: 0, y: 0, width: w, height: h } });
  await page.close();
  console.log(out);
}
await browser.close();

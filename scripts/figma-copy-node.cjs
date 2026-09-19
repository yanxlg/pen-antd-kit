// Copies a Figma node (or the whole current page with --all) to the system clipboard
// by driving the Figma editor in a Chrome instance started with:
//   open -na "Google Chrome" --args --user-data-dir=<copy-of-profile> --remote-debugging-port=9222 <figma-url>
// Usage: node scripts/figma-copy-node.cjs <node-id | --all>
const { chromium } = require('@playwright/test');

const FIGMA_FILE_URL =
  'https://www.figma.com/design/OgKQLl70AG1WVdL9CYAizL/Ant-Design-Open-Source--Community-';

(async () => {
  const target = process.argv[2];
  if (!target) throw new Error('usage: figma-copy-node.cjs <node-id|--all>');
  const b = await chromium.connectOverCDP('http://127.0.0.1:9222');
  const page = b.contexts()[0].pages().find((p) => p.url().includes('figma.com/design'));
  if (!page) throw new Error('no figma.com/design tab found on 127.0.0.1:9222');
  if (target === '--all') {
    await page.bringToFront();
    await page.mouse.click(960, 500); // focus canvas
    await page.waitForTimeout(800);
    await page.keyboard.press('Meta+a');
    await page.waitForTimeout(800);
  } else {
    // Deep link selects the node on load (works for locked frames too).
    await page.goto(`${FIGMA_FILE_URL}?node-id=${target}&p=f`);
    await page.waitForTimeout(10000);
    await page.bringToFront();
  }
  await page.keyboard.press('Meta+c');
  await page.waitForTimeout(4000);
  console.log('copied', target);
  await b.close();
})().catch((e) => {
  console.error(e.message);
  process.exit(1);
});

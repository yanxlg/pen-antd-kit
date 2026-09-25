const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
  console.log('Navigating to form doc...');
  try {
    await page.goto('https://ant.design/components/form-cn', { waitUntil: 'networkidle', timeout: 45000 });
  } catch (e) {
    console.log('Navigation warning:', e.message);
  }
  
  const sections = await page.$$('section.code-box');
  console.log('Found code-box sections:', sections.length);
  for (const s of sections) {
    const text = await s.innerText();
    if (text.includes('getValueProps') || text.includes('normalize')) {
      await s.screenshot({ path: 'scratch/official_getvalueprops.png' });
      console.log('Captured official_getvalueprops.png');
    }
    if (text.includes('滚动到错误字段') || text.includes('Slide to error') || text.includes('Scroll to Bio')) {
      await s.screenshot({ path: 'scratch/official_slide_to_error.png' });
      console.log('Captured official_slide_to_error.png');
    }
  }
  await browser.close();
})();

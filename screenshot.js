const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  
  const url = process.argv[2] || 'https://careercare.vercel.app/login';
  const output = process.argv[3] || '/tmp/screenshot.png';
  
  console.log(`📸 Capturing ${url}...`);
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
  await page.screenshot({ path: output, fullPage: true });
  
  console.log(`✅ Screenshot saved to ${output}`);
  await browser.close();
})();

import { pathToFileURL } from 'url';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pptWinPath = process.env.PUPPETEER_WIN_PATH || 'C:\\Users\\MICHAL~1\\AppData\\Local\\Temp\\ppt-test';
const pptUrl = pathToFileURL(path.join(pptWinPath, 'node_modules', 'puppeteer', 'lib', 'cjs', 'puppeteer', 'puppeteer.js'));
const { default: puppeteer } = await import(pptUrl.href);

const screenshotDir = path.join(__dirname, 'temporary screenshots');
if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir);

const url = process.argv[2] || 'http://localhost:3000';
const scrollY = parseInt(process.argv[3] || '0');
const label = process.argv[4] ? `-${process.argv[4]}` : '';

let i = 1;
while (fs.existsSync(path.join(screenshotDir, `screenshot-${i}${label}.png`))) i++;
const outPath = path.join(screenshotDir, `screenshot-${i}${label}.png`);

const browser = await puppeteer.launch({
  headless: true,
  executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });
await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
await new Promise(r => setTimeout(r, 1500));
if (scrollY > 0) {
  await page.evaluate((y) => window.scrollTo(0, y), scrollY);
  await new Promise(r => setTimeout(r, 800));
}
await page.screenshot({ path: outPath, fullPage: false });
await browser.close();
console.log('Saved:', outPath);

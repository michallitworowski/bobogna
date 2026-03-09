import { fileURLToPath, pathToFileURL } from 'url';
import path from 'path';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Windows path to puppeteer (cygpath converts /tmp -> C:\Users\MICHAL~1\AppData\Local\Temp)
const pptWinPath = process.env.PUPPETEER_WIN_PATH || 'C:\\Users\\MICHAL~1\\AppData\\Local\\Temp\\ppt-test';
const pptUrl = pathToFileURL(path.join(pptWinPath, 'node_modules', 'puppeteer', 'lib', 'cjs', 'puppeteer', 'puppeteer.js'));

const { default: puppeteer } = await import(pptUrl.href);

const screenshotDir = path.join(__dirname, 'temporary screenshots');
if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir);

const url = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] ? `-${process.argv[3]}` : '';

let i = 1;
while (fs.existsSync(path.join(screenshotDir, `screenshot-${i}${label}.png`))) i++;
const outPath = path.join(screenshotDir, `screenshot-${i}${label}.png`);

console.log('Launching browser...');
const browser = await puppeteer.launch({
  headless: true,
  executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
console.log('Navigating to', url);
await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
await new Promise(r => setTimeout(r, 2000));
await page.screenshot({ path: outPath, fullPage: true });
await browser.close();
console.log('Saved:', outPath);

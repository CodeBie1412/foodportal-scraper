const puppeteer = require("puppeteer");

async function scrape(link) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(link, {
    waitUntil: "domcontentloaded",
  });

  const data = await page.evaluate(() => {
    return {
      title: document.title,
    };
  });

  await browser.close();
  return data;
}

module.exports = { scrape };

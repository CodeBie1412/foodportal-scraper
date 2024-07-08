const puppeteer = require("puppeteer");

async function scrape(link) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(link, { waitUntil: 'networkidle2'});

  const data = await page.evaluate(() => {
  const bookPods = Array.from(document.querySelectorAll('.product_pod'));
    // const bookData = bookPods.map((book)=>{
    //   title: book.querySelector('h3 a') ? book.querySelector('h3 a').getAttribute('title') : null,
    //   price: book.querySelector('product_color') ? book.querySelector('product_color').innerText: null,
    // });

    return Array.from(bookPods).map(book => ({
      title: book.querySelector('h3 a') ? book.querySelector('h3 a').getAttribute('title') : null,
      price: book.querySelector('.price_color') ? book.querySelector('.price_color').innerText : null,
    }));
  });

  
  await browser.close();
  return data;

}

module.exports = { scrape };

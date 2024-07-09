const puppeteer = require("puppeteer");
const puppeteerextra = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { logToFile } = require('../utils/logger');


async function scrape(link) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(link, { waitUntil: 'networkidle2'});

  const data = await page.evaluate((link) => {
  const bookPods = Array.from(document.querySelectorAll('.product_pod'));

  return Array.from(bookPods).map(book => ({
      title : book.querySelector('h3 a') ? book.querySelector('h3 a').getAttribute('title') : null,
      price : book.querySelector('.price_color') ? book.querySelector('.price_color').innerText : null,
      img   : book.querySelector('img') ? link + book.querySelector('img').getAttribute('src') : null,
      rating: book.querySelector('.star-rating') ? book.querySelector('.star-rating').classList[1] : null,
  // img   : book.querySelector('img') ? link + book.querySelector('img').getAttribute('src') : null,
    }));
  }, link);

  
  await browser.close();
  return data;

}


async function scrapeWebsite(link){


  puppeteerextra.use(StealthPlugin);

  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();

  await page.goto(link,{ waitUntil: 'networkidle2'});

  // const pageHTML = await page.content();
  // console.log('page html:',pageHTML);


  await page.screenshot({ path: 'screenshot.png', fullPage: true });

  // await page.waitForSelector('h2.dish-category-title', {visible:true});

  const frames = page.frames();
  const allTitles = [];
  let titleDiv = null;

  for (const frame of frames){
    titleDiv = await frame.$$('h2.dish-category-title');

    for (const titleDiv of TitleDivs){
      const innerTeXT = 
    }

    if (titleDiv){
      logToFile('Inside iframe', 'app.log', {titleDiv});
      break;
    }
  }


  asdadasds

  const data = await page.evaluate(()=>{
    const titleDiv = document.querySelector('h2.dish-category-title');

    if(!titleDiv){
      console.log('title div not found');
      return null;
    }

    // logToFile('Reached here', 'app.log', {titleDiv});
    console.log("Reached here");

    const innerContain = titleDiv.innerText + "Test";
    return innerContain;
  });

  // let data = null;

  // if(titleDiv){
  //   const innerContain = await frame.evaluate(element => element.innerText, titleDiv);
  //   data = innerContain.trim();
  // }
  // else
  // {
  //   console.log('Title div not found');
  // }

  await browser.close();
  return data

}

module.exports = { 
  scrape,
  scrapeWebsite
};

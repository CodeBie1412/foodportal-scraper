const express = require("express");

const { scrape } = require("./services/scraperService");

const app = express();
const port = 3000;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.post("/log-link", async (req, res) => {
  const link = req.body.link;
  console.log(link);
  // res.send(`${link} received`);

  try {
    const data = await scrape(link);
    console.log(`Scraped data: ${JSON.stringify(data)}`);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send("Error scrapping the link");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost: ${port}`);
});

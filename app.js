const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.post("/log-link", (req, res) => {
  const link = req.body.link;
  console.log(link);
  res.send(`${link} received`);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost: ${port}`);
});

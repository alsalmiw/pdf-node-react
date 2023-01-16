const express = require("express");
const puppeteer = require("puppeteer");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 4000;

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/create-pdf", async (req, res) => {
  const html = req.body.html;
  console.log(html);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "domcontentloaded" });
  const pdf = await page.pdf({path: "document.pdf", format: "A4" });

  res.set({ "Content-Type": "application/pdf", "Content-Length": pdf.length });
  console.log("pdf", pdf);
  res.send(pdf);

  await browser.close();
});

app.get("/fetch-pdf", (req, res) => {
  res.sendFile(`${__dirname}/document.pdf`);
});

app.listen(port, () => console.log(`listening on port ${port}`));

const express = require("express");
const puppeteer = require("puppeteer");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 4000;

const pageMargins = {
  top: "2cm",
  bottom: "2cm",
  left: "1cm",
  right: "1cm",
};

app.use(
  cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/create-pdf", async (req, res) => {
  const html = req.body.html;
  const documentName = req.body.documentName;
  const pdfOptions = {
    margin: pageMargins,
    displayHeaderFooter: true,
    path: "document.pdf",
    headerTemplate:
    `<div style="font-size: 10px; padding: 10px; text-align: right;">${documentName}</div>`,
    footerTemplate:
      `<div style="font-size: 10px; padding: 10px; text-align: center;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>`,
  };
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "domcontentloaded" });
  const pdf = await page.pdf({...pdfOptions, format: "A4" });

  res.set({ "Content-Type": "application/pdf", "Content-Length": pdf.length });
  res.send(pdf);

  await browser.close();
});

// app.get("/fetch-pdf", (req, res) => {
//   res.sendFile(`${__dirname}/document.pdf`);
// });

app.listen(port, () => console.log(`listening on port ${port}`));

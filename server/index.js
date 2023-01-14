const express = require("express");
const bodyParser = require("body-parser");
const pdf = require("html-pdf");
const cors = require("cors");
const pdfTemplate = require("./pdfGenerator");
const app = express();
const port = process.env.PORT || 4000;

app.use(
  cors({
    origin: "http://localhost:3004",
    methods: ["GET", "POST"],
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// post generate pdf
app.post('/create-pdf', (req, res) => {
pdf.create(pdfTemplate(req.body), {}).toFile("result.pdf", (err)=> {
    if(err){
        res.send(Promise.reject(err))
    }
    res.send(Promise.resolve())
})
})
// server.post("/create-pdf", (req, res) => {
//   pdf.create(pdfTemplate()).toBuffer(function (err, buffer) {
//     if (err) return res.send(err);
//     res.type("pdf");
//     res.end(buffer, "binary");
//   });
// });

// get - send generated pdf to client
app.get("/fetch-pdf", (req, res) => {
  res.sendFile(`${__dirname}/result.pdf`);
});

app.listen(port, () => console.log(`listening on port ${port}`));

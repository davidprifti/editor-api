const express = require("express");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");
const pdf = require("html-pdf");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname));

app.get("/", async (req, res) => {
  res.send("fad");
});

app.get("/download-pdf", (req, res) => {
  const file = `${__dirname}/app/file.pdf`;
  res.download(file, "file.pdf", (err) => {
    console.log(err);
  });
});

app.post("/create-pdf", (req, res) => {
  const { markup } = req.body;

  pdf
    .create(markup, {
      border: {
        top: "1.2in",
        right: "0.5in",
        bottom: "1.2in",
        left: "0.5in",
      },
    })
    .toFile("./file.pdf", function (err, success) {
      if (err) return res.status(500).send(err);
      res.status(200).send(success);
    });
});

app.post("/delete", (req, res) => {
  const { filename } = req.body;

  fs.unlinkSync(`${__dirname}/${filename}`, (err) => {
    console.log("couldnt delete file");
  });
});

app.get("/download", (req, res) => {
  const file = `${__dirname}/newFile.json`;

  res.download(file, "file.json", (err) => {
    console.log(err);
  });
});

app.post("/convert", (req, res) => {
  const { content } = req.body;

  fs.writeFile("newFile.json", content, function (err) {
    if (err) res.status(500).send(err);
    res.status(200).send("OK");
  });
});

app.post("/read-file", (req, res) => {
  const { filePath } = req.body;

  fs.readFile(filePath, null, (err) => {
    if (err) res.status(500).send(err, data);

    res.status(200).send(data);
  });
});

app.listen(process.env.PORT || 5000, () => {
  console.log("App is listening...");
});

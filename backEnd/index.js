const express = require("express");
const XLSX = require("xlsx");
var cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());

var upload = require("./multer.js");

//file mime type
// !application/vnd.ms-excel
// !text/csv
// !application/vnd.openxmlformats-officedocument.spreadsheetml.sheet - xlxs

let fileName = "";
let fileDestination = "";

//! fetch data to send to the front end.
//! xlsx npm package is being used to process data
app.get("/", (req, res) => {
  const allData = [];
  let filePath = `./${fileDestination}${fileName}`;
  const workBook = XLSX.readFile(filePath);
  const sheets = workBook.SheetNames;
  for (const sheet of sheets) {
    const sheetData = XLSX.utils.sheet_to_json(workBook.Sheets[sheet]);
    console.log(sheetData);
    sheetData.forEach((data) => allData.push(data));
  }
  res.status(200).send(allData);
});

//! post file by checking file type and file size.
//! multer is being used to upload files.
app.post("/", upload.single("uploadedFiles"), (req, res) => {
  console.log(req);
  fileName = req.file.filename;
  fileDestination = req.file.destination;
  console.log(fileName, fileDestination);
  console.log(req.file);
  res.status(200).send("files uploaded");
});

//! universal error handler
app.use((err, req, res, next) => {
  if (err) {
    res.status(500).send(err.message);
  } else {
    res.status(200).send("success");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

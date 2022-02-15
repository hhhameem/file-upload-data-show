const multer = require("multer");
const path = require("path");

//! working on file name chnage and file upload destionation
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "myFiles/");
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const fileName =
      Date.now() + "-" + file.originalname.toLowerCase().split(" ").join("-");
    cb(null, fileName);
  },
});

//! working on file type check, file size check and error throw.
let upload = multer({
  storage: storage,
  limits: {
    fileSize: 2000000, //max 2mb file size
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      file.mimetype === "application/vnd.ms-excel" ||
      file.mimetype === "text/csv"
    ) {
      cb(null, true);
    } else {
      console.log("here");
      cb(new Error("Only .csv, .xls & .xlxs file format accepted"));
    }
  },
});

module.exports = upload;

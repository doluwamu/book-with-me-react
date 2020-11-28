const DatauriParser = require("datauri/parser");
const dUri = new DatauriParser();
const path = require("path");

exports.datauri = (file) =>
  dUri.format(path.extname(file.originalname).toString(), file.buffer);

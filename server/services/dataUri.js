const DatauriParser = require("datauri/parser");
const path = require("path");
const dUri = new DatauriParser();

exports.datauri = (file) =>
  dUri.format(path.extname(file.originalname), file.buffer);

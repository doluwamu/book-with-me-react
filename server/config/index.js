if (process.env.NODE_ENV === "production") {
  module.exports = require("./prod1");
} else {
  module.exports = require("./dev");
}

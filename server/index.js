const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config/dev");
const { provideErrorHandler } = require("./middlewares");

// routes
const rentalRoutes = require("./routes/rentals");
const userRoutes = require("./routes/users");
const bookingRoutes = require("./routes/bookings");
const imageUploadRoutes = require("./routes/imageUpload");

const { onlyAuthUser } = require("./controllers/users");

// models
require("./models/rental");
require("./models/users");
require("./models/booking");

const app = express();

const PORT = process.env.PORT || 3001;

mongoose.connect(
  config.DB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  () => {
    console.log("Connected to DB");
  }
);

// Middleware
app.use(bodyParser.json());
app.use(provideErrorHandler);

app.get("/api/v1/secret", onlyAuthUser, (req, res) => {
  return res.json({ message: "Super secret message to Test User!" });
});

// Api routes
app.use("/api/v1/rentals", rentalRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/bookings", bookingRoutes);
app.use("/api/v1/image-upload", imageUploadRoutes);

app.listen(PORT, () => {
  console.log("Server is listening on port:", PORT);
});

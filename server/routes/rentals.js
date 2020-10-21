const express = require("express");
const {
  getRentals,
  getRentalById,
  createRental,
} = require("../controllers/rentals");

const router = express.Router();

router.get("", getRentals);

router.get("/:rentalId", getRentalById);

router.post("", createRental);

module.exports = router;

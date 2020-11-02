const express = require("express");
const { onlyAuthUser } = require("../controllers/users");
const {
  getRentals,
  getRentalById,
  createRental
} = require("../controllers/rentals");

const router = express.Router();

router.get("", getRentals);

router.get("/:rentalId", getRentalById);

router.post("", onlyAuthUser, createRental);

module.exports = router;

const express = require("express");
const router = express.Router();
const { createBooking, getBookings } = require("../controllers/bookings");
const { isUserRentalOwner } = require("../controllers/rentals");
const { onlyAuthUser } = require("../controllers/users");


router.get('', getBookings)
router.post("", onlyAuthUser, isUserRentalOwner, createBooking);


module.exports = router;

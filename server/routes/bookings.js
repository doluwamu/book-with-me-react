const express = require("express");
const router = express.Router();
const { createBooking, 
        getBookings, 
        getUserBookings,
        getReceivedBookings,
        deleteBooking
    } = require("../controllers/bookings");
const { isUserRentalOwner } = require("../controllers/rentals");
const { onlyAuthUser } = require("../controllers/users");


router.get('', getBookings)
router.get('/received', onlyAuthUser, getReceivedBookings)
router.get('/me', onlyAuthUser, getUserBookings)
router.post("", onlyAuthUser, isUserRentalOwner, createBooking);


router.delete('/:bookingId', onlyAuthUser, deleteBooking)

module.exports = router;

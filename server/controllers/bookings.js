
const Booking = require('../models/booking');
const Rental = require('../models/rental');
const moment = require('moment');

exports.getBookings = async (req, res) => {
  const { rental } = req.query;
  const query = rental ? Booking.find({rental}) : Booking.find({});

  try {
    const bookings = await query.select('startAt endAt  -_id').exec();
    return res.json(bookings);
  } catch(error) {
    return res.mongoError(error)
  }
}

exports.getReceivedBookings = async (req, res) => {
  const { user } = res.locals;

  try {
    const rentals = await Rental.find({owner: user}, '_id');
    const rentalIds = rentals.map(r => r.id);
    const bookings = await Booking
                            .find({rental: { $in: rentalIds}})
                            .populate('user', '-password')
                            .populate('rental');
    return res.json(bookings);
  } catch(error) {
    return res.mongoError(error);
  }
}

exports.getUserBookings = async(req, res) => {
  const { user } = res.locals

  try {
    const bookings = await Booking.find({user}).populate('user', '-password').populate('rental')
    return res.json(bookings)
  } catch (error) {
    return res.mongoError(error)
  }
}

exports.deleteBooking = async(req, res) => {
  const { bookingId } = req.params;
  const { user } = res.locals
  const DAYS_THRESHOLD = 3

  try {
    const booking = await Booking.findById(bookingId).populate('user', '-password')

    if (user.id !== booking.user.id){
      return res.sendApiError({
          title: "Invalid User",
          detail: "You are not booking creator!",
      });
    }

    if(moment(booking.startAt).diff(moment(), 'days') > DAYS_THRESHOLD){
      await booking.remove();
      return res.json({id: bookingId});
    }else{
      return res.sendApiError({
        title: "Invalid Booking",
        detail: "You can only delete booking at least 3 days before arrival!",
    });
    }

  } catch (error) {
    return res.mongoError(error)
  }
}

exports.createBooking = async (req, res) => {

    const bookingData = req.body;
    const booking = new Booking(
      {...bookingData, 
      startAt: moment(bookingData.startAt).utc().format(),
      endAt: moment(bookingData.endAt).utc().format(),
      user: res.locals.user});

    if(!checkIfBookingDatesAreValid(booking)){
        return res.sendApiError({
            title: "Invalid Booking",
            detail: "Dates are invalid!",
        });
    }

    try{
        const rentalBookings = await Booking.find({rental: booking.rental});
        const isBookingValid = checkIfBookingIsValid(booking, rentalBookings);
    
        if (isBookingValid) {
            const savedBooking = await booking.save();
            return res.json({startAt: savedBooking.startAt, endAt: savedBooking.endAt})
        } else{
            return res.sendApiError({
                title: "Invalid Booking",
                detail: "Ooops, booking may contain already booked out dates!",
            });
        }
    }
    catch(error){
        return res.mongoError(error)
    }

    
}


function checkIfBookingDatesAreValid(booking) {
  let isValid = true;
  if (!booking.startAt || !booking.endAt) {
    isValid = false;
  }
  if (moment(booking.startAt) > moment(booking.endAt)) {
    isValid = false;
  }
  return isValid;
}
function checkIfBookingIsValid(pendingBooking, rentalBookings) {
  let isValid = true;
  if (rentalBookings && rentalBookings.length > 0) {
    isValid = rentalBookings.every(booking => {
      const pendingStart = moment(pendingBooking.startAt);
      const pendingEnd = moment(pendingBooking.endAt);
      const bookingStart = moment(booking.startAt);
      const bookingEnd = moment(booking.endAt);
      return ((bookingStart < pendingStart) && bookingEnd < pendingStart || 
              (pendingEnd < bookingEnd && pendingEnd < bookingStart));
    })
  }
  return isValid
}

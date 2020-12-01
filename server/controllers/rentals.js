const Rental = require("../models/rental");
const Booking = require("../models/booking");

exports.getRentals = async (req, res) => {
  const { city } = req.query;
  const query = city ? { city } : {};

  try {
    const rental = await Rental.find(query).populate("image");
    return res.json(rental);
  } catch (error) {
    return res.mongoError(error);
  }
};

exports.getUserRentals = async (req, res) => {
  const { user } = res.locals;

  try {
    const rentals = await Rental.find({ owner: user }).populate("image");
    return res.json(rentals);
  } catch (error) {
    return res.mongoError(error);
  }
};

exports.deleteRental = async (req, res) => {
  const { rentalId } = req.params;
  const { user } = res.locals;

  try {
    const rental = await Rental.findById(rentalId).populate(
      "owner",
      "-password"
    );
    const bookings = await Booking.find({ rental });

    if (user.id !== rental.owner.id) {
      return res.sendApiError({
        title: "Invalid User",
        detail: "You are not owner of this rental!",
      });
    }

    if (bookings && bookings.length > 0) {
      return res.sendApiError({
        title: "Active bookings",
        detail: "You cannot delete rental with active bookings!",
      });
    }

    await rental.remove();
    return res.json({ id: rentalId });
  } catch (error) {
    return res.mongoError(error);
  }
};

exports.getRentalById = async (req, res) => {
  const { rentalId } = req.params;

  Rental.findById(rentalId)
    .populate("owner", "-password")
    .populate("image")
    .exec((error, foundRental) => {
      if (error) {
        return res.mongoError(error);
      }
      return res.json(foundRental);
    });
};

exports.verifyUser = async (req, res) => {
  const { user } = res.locals;
  const { rentalId } = req.params;

  try {
    const rental = await Rental.findById(rentalId).populate(
      "owner",
      "-password"
    );
    if (rental.owner.id !== user.id) {
      return res.sendApiError({
        title: "Invalid User",
        detail: "You are not owner of this rental!",
      });
    }

    return res.json({ status: "verified" });
  } catch (error) {
    return res.mongoError(error);
  }
};

exports.createRental = (req, res) => {
  const rentalData = req.body;
  rentalData.owner = res.locals.user;

  Rental.create(rentalData, (error, createdRental) => {
    if (error) {
      return res.mongoError(error);
    }
    return res.json({ createdRental });
  });
};

exports.updateRental = async (req, res) => {
  const { rentalId } = req.params;
  const rentalData = req.body;
  const { user } = res.locals;

  try {
    const rental = await Rental.findById(rentalId).populate(
      "owner",
      "-password"
    );

    if (rental.owner.id !== user.id) {
      return res.sendApiError({
        title: "Invalid User",
        detail: "You are not owner of this rental!",
      });
    }

    rental.set(rentalData);
    const updatedRental = await Rental.findById(rentalId)
      .populate("owner", "-password")
      .populate("image");

    await rental.save();
    return res.status(200).send(updatedRental);
  } catch (error) {
    return res.mongoError(error);
  }
};

// middlewares
exports.isUserRentalOwner = (req, res, next) => {
  const { rental } = req.body;
  const user = res.locals.user;

  if (!rental) {
    return res.sendApiError({
      title: "Invalid Booking",
      detail: "Cannot create booking on undefined rental",
    });
  }

  Rental.findById(rental)
    .populate("owner")
    .exec((error, foundRental) => {
      if (error) {
        return res.mongoError(error);
      }

      if (!foundRental.owner) {
        return res.sendApiError({
          title: "Invalid User",
          detail: "Cannot create booking on undefined rental",
        });
      }

      if (foundRental.owner.id === user.id) {
        return res.sendApiError({
          title: "Invalid User",
          detail: "Cannot create booking on your rental",
        });
      }

      next();
    });
};

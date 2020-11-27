const { rentals, users, images } = require("./data");
const Rental = require("../models/rental");
const User = require("../models/users");
const Booking = require("../models/booking");
const CloudinaryImage = require("../models/cloudinary-image");

class FakeDB {
  async clean() {
    await Rental.deleteMany({});
    await User.deleteMany({});
    await Booking.deleteMany({});
    await CloudinaryImage.deleteMany({});
  }

  async addData() {
    await CloudinaryImage.create(images);
    await Rental.create(rentals);
    await User.create(users);
  }

  async populate() {
    await this.clean();
    await this.addData();
  }
}

module.exports = FakeDB;

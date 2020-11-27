const mongoose = require("mongoose");

const user1Id = mongoose.Types.ObjectId();
const user2Id = mongoose.Types.ObjectId();

const image1Id = mongoose.Types.ObjectId();
const image2Id = mongoose.Types.ObjectId();
const image3Id = mongoose.Types.ObjectId();

exports.images = [
  {
    _id: image1Id,
    cloudinaryId: "img2_sx2jlj",
    url:
      "https://res.cloudinary.com/book-with-me-react/image/upload/v1606513617/img2_sx2jlj.jpg",
  },
  {
    _id: image2Id,
    cloudinaryId: "img4_qqeon0",
    url:
      "https://res.cloudinary.com/book-with-me-react/image/upload/v1606513616/img4_qqeon0.jpg",
  },
  {
    _id: image3Id,
    cloudinaryId: "img3_u0l2mv",
    url:
      "https://res.cloudinary.com/book-with-me-react/image/upload/v1606513616/img3_u0l2mv.jpg",
  },
];

exports.users = [
  {
    _id: user1Id,
    username: "Test user",
    email: "test@gmail.com",
    password: "testingtest",
  },
  {
    _id: user2Id,
    username: "Test user2",
    email: "test2@gmail.com",
    password: "testtest22",
  },
];

exports.rentals = [
  {
    title: "Nice view on ocean",
    city: "San Francisco",
    street: "Main street",
    category: "condo",
    image: image1Id,
    numOfRooms: 4,
    shared: true,
    description: "Very nice apartment in center of the city.",
    dailyPrice: 43,
    owner: user1Id,
  },
  {
    title: "Modern apartment in center",
    city: "New York",
    street: "Time Square",
    category: "apartment",
    image: image2Id,
    numOfRooms: 1,
    shared: false,
    description: "Very nice apartment in center of the city.",
    dailyPrice: 11,
    owner: user1Id,
  },
  {
    title: "Old house in nature",
    city: "Bratislava",
    street: "Letna 7",
    category: "house",
    image: image3Id,
    numOfRooms: 5,
    shared: true,
    description: "Very nice apartment in center of the city.",
    dailyPrice: 23,
    owner: user2Id,
  },
];

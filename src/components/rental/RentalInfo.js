import React from "react";
import RentalAssets from "./RentalAssets";
import { capitalize } from "helpers/functions";

const RentalInfo = ({ rental }) => {
  return (
    <div className="rental">
      {/* <!-- TODO: Display shared category --> */}
      <h2 className={`rental-type type-${rental.category}`}>
        {rental.shared ? "Shared" : "Whole"} {rental.category}
      </h2>
      { rental.owner &&
        <div className="rental-owner">
          <img src="https://api.adorable.io/avatars/285/abott@adorable.png" alt="owner"/>
          <span>{rental.owner.username}</span>
        </div>
      }
      {/* <!-- TODO: Display title --> */}
      <h1 className="rental-title">{rental.title}</h1>
      {/* <!-- TODO: Display city --> */}
      <h2 className="rental-city">{capitalize(rental.city)}</h2>
      <div className="rental-room-info">
        {/* <!-- TODO: Display numOfRooms --> */}
        <span>
          <i className="fa fa-building"></i>
          {rental.numOfRooms} bedroom(s)
        </span>
        {/* // <!-- TODO: Display numOfRooms + 4 --> */}
        <span>
          <i className="fa fa-user"></i> {rental.numOfRooms + 4} guests
        </span>
        {/* // <!-- TODO: Display numOfRooms + 2 --> */}
        <span>
          <i className="fa fa-bed"></i> {rental.numOfRooms + 2} beds
        </span>
      </div>
      {/* <!-- TODO: Display description --> */}
      <p className="rental-description">{rental.description}</p>
      <hr />

      <RentalAssets />
    </div>
  );
};

export default RentalInfo;

import React from "react";
import RentalAssets from "./RentalAssets";
import { capitalize } from "helpers/functions";



// Function to display information about a rental on rental details page
const RentalInfo = ({ rental }) => {
  return (
    <div className="rental">
      <h2 className={`rental-type type-${rental.category}`}>
        {rental.shared ? "Shared" : "Whole"} {rental.category}
      </h2>
      { rental.owner &&
        <div className="rental-owner">
          <img src="/images/avatar.png" alt="owner"/>
          <span>{rental.owner.username}</span>
        </div>
      }

      <h1 className="rental-title">{rental.title}</h1>

      <h2 className="rental-city">{capitalize(rental.city)}</h2>
      <div className="rental-room-info">

        <span>
          <i className="fa fa-building"></i>
          {rental.numOfRooms} bedroom(s)
        </span>

        <span>
          <i className="fa fa-user"></i> {rental.numOfRooms + 4} guests
        </span>

        <span>
          <i className="fa fa-bed"></i> {rental.numOfRooms + 2} beds
        </span>
      </div>

      <p className="rental-description">{rental.description}</p>
      <hr />

      <RentalAssets />
    </div>
  );
};

export default RentalInfo;

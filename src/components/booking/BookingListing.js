import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { capitalize, formatDate } from 'helpers/functions'

// Function to show list of bookings 
const BookingListing = ({bookings, type}) => {
    return (
        <section className="booking-listing">
            <h1 className="page-title">Page Title</h1>
            <div className="row">
                { bookings && bookings.map(booking => 
                
                    <div className="col-md-4" key={booking._id}>
                    <div className="card text-center">
                        {/* Only if 'received' booking */}
                        { type === 'received' &&
                            <div className="card-header">
                                From: Some User
                            </div>
                        }
                        {/* Only if 'received' booking END */}
                        <div className="card-block">
                        <h4 className="card-title">{capitalize(booking.rental.title)} - {capitalize(booking.rental.city)} </h4>
                        <p className="card-text booking-days">
                            {formatDate(booking.startAt)} - {formatDate(booking.endAt)} | {booking.nights} nights
                        </p>
                        <p className="card-text"><span>Price: </span> <span className="booking-price-value">${booking.price}</span></p>
                        <Link to={{pathname: `/rentals/${booking.rental._id}`}} className="btn btn-bwm-main">Go to Rental</Link>
                        <button
                            className="ml-1 btn btn-danger">Delete
                        </button>
                        </div>
                        <div className="card-footer text-muted">
                        Created at {formatDate(booking.createdAt)}
                        </div>
                    </div>
                    </div>
                )}
            </div>
        </section>
    )
}

export default BookingListing

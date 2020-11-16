import React, { Component } from 'react'
import BookingListing from 'components/booking/BookingListing'
import { connect } from 'react-redux'
import { deleteBooking, fetchUserBookings } from 'actions'

class ManageBookings extends Component {

    componentDidMount(){
        this.props.dispatch(fetchUserBookings())
    }

    deleteABooking = (bookingId) => {
        const canDelete = this.askForPermision();
        if(!canDelete){ return }
        
        this.props.dispatch(deleteBooking(bookingId))
    }

    askForPermision = () => {
        return window.confirm('Are you sure you want to delete this booking?')
    }

    render() {
        const { bookings, errors, isFetching } = this.props;
        return (
            <BookingListing 
            bookings={bookings} 
            title={"My Bookings"} 
            errors={errors}
            isFetching={isFetching}
            renderMenu={(bookingId) =>
                <> 
                    <button 
                        onClick={() => this.deleteABooking(bookingId)}
                        className="btn btn-danger">Delete</button> 
                </>
            } 
            />
        )
    }
}

const mapStateToProps = ({manage}) => {
    return{
        bookings: manage.bookings.items,
        isFetching: manage.bookings.isFetching,
        errors: manage.bookings.errors
    }
}

export default connect(mapStateToProps)(ManageBookings)

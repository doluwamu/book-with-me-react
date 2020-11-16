import React, { Component } from 'react'
import BookingListing from 'components/booking/BookingListing'
import { connect } from 'react-redux'
import { fetchUserBookings } from 'actions'

class ManageBookings extends Component {

    componentDidMount(){
        this.props.dispatch(fetchUserBookings())
    }

    deleteBooking = (bookingId) => {
        const canDelete = this.askForPermision();
        if(!canDelete){ return }
        
        alert(`Deleting booking with id ${bookingId}`)
    }

    askForPermision = () => {
        return window.confirm('Are you sure you want to delete this booking?')
    }

    render() {
        const { bookings } = this.props;
        return (
            <BookingListing 
            bookings={bookings} 
            title={"My Bookings"} 
            renderMenu={() =>
                <> 
                    <button 
                        onClick={() => this.deleteBooking()}
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
        isFetching: manage.bookings.isFetching
    }
}

export default connect(mapStateToProps)(ManageBookings)

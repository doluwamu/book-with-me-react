import React, { Component } from 'react'
import BookingListing from 'components/booking/BookingListing'
import { connect } from 'react-redux'
import { fetchReceivedBookings } from 'actions'

class ReceivedBookings extends Component {

    componentDidMount(){
        this.props.dispatch(fetchReceivedBookings())
    }

    render() {
        const { bookings, isFetching, errors } = this.props;
        return (
            <BookingListing 
                bookings={bookings} 
                title={"Received Bookings"} 
                type={"received"} 
                isFetching={isFetching}
                errors={errors}
            />
        )
    }
}

const mapStateToProps = ({manage}) => {
    return{
        bookings: manage.receivedBookings.items,
        isFetching: manage.receivedBookings.isFetching,
        errors: manage.receivedBookings.errors
    }
}

export default connect(mapStateToProps)(ReceivedBookings)

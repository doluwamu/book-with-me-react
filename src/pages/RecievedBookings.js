import React, { Component } from 'react'
import BookingListing from 'components/booking/BookingListing'
import { connect } from 'react-redux'
import { fetchReceivedBookings } from 'actions'

class ReceivedBookings extends Component {

    componentDidMount(){
        this.props.dispatch(fetchReceivedBookings())
    }

    render() {
        const { bookings } = this.props;
        return (
            <BookingListing bookings={bookings} title={"Received Bookings"} type={"received"} />
        )
    }
}

const mapStateToProps = ({manage}) => {
    return{
        bookings: manage.receivedBookings.items,
        isFetching: manage.receivedBookings.isFetching
    }
}

export default connect(mapStateToProps)(ReceivedBookings)

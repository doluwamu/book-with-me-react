import React, { Component } from 'react'
import BookingListing from 'components/booking/BookingListing'
import { connect } from 'react-redux'
import { fetchUserBookings } from 'actions'

class ManageBookings extends Component {

    componentDidMount(){
        this.props.dispatch(fetchUserBookings())
    }

    render() {
        const { bookings } = this.props;
        return (
            <BookingListing bookings={bookings} />
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

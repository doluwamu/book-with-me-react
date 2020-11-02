import React, { Component } from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import BwmModal from 'components/shared/Modal';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import { createBooking, getBookings } from 'actions';

const moment = extendMoment(Moment);

export class BookingReserve extends Component {
    
    constructor() {
        super();

        this.dateRef = React.createRef();
        this.bookedOutDates = [];

        this.state = {
            proposedBooking: {
                guests: "",
                startAt: null,
                endAt: null
            }
        }
    }

    async componentDidMount() {
        const { rental } = this.props;
        const bookings = await getBookings(rental._id);
        debugger
        this.initBookedOutDates(bookings)

    }

    initBookedOutDates(bookings){
        bookings.forEach(booking => this.bookedOutDates.push(booking))
    }

    
    handleApply = (_, {startDate, endDate}) => {

        this.dateRef.current = moment(startDate).format("MM/DD/YYYY") + " - " + moment(endDate).format("MM/DD/YYYY")

        this.setState({
            proposedBooking: {
                ...this.state.proposedBooking,
                startAt: startDate,
                endAt: endDate
            }
        })
        
    }

    processAdditionalData = () => {
        this.setState({
            proposedBooking: {
                ...this.state.proposedBooking,
                nights: this.nights,
                price: this.price,
                rental: this.props.rental
            }
            
        })
    }

    checkInvalidDates = (date) => {
        // If date is invalid return true
        return date < moment().add(-1, 'day')
    }

    handleGuestChange =  (event) => {
        this.setState({
            proposedBooking:{
                ...this.state.proposedBooking,
                guests: parseInt(event.target.value, 10)
            }
        })
    }


    reserveRental = (closeCallBack) => {
        createBooking(this.state.proposedBooking)
        .then(newBooking => {
            alert('success');
            closeCallBack();
        })
        .catch(error => {
            alert('Error');
        })
    }

    get price() {
        const { rental: { dailyPrice }} = this.props;
        return dailyPrice && this.nights * dailyPrice;
    }

    get nights() {
        const { startAt, endAt } = this.state.proposedBooking;
        if(!startAt || !endAt) { return null; }
        const range = moment.range(startAt, endAt);
        return Array.from(range.by('days')).length - 1;
    }

    get isBookingValid() {
        const { startAt, endAt, guests } = this.state.proposedBooking;
        return startAt && endAt && guests;
    }

    get formattedDate(){
        return this.dateRef.current ? this.dateRef.current : "";
    }

    render() {
        const { rental } = this.props;
        const { proposedBooking: {guests, nights, price} } = this.state;
        return (
            <div className='booking'>
                <h3 className='booking-price'>$ {rental.dailyPrice} <span className='booking-per-night'>per night</span></h3>
                <hr></hr>
                <div className='form-group'>
                <label htmlFor='dates'>Dates</label>

                <DateRangePicker 
                    initialSettings={{isInvalidDate: this.checkInvalidDates, opens: 'left'}}
                    onApply={this.handleApply}
                >
                    <input
                        ref = {this.dateRef}
                        placeholder="Choose date"
                        id="dates"
                        type="text"
                        className="form-control" 
                    />
                </DateRangePicker>
                </div>
                <div className='form-group'>
                    <label htmlFor='guests'>Guests</label>
                    <input 
                        onChange={this.handleGuestChange}
                        value={guests}
                        type='number'
                        placeholder="Enter number of guests..."
                        className='form-control'
                        id='guests'
                        aria-describedby='guests'>
                    </input>
                </div>
                <BwmModal
                    onSubmit={this.reserveRental}
                    title="Confirm Booking"
                    subtitle= {this.formattedDate}
                    openBtn={ 
                        <button
                            onClick={this.processAdditionalData} 
                            disabled={!this.isBookingValid}
                            className='btn btn-bwm-main btn-block'>
                                Reserve place now
                        </button>}
                >
                    <em>{nights}</em> Nights /
                    <em> ${rental.dailyPrice}</em> per Night
                    <p>Guests: <em>{guests}</em></p>
                    <p>Price: <em>${price}</em></p>
                    <p>Do you confirm your booking for selected days?</p>
                </BwmModal>

                <hr></hr>
                <p className='booking-note-title'>People are interested into this house</p>
                <p className='booking-note-text'>
                    More than 500 people checked this rental in last month.
                </p>
                </div>
        )
    }
}

export default BookingReserve

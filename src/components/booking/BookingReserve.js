import React, { Component } from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import BwmModal from 'components/shared/Modal';
import ApiError from 'components/forms/ApiError';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import { createBooking, getBookings } from 'actions';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const moment = extendMoment(Moment);

export class BookingReserve extends Component {
    
    constructor() {
        super();

        this.dateRef = React.createRef();
        this.bookedOutDates = [];

        this.state = {
            errors: [],
            proposedBooking: {
                guests: "",
                startAt: null,
                endAt: null
            }
        }
    }

    async componentDidMount() {
        const { rental } = this.props;
        this.bookedOutDates = await getBookings(rental._id);
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
        let isBookedOut = false;

        isBookedOut = this.bookedOutDates.some(booking =>  moment.range(booking.startAt, booking.endAt).contains(date))
        


        return date < moment().add(-1, 'day') || isBookedOut;
    }

    handleGuestChange =  (event) => {
        this.setState({
            proposedBooking:{
                ...this.state.proposedBooking,
                guests: parseInt(event.target.value, 10)
            }
        })
    }

    resetData = () => {
        this.setState({
            errors: [],
            proposedBooking:{ guests: '', startAt: null, endAt: null}
        })

    }

    reserveRental = (closeCallBack) => {
        createBooking(this.state.proposedBooking)
        .then(newBooking => {
            this.bookedOutDates.push(newBooking)
            this.resetData()
            toast.success("Booking has been created!", {
                autoClose: 3000
            });
            closeCallBack();
        })
        .catch(errors => {
            this.setState({errors})
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
        const { rental, isAuth } = this.props;
        const { errors, proposedBooking: {guests, nights, price} } = this.state;
        return (
            <div className='booking'>
                <h3 className='booking-price'>$ {rental.dailyPrice} <span className='booking-per-night'>per night</span></h3>
                <hr></hr>
                { !isAuth &&
                    <Link to='/login' className="btn btn-bwm-main btn-block">You need to login to book this place</Link>
                }
                { isAuth &&
                    <>
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
                            <div className='mb-2'>
                                <em>{nights}</em> Nights /
                                <em> ${rental.dailyPrice}</em> per Night
                                <p>Guests: <em>{guests}</em></p>
                                <p>Price: <em>${price}</em></p>
                                <p>Do you confirm your booking for selected days?</p>
                            </div>
                            <ApiError errors={errors}/>
                        </BwmModal>
                    </>
                }
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

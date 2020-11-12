import React, { Component } from 'react'
import { fetchUserRentals } from 'actions';
import { connect } from 'react-redux';
import RentalCard from 'components/rental/RentalCard';

class ManageRentals extends Component {

    componentDidMount() {
        this.props.dispatch(fetchUserRentals());
    }

    renderRental = (rentals) =>
        rentals.map((rental) => (
            <div className="col-md-3" key={rental._id}>
                <RentalCard rental={rental} />
            </div>
        )
    );

    render() {
        const { rentals } = this.props
        return (
            <div className="card-list">
                <h1 className="page-title">My Rentals</h1>
                <div className="row">{this.renderRental(rentals)}</div>
            </div>
        )
    }
}

const mapStateToProps = ({manage}) => {
    return{
        rentals: manage.rentals.items,
        isFetching: manage.rentals.isFetching
    }
}

export default connect(mapStateToProps)(ManageRentals)

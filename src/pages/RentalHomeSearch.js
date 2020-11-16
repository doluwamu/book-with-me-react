import React, { Component } from "react";
import RentalCard from "components/rental/RentalCard";
import { connect } from "react-redux";
import { fetchRentals } from "actions";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import { capitalize } from "helpers/functions";


// Rental search page component
export class RentalHome extends Component {
    componentDidMount() {
        return this.fetchRentals
    }

    componentDidUpdate(prevprops){
        const { location: prevLocation } = prevprops.match.params

        if (this.location !== prevLocation){
            return this.fetchRentals
        }

    }

    renderRental = (rentals) =>
        rentals.map((rental) => (
            <div className="col-md-3" key={rental._id}>
                <RentalCard rental={rental} />
            </div>
    ));

    get fetchRentals() {
        return this.props.dispatch(fetchRentals(this.location));
    }

    get location() {
        return this.props.match.params.location
    }

    get noRentalsFound() {
        const { rentals, isFetching } = this.props;
        return rentals.length === 0 && !isFetching
    }

    render() {
        const { rentals } = this.props;
        return (
            <div className="card-list">
                <h1 className="page-title">Your Home in "{capitalize(this.location)}"</h1>
                <div className="row">{this.renderRental(rentals)}</div>
            { this.noRentalsFound &&
                <p className='alert alert-warning'>No rentals found for this search!</p>
            }
            </div>
        );
    }
}

const mapStateToProps = ({rentals: {items, isFetching}}) => {
    return {
        rentals: items,
        isFetching
    };
};

export default connect(mapStateToProps)(withRouter(RentalHome));

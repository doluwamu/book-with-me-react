import React, { Component } from "react";
import RentalCard from "components/rental/RentalCard";
import { connect } from "react-redux";
import { fetchRentals } from "actions";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import { capitalize } from "helpers/functions";

export class RentalHome extends Component {
    componentDidMount() {
        const {location} = this 
        this.props.dispatch(fetchRentals(location));
    }

    renderRental = (rentals) =>
        rentals.map((rental) => (
            <div className="col-md-3" key={rental._id}>
                <RentalCard rental={rental} />
            </div>
    ));

    get location() {
        return this.props.match.params.location
    }

    render() {
        const { rentals } = this.props;
        return (
            <div className="card-list">
                <h1 className="page-title">Your Home in "{capitalize(this.location)}"</h1>
                <div className="row">{this.renderRental(rentals)}</div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        rentals: state.rentals,
    };
};

export default connect(mapStateToProps)(withRouter(RentalHome));

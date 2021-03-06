import React, { Component } from "react";
import RentalCard from "components/rental/RentalCard";
import { connect } from "react-redux";
import { fetchRentals } from "actions";


// Home page component
export class RentalHome extends Component {
  componentDidMount() {
    this.props.dispatch(fetchRentals());
  }

  renderRental = (rentals) =>
    rentals.map((rental) => (
      <div className="col-md-3" key={rental._id}>
        <RentalCard rental={rental} />
      </div>
    ));

  render() {
    const { rentals } = this.props;

    return (
      <div className="card-list">
        <h1 className="page-title">Your Home All Around the World</h1>
        <div className="row">{this.renderRental(rentals)}</div>
      </div>
    );
  }
}

const mapStateToProps = ({rentals: {items}}) => {
  return {
    rentals: items,
  };
};

export default connect(mapStateToProps)(RentalHome);

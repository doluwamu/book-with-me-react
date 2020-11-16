import React, { Component } from 'react'
import { deleteRental, fetchUserRentals } from 'actions';
import { connect } from 'react-redux';
import RentalCard from 'components/rental/RentalCard';
import ApiError from 'components/forms/ApiError';

class ManageRentals extends Component {

    componentDidMount() {
        this.props.dispatch(fetchUserRentals());
    }

    deleteRental = (rentalId) => {
        const canDelete = this.askForPermision();
        if(!canDelete){ return }
        
        this.props.dispatch(deleteRental(rentalId))
    }

    askForPermision = () => {
        return window.confirm('Are you sure you want to delete this rental?')
    }

    renderRental = (rentals) =>
        rentals.map((rental) => (
            <div className="col-md-3" key={rental._id}>
                <RentalCard 
                    rental={rental}
                    renderMenu={() =>
                        <> 
                            <button 
                                onClick={() => this.deleteRental(rental._id)}
                                className="btn btn-danger">Delete</button> 
                        </>
                    } 
                />
            </div>
        )
    );

    render() {
        const { rentals, errors, isFetching } = this.props
        return (
            <div className="card-list">
                <h1 className="page-title">My Rentals</h1>
                <ApiError errors={errors} />
                <div className="row">{this.renderRental(rentals)}</div>
                { !isFetching && rentals.length <= 0 &&
                    <p className="alert alert-warning">You currently don't have any rentals created!</p>
                }
            </div>
        )
    }
}

const mapStateToProps = ({manage}) => {
    return{
        rentals: manage.rentals.items,
        isFetching: manage.rentals.isFetching,
        errors: manage.rentals.errors
    }
}

export default connect(mapStateToProps)(ManageRentals)

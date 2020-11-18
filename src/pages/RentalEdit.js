import React, { Component, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchRentalById, updateRental, verifyRentalOwner } from "actions";
import TomMap from "components/map/TomMap";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import RentalAssets from "components/rental/RentalAssets";
import { capitalize } from "helpers/functions";
import EditableInput from "components/editable/EditableInput";
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const withUerCheck = Component => props => {
    const [guard, setGuard] = useState({canProceed: false, isChecking: true})
    const { id } = props.match.params;

    useEffect(() => {
        verifyRentalOwner(id)
        .then(_ => setGuard({canProceed: true, isChecking: false}))
        .catch(_ => setGuard({canProceed: false, isChecking: false}))
    }, [id])

    const { canProceed, isChecking } = guard;
    if(!isChecking && canProceed) {
        return <Component  {...props}/>
    } else if(!isChecking && !canProceed) {
        return <Redirect to={{pathname: '/'}} />
    } else {
        return <h3>Loading...</h3>
    }
}


// Rental details page component
class RentalEdit extends Component {

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.dispatch(fetchRentalById(id));
    }

    componentWillUnmount() {
        this.props.dispatch({type: 'UNMOUNT_RENTAL'})
    }

    updateRental = (rentalData, onSuccess, onError) => {
        const { id } = this.props.match.params;
        return this.props.dispatch(updateRental(id, rentalData))
        .then(() => {
            onSuccess()
        })
        .catch(errors => {
            const message = errors.length > 0 ? errors[0].detail : 'Ooops, something went wrong!'
            toast.error(message, {
                autoClose: 3000
            });
            onError()
        })
    }

    get location() {
        const {rental:{ street, city }} = this.props
        return street && city && city + ', ' + street
    }



    render() {
        const { rental, isFetching } = this.props;
        if (isFetching || !rental._id) {
        return <h3>Loading...</h3>;
        }
        return (
        <section id="rentalDetails">
            <div className="upper-section">
            <div className="row">
                <div className="col-md-6">
                <img src={rental.image} alt={rental.title} />
                </div>
                <div className="col-md-6">
                <TomMap location={this.location} />
                </div>
            </div>
            </div>

            <div className="details-section">
            <div className="row">
                <div className="col-md-8">
                <div className="rental">
                    <h2 className={`rental-type type-${rental.category}`}>
                        {rental.shared ? "Shared" : "Whole"} {rental.category}
                    </h2>
                    <EditableInput 
                        entity={rental}
                        field={'title'}
                        className={'rental-title'}
                        onUpdate={this.updateRental}
                    />
                    <EditableInput 
                        entity={rental}
                        field={'city'}
                        className={'rental-city'}
                        onUpdate={this.updateRental}
                    />
                    <EditableInput 
                        entity={rental}
                        field={'street'}
                        className={'rental-street'}
                        onUpdate={this.updateRental}
                    />
                    <div className="rental-room-info">
                        <span>
                            <FontAwesomeIcon icon="building"/> {rental.numOfRooms} bedroom(s)
                        </span>
                        <span>
                            <FontAwesomeIcon icon="user"/> {rental.numOfRooms + 4} guests
                        </span>
                        <span>
                        <FontAwesomeIcon icon="bed" /> {rental.numOfRooms + 2} beds
                        </span>
                    </div>
                    <p className="rental-description">{rental.description}</p>
                    <hr />

                    <RentalAssets />
                    </div>
                </div>
            </div>
            </div>
        </section>
        );
    }
}

const mapStateToProps = ({ rental, auth: {isAuth} }) => ({
    rental: rental.item,
    isFetching: rental.isFetching,
    isAuth
});

const RentalEditWithRouterAndCheck = withRouter(withUerCheck(RentalEdit));

export default connect(mapStateToProps)(RentalEditWithRouterAndCheck);

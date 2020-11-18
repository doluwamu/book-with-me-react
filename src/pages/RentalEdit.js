import React, { Component, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchRentalById, verifyRentalOwner } from "actions";
import TomMap from "components/map/TomMap";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import RentalAssets from "components/rental/RentalAssets";
import { capitalize } from "helpers/functions";
import EditableInput from "components/editable/EditableInput";

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
            <h1>Rental Edit</h1>
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
                    {/* <!-- TODO: Display shared category --> */}
                    <h2 className={`rental-type type-${rental.category}`}>
                        {rental.shared ? "Shared" : "Whole"} {rental.category}
                    </h2>
                    { rental.owner &&
                        <div className="rental-owner">
                        <img src="/images/avatar.png" alt="owner"/>
                        <span>{rental.owner.username}</span>
                        </div>
                    }
                    {/* <!-- TODO: Display title --> */}
                    {/* <h1 className="rental-title">{rental.title}</h1> */}
                    <EditableInput />
                    {/* <!-- TODO: Display city --> */}
                    <h2 className="rental-city">{capitalize(rental.city)}</h2>
                    <div className="rental-room-info">
                        {/* <!-- TODO: Display numOfRooms --> */}
                        <span>
                        <i className="fa fa-building"></i>
                        {rental.numOfRooms} bedroom(s)
                        </span>
                        {/* // <!-- TODO: Display numOfRooms + 4 --> */}
                        <span>
                        <i className="fa fa-user"></i> {rental.numOfRooms + 4} guests
                        </span>
                        {/* // <!-- TODO: Display numOfRooms + 2 --> */}
                        <span>
                        <i className="fa fa-bed"></i> {rental.numOfRooms + 2} beds
                        </span>
                    </div>
                    {/* <!-- TODO: Display description --> */}
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

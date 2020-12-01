import React, { Component, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchRentalById, updateRental, verifyRentalOwner } from "actions";
import TomMap from "components/map/TomMap";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import RentalAssets from "components/rental/RentalAssets";
import { capitalize } from "helpers/functions";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  EditableInput,
  EditableSelect,
  EditableTextarea,
  EditableImage,
} from "components/editable";
import Spinner from "components/shared/Spinner";

const withUerCheck = (Component) => (props) => {
  const [guard, setGuard] = useState({ canProceed: false, isChecking: true });
  const { id } = props.match.params;

  useEffect(() => {
    verifyRentalOwner(id)
      .then((_) => setGuard({ canProceed: true, isChecking: false }))
      .catch((_) => setGuard({ canProceed: false, isChecking: false }));
  }, [id]);

  const { canProceed, isChecking } = guard;
  if (!isChecking && canProceed) {
    return <Component {...props} />;
  } else if (!isChecking && !canProceed) {
    return <Redirect to={{ pathname: "/" }} />;
  } else {
    return <Spinner />;
  }
};

// Rental details page component
class RentalEdit extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.dispatch(fetchRentalById(id));
  }

  componentWillUnmount() {
    this.props.dispatch({ type: "UNMOUNT_RENTAL" });
  }

  updateRental = (rentalData, onSuccess, onError) => {
    const { id } = this.props.match.params;
    return this.props
      .dispatch(updateRental(id, rentalData))
      .then(() => {
        onSuccess();
      })
      .catch((errors) => {
        const message =
          errors.length > 0 ? errors[0].detail : "Ooops, something went wrong!";
        toast.error(message, {
          autoClose: 3000,
        });
        onError();
      });
  };

  get location() {
    const {
      rental: { street, city },
    } = this.props;
    return street && city && city + ", " + street;
  }

  render() {
    const { rental, isFetching } = this.props;
    if (isFetching || !rental._id) {
      return <Spinner />;
    }
    return (
      <section id="rentalEdit">
        <div className="upper-section">
          <div className="row">
            <div className="col-md-6">
              {/* <img src={rental.image.url} alt={rental.title} /> */}
              <EditableImage
                entity={rental}
                field={"image"}
                onUpdate={this.updateRental}
                transformView={(image) => image.url}
                containerType={"block"}
                className="rental-img mb-2"
              />
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
                <span className="rental-city">Is shared: </span>
                <EditableSelect
                  entity={rental}
                  field={"shared"}
                  options={[true, false]}
                  className={`rental-type type-${rental.category}`}
                  onUpdate={this.updateRental}
                  containerType={"inline"}
                />
                <EditableSelect
                  entity={rental}
                  field={"category"}
                  options={["apartment", "condor", "house"]}
                  className={`rental-type type-${rental.category}`}
                  onUpdate={this.updateRental}
                />

                <EditableInput
                  entity={rental}
                  field={"title"}
                  className={"rental-title"}
                  onUpdate={this.updateRental}
                />
                <EditableInput
                  entity={rental}
                  field={"city"}
                  className={"rental-city"}
                  transformView={(value) => capitalize(value)}
                  onUpdate={this.updateRental}
                />
                <EditableInput
                  entity={rental}
                  field={"street"}
                  className={"rental-street"}
                  transformView={(value) => capitalize(value)}
                  onUpdate={this.updateRental}
                />
                <div className="rental-room-info mb-1">
                  <span>
                    <FontAwesomeIcon icon="building" />
                    <EditableInput
                      entity={rental}
                      field={"numOfRooms"}
                      className={"mr-0 ml-2"}
                      onUpdate={this.updateRental}
                      containerType={"inline"}
                    />
                    bedroom(s)
                  </span>
                  <span>
                    <FontAwesomeIcon icon="user" /> {rental.numOfRooms + 4}{" "}
                    guests
                  </span>
                  <span>
                    <FontAwesomeIcon icon="bed" /> {rental.numOfRooms + 2} beds
                  </span>
                </div>
                <EditableTextarea
                  entity={rental}
                  field={"description"}
                  className={"rental-description"}
                  onUpdate={this.updateRental}
                  rows={5}
                  cols={60}
                />
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

const mapStateToProps = ({ rental, auth: { isAuth } }) => ({
  rental: rental.item,
  isFetching: rental.isFetching,
  isAuth,
});

const RentalEditWithRouterAndCheck = withRouter(withUerCheck(RentalEdit));

export default connect(mapStateToProps)(RentalEditWithRouterAndCheck);

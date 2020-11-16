import React from "react";
import { Route, Switch } from "react-router-dom";

import RentalHome from "./pages/RentalHome";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RentalDetail from "./pages/RentalDetail";
import SecretPage from "pages/SecretPage";
import AuthRoute from "components/auth/AuthRoute";
import GuestRoute from "components/auth/GuestRoute";
import RentalNew from "pages/RentalNew";
import RentalHomeSearch from "pages/RentalHomeSearch";
import ManageBookings from "pages/ManageBookings";
import ManageRentals from "pages/ManageRentals";
import RecievedBookings from "pages/RecievedBookings";
import RentalEdit from "pages/RentalEdit";

const Routes = () => {
  return (
    <div className="container bwm-container">
      <Switch>

        <Route path="/" exact={true}>
          <RentalHome />
        </Route>

        <AuthRoute path="/bookings/manage">
          <ManageBookings />
        </AuthRoute>

        <AuthRoute path="/rentals/manage">
          <ManageRentals />
        </AuthRoute>

        <AuthRoute path="/bookings/received">
          <RecievedBookings />
        </AuthRoute>

        <Route path="/rentals/:location/homes">
          <RentalHomeSearch />
        </Route>

        <AuthRoute path="/rentals/new">
          <RentalNew />
        </AuthRoute>

        <AuthRoute path="/rentals/:id/edit">
          <RentalEdit />
        </AuthRoute>

        <Route path="/rentals/:id">
          <RentalDetail />
        </Route>

        <AuthRoute path="/secret">
          <SecretPage />
        </AuthRoute>

        <GuestRoute path="/login">
          <Login />
        </GuestRoute>

        <GuestRoute path="/register">
          <Register />
        </GuestRoute>
      </Switch>
    </div>
  );
};

export default Routes;

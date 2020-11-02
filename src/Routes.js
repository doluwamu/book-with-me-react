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

const Routes = () => {
  return (
    <div className="container bwm-container">
      <Switch>

        <Route path="/" exact={true}>
          <RentalHome />
        </Route>

        <AuthRoute path="/rentals/new">
          <RentalNew />
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

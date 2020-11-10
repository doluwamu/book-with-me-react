import React from "react";
import { useAuth } from "providers/AuthProvider";
import { Redirect, Route } from "react-router-dom";

// Checking if user is logged in before accessing a certain page
const AuthRoute = ({children, ...rest}) => {

    const authService = useAuth()
    const child = React.Children.only(children)
    return (
        <Route {...rest} render = {(props) => authService.isAuthenticated() ? React.cloneElement(child, {...rest, ...props}) : <Redirect to={{pathname: '/login'}}/>} />
    )
}

export default AuthRoute

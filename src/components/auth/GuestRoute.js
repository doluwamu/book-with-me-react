import React from "react";
import { useAuth } from "providers/AuthProvider";
import { Redirect, Route } from "react-router-dom";

const GuestRoute = ({children, ...rest}) => {

    const authService = useAuth()
    const child = React.Children.only(children)
    // debugger
    return (
        <Route {...rest} render = {(props) => !authService.isAuthenticated() ? React.cloneElement(child, {...rest, ...props}) : <Redirect to={{pathname: '/'}}/>} />
    )
}

export default GuestRoute

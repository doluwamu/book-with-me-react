import React, { useContext } from "react";
import { loginUser, userAuthenticated } from "actions";
import jwt from "jsonwebtoken";
import { connect } from "react-redux";

import moment from "moment";

const { createContext } = React;

const AuthContext = createContext(null);

const AuthBaseProvider = ({ dispatch, children }) => {

  const isAuthenticated = () => {
    const decodedToken = decodeToken(getToken())
    return decodedToken && isTokenValid(decodedToken)
    
  }

  const isTokenValid = (decodedToken) => {
    return decodedToken && moment().isBefore(getExpiration(decodedToken))
  }

  const signOut = () => {
    localStorage.removeItem("bwm_token")
    dispatch({ type: "USER_SIGNED_OUT" })
  }

  const checkAuthState = () => {
    const decodedToken = decodeToken(getToken())
    if (decodedToken && moment().isBefore(getExpiration(decodedToken))) {
      dispatch(userAuthenticated(decodedToken))
    }
  }

  const getToken = () => {
    return localStorage.getItem("bwm_token")
  }

  const getExpiration = (decodedToken) => {
    return moment.unix(decodedToken.exp)
  }

  const signIn = (loginData) => {
    return loginUser(loginData)
      .then((token) => {
        localStorage.setItem("bwm_token", token)
        const decodedToken = decodeToken(token)
        dispatch(userAuthenticated(decodedToken))
        return token
      })
  }

  const decodeToken = (token) => {
    return jwt.decode(token);
  }

  const authApi = {
    signIn,
    checkAuthState,
    signOut,
    isAuthenticated
  }



  return (
    <AuthContext.Provider value={authApi}>
      {children}
    </AuthContext.Provider>);
};

export const AuthProvider = connect()(AuthBaseProvider)

export const useAuth = () => {
  return useContext(AuthContext)
}

export const withAuth = (Component) => {
  return (props) =>
    <AuthContext.Consumer>
      {(authApi) => <Component {...props} auth={authApi} />}
    </AuthContext.Consumer>

}

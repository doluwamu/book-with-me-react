import React, { useEffect } from "react";
import Header from "./components/shared/Header";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";

import { Provider } from "react-redux";
import {AuthProvider, useAuth} from 'providers/AuthProvider'
import { initStore } from "./store";

const store = initStore();

const Providers = ({ children }) => {
  return (
    <Provider store={store}>
        <AuthProvider>
          {children}
        </AuthProvider>
    </Provider>
  )
}

const BwmApp = () => {
  const authService = useAuth()

  useEffect(() => {
    authService.checkAuthState()
  }, [authService])

  return(
    <Router>
      <Header logout={authService.signOut} />
      <Routes />
    </Router>
  )
}

const App = () => {
  return (
    <Providers>
        <BwmApp />
    </Providers>
  );
};

export default App;

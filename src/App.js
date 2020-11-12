import React, { useEffect } from "react";
import Header from "./components/shared/Header";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import { ToastContainer } from 'react-toastify';
import { Provider } from "react-redux";
import {AuthProvider, useAuth} from 'providers/AuthProvider'
import { initStore } from "./store";
import { MapProvider } from "providers/MapProvider";

const store = initStore();

const Providers = ({ children }) => {
  return (
    <Provider store={store}>
        <AuthProvider>
          <MapProvider apiKey='tfFq5i0xQYO8g1wjKwYBcYDDmOWSTGXg'>
            {children}
          </MapProvider>
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

// Function for app
const App = () => {
  return (
    <Providers>
      <ToastContainer />
        <BwmApp />
    </Providers>
  );
};

export default App;

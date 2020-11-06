import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import "bootstrap/dist/js/bootstrap.min.js";
import "./index.scss";
import 'bootstrap-daterangepicker/daterangepicker.css';
import 'react-toastify/dist/ReactToastify.css';

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

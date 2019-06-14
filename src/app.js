import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppRouter, { history } from "./routers/AppRouter";
import { login, logout } from "./actions/auth";
import configureStore from "./store/configureStore";
import "./styles/styles.scss";
import "normalize.css/normalize.css";
import { firebase } from "./firebase/firebase";
import LoadingPage from "./components/LoadingPage";

// Configure the redux store
const store = configureStore();

// To prevent unneccesary re-rendering
let hasRendered = false;
const app = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(app, document.getElementById("app"));
    hasRendered = true;
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById("app"));

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    // User is logged in, render app and redirect to dashboard page
    store.dispatch(login(user.uid));
    renderApp();
    if (history.location.pathname === "/") {
      history.push("/dashboard");
    }
  } else {
    // User is logged out, redirect to login page
    store.dispatch(logout());
    renderApp();
    history.push("/");
  }
});

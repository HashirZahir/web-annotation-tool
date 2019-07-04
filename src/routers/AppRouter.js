import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from 'history';
import DashboardPage from "../components/DashboardPage";
import LoginPage from "../components/LoginPage";
import AnnotatePage from "../components/AnnotatePage";
import NotFoundPage from "../components/NotFoundPage";
import UploadPage from "../components/UploadPage";
import AnnotateContainer from "../containers/AnnotateContainer";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

export const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/" component={LoginPage} exact={true} />
        <PrivateRoute path="/dashboard" component={DashboardPage} />
        <PrivateRoute path="/annotate" component={AnnotateContainer} />
        <PrivateRoute path="/upload" component={UploadPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;

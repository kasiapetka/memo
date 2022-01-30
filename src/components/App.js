import React, { useEffect } from "react";
import LandingPage from "./LandingPage";
import GamePage from "./GamePage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SummaryPage from "./SummaryPage";
import "./App.scss";
import LoginPage from "./LoginPage";
import { connect } from "react-redux";
import * as actions from "../store/actions";

const App = () => {

  let content = <div className="App">
      <Router>
        <Switch>
          <Route path="/game">
            <GamePage  />
          </Route>
          <Route path="/summary">
            <SummaryPage  />
          </Route>
          <Route path="/home">
            <LandingPage />
          </Route>
          <Route path="/">
            <LoginPage />
          </Route>
        </Switch>
      </Router>
    </div>;
  
  return content;
};

function mapStateToProps(state) {
  return {
    auth: state.auth.auth
};
}

export default connect(mapStateToProps, actions)(App);

import React from "react";
import LandingPage from "./LandingPage";
import GamePage from "./GamePage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SummaryPage from "./SummaryPage";
import "./App.scss";
import LoginPage from "./LoginPage";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/game">
            <GamePage />
          </Route>
          <Route path="/summary">
            <SummaryPage />
          </Route>
          <Route path="/home">
            <LandingPage />
          </Route>
          <Route path="/">
            <LoginPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;

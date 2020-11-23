import React from "react";
import classes from "./App.module.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header.js";
import Home from "./pages/Home/Home.js";

const App = () => {
  return (
    <div className={classes.App}>
      <Router basename="/">
        <Header />
        <div className={classes.Root}>
          <Switch>
            <Route exact path="/" component={(props) => <Home {...props} />} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;

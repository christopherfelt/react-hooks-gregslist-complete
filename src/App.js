import React from "react";
import "./App.css";

import Homepage from "./pages/homepage";
import CarDetail from "./pages/cardetail.js";
import Housepage from "./pages/housepage";
import HouseDetail from "./pages/housedetail.js";

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import { GlobalProvider } from "./context/GlobalState";
import { HouseProvider } from "./context/HouseState";

function App() {
  return (
    <Router>
      <GlobalProvider>
        <HouseProvider>
          <div className="App">
            <nav className="navbar">
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/houses/">Houses</Link>
                </li>
              </ul>
            </nav>
            <Switch>
              <Route path="/" exact component={Homepage} />
              <Route path="/cardetail/:carId" component={CarDetail} />
              <Route path="/houses/" exact component={Housepage} />
              <Route path="/housedetail/:houseId" component={HouseDetail} />
            </Switch>
          </div>
        </HouseProvider>
      </GlobalProvider>
    </Router>
  );
}

export default App;

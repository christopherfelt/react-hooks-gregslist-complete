import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "./App.css";

import Homepage from "./pages/homepage";
import CarDetail from "./pages/cardetail.js";
import Housepage from "./pages/housepage";
import HouseDetail from "./pages/housedetail.js";
import Jobpage from "./pages/jobpage";
import JobDetail from "./pages/jobdetail";

import { GlobalProvider } from "./context/GlobalState";
import { HouseProvider } from "./context/HouseState";
import { JobProvider } from "./context/JobState";

function App() {
  const { loginWithRedirect } = useAuth0();

  return (
    <Router>
      <GlobalProvider>
        <HouseProvider>
          <JobProvider>
            <div className="App">
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/">
                  Greglists
                </Link>
                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <Link className="nav-link" to="/">
                        Cars
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/houses/">
                        Houses
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/jobs/">
                        Jobs
                      </Link>
                    </li>
                  </ul>
                </div>
                <button
                  className="btn btn-secondary"
                  onClick={() => loginWithRedirect()}
                >
                  Log In
                </button>
              </nav>
              <Switch>
                <Route path="/" exact component={Homepage} />
                <Route path="/cardetail/:carId" component={CarDetail} />
                <Route path="/houses/" exact component={Housepage} />
                <Route path="/housedetail/:houseId" component={HouseDetail} />
                <Route path="/jobs/" exact component={Jobpage} />
                <Route path="/jobdetail/:jobId" component={JobDetail} />
              </Switch>
            </div>
          </JobProvider>
        </HouseProvider>
      </GlobalProvider>
    </Router>
  );
}

export default App;

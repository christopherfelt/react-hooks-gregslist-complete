import React from 'react';
import './App.css';

import Homepage from "./pages/homepage"
import CarDetail from "./pages/cardetail"

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"

import { GlobalProvider } from "./context/GlobalState";

function App() {


  return (
    <Router>
      <GlobalProvider>
        <div className="App">
          {/* <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/cardetail/hello">Car Detail</Link></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </nav> */}
          <Switch>
            <Route path="/" exact component={Homepage} />
            <Route path="/cardetail/:carId" component={CarDetail}/>
          </Switch>

        </div>
      </GlobalProvider>
    </Router>

  );
}

export default App;

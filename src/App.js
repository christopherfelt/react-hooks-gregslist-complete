import React from 'react';
import './App.css';

import Homepage from "./pages/homepage"

import { GlobalProvider } from "./context/GlobalState";

function App() {
  return (

    <GlobalProvider>
      <div className="App">
        <Homepage />
      </div>
    </GlobalProvider>
  );
}

export default App;

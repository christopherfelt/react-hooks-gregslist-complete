import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

const DOMAIN = process.env.REACT_APP_DOMAIN;
// To get the environment variable to work with auth0 client id needs to be
// CLIENTID
const CLIENT_ID = process.env.REACT_APP_CLIENTID;
const AUDIENCE = process.env.REACT_APP_AUDIENCE;

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={DOMAIN}
      clientId={CLIENT_ID}
      redirectUri={window.location.origin}
      audience={AUDIENCE}
      scope="read:current_user"
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { Auth0Provider } from "@auth0/auth0-react";


ReactDOM.render(
    <Auth0Provider
        domain="dev-osoluiemsmr8uoqc.us.auth0.com"
        clientId="XZgpCG0xqLp6dpD84TWErJTKBJSXcKMh"
        authorizationParams={{
            redirect_uri: window.location.origin
        }}
    >
        <App />
    </Auth0Provider>,
    document.getElementById("root"));
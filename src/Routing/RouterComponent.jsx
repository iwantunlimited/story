import React from 'react';
import {Switch} from "react-router";
import RouteWithSubRoutes from "./RouterWithSubRoutes";
import {routes} from "./router";
import {BrowserRouter} from "react-router-dom";

function RouterComponent(props) {
    return (
        <BrowserRouter>
            <Switch>
                {routes.map((route, i) => (
                    <RouteWithSubRoutes key={i} {...route} />
                ))}
            </Switch>
        </BrowserRouter>
    );
}

export default RouterComponent;
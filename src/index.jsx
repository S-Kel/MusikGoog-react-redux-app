import "semantic-ui-css/semantic.min.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider} from "react-redux";


import store from "./redux/store";
import "./index.css";
import App from "./app/App";
import * as serviceWorker from "./serviceWorker";

const rootEL = document.getElementById("root");

const render = () => {
    ReactDOM.render( < Provider store = { store } >< App /></Provider> , 
    rootEL);
};


if (module.hot) {
    module.hot.accept("./app/App", () => {
        render();
    });
}

render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
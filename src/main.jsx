import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import store from "./store";

ReactDOM.createRoot(document.body).render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);

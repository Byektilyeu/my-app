import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import categoryReducer from "./redux/reducer/categoryReducer";
import menuReducer from "./redux/reducer/menuReducer";
import cartReducer from "./redux/reducer/cartReducer";
import settingsReducer from "./redux/reducer/settingsReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
  categoryReducer,
  menuReducer,
  cartReducer,
  settingsReducer,
});
const middleWares = [thunk];

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(...middleWares))
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();

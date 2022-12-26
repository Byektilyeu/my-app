import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import HomePage from "./Pages/HomePage/index";
import MenuPage from "./Pages/MenuPage/index";
import * as ROUTES from "./Constants/Routes/index";
import HallPlanPage from "./Pages/HallPlanPage/index";
import TablePage from "./Pages/TablePage/index";
import CartPage from "./Pages/CartPage";
// import GetCategory from "./Components/GetCategory/index";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path={ROUTES.HALLPLAN} component={HallPlanPage} />
          <Route exact path={ROUTES.BASKET} component={CartPage} />
          <Route exact path={ROUTES.HOMEPAGE} component={HomePage} />
          <Route exact path={ROUTES.MENUPAGE} component={MenuPage} />
          <Route exact path={ROUTES.TABLES} component={TablePage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};
export default App;

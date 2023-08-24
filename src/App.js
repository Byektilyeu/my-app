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
import OrderResultPage from "./Pages/OrderResultPage/index";
import SettingsPage from "./Pages/SettingsPage";
import ResListPage from "./Pages/CreateRestaurantPage";
import RestaurantsPage from "./Pages/RestaurantsPage";
import VoidPage from "./Pages/VoidPage";
import VoidOrderPage from "./Pages/VoidOrderPage";
import AdminPage from "./Pages/AdminPage";
// import GetCategory from "./Components/GetCategory/index";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path={ROUTES.ADMINPAGE} component={AdminPage} />
          <Route exact path={ROUTES.VOID} component={VoidPage} />
          <Route exact path={ROUTES.VOIDORDER} component={VoidOrderPage} />
          <Route exact path={ROUTES.RESLIST} component={ResListPage} />
          <Route exact path={ROUTES.SETTINGS} component={SettingsPage} />
          <Route exact path={ROUTES.RESTAURANT} component={RestaurantsPage} />
          <Route exact path={ROUTES.HALLPLAN} component={HallPlanPage} />
          <Route exact path={ROUTES.BASKET} component={CartPage} />
          <Route exact path={ROUTES.HOMEPAGE} component={HomePage} />
          <Route exact path={ROUTES.MENUPAGE} component={MenuPage} />
          <Route exact path={ROUTES.TABLES} component={TablePage} />
          <Route exact path={ROUTES.ORDERS} component={OrderResultPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};
export default App;

import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import HomePage from "./Pages/HomePage/index";
import * as ROUTES from "./Constants/Routes/index";
import HallPlanPage from "./Pages/HallPlanPage/index";
import TablePage from "./Pages/TablePage/index";
import GetCategory from "./Components/GetCategory/index";

const App = () => {
  return (
<<<<<<< HEAD
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path={ROUTES.HALLPLAN} component={HallPlanPage} />
          <Route exact path={ROUTES.HOMEPAGE} component={HomePage} />
          <Route exact path={ROUTES.TABLES} component={TablePage} />
          <Route exact path={ROUTES.CATEGORYFOODS} component={GetCategory} />
        </Switch>
      </div>
    </BrowserRouter>
=======
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          sdjgjsdhgjas
        </a>
      </header>
    </div>
>>>>>>> 5b97d98ee350ff1970fc165b8b671b8a4eadf528
  );
};
export default App;

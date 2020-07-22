import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignUp from "./components/signUp/Signup";
import Home from "./components/signUp/App/Home";

const MyRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={SignUp} />
        <Route path="/home" component={Home} />
      </Switch>
    </BrowserRouter>
  );
};

export default MyRouter;

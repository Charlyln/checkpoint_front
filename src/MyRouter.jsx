import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignUp from "./components/signUp/Signup";
import Home from "./components/App/Home";
import MyAppBar from "./components/signUp/appBar/MyAppBar";
import Profil from "./components/App/Profil";
import Post from "./components/App/Post";
import Favorite from "./components/App/Favorite";
import Booking from "./components/App/Booking";

const MyRouter = () => {
  return (
    <BrowserRouter>
      <MyAppBar />
      <Switch>
        <Route exact path="/" component={SignUp} />
        <Route path="/home" component={Home} />
        <Route path="/profil" component={Profil} />
        <Route path="/post" component={Post} />
        <Route path="/favorite" component={Favorite} />
        <Route path="/bookings" component={Booking} />
      </Switch>
    </BrowserRouter>
  );
};

export default MyRouter;

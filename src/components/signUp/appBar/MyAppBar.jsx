import React, { useEffect, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import { Link, Redirect } from "react-router-dom";
import PersonIcon from "@material-ui/icons/Person";
import PostAddIcon from "@material-ui/icons/PostAdd";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";

import "./myAppBar.css";

export default function MyAppBar() {
  return (
    <AppBar className="appBar">
      <Toolbar style={{ width: "100%", padding: 0 }}>
        <Link className="appLinks" to="/home">
          <IconButton color="white" aria-label="menu">
            <HomeIcon />
          </IconButton>
        </Link>
        <Link className="appLinks" to="/profil">
          <IconButton color="white" aria-label="menu">
            <PersonIcon />
          </IconButton>
        </Link>
        <Link className="appLinks" to="/post">
          <IconButton color="white" aria-label="menu">
            <PostAddIcon />
          </IconButton>
        </Link>
        <Link className="appLinks" to="/favorite">
          <IconButton color="white" aria-label="menu">
            <FavoriteIcon />
          </IconButton>
        </Link>
        <Link className="appLinks" to="/bookings">
          <IconButton color="white" aria-label="menu">
            <FlightTakeoffIcon />
          </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  );
}

import React, { useEffect, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import { Link, Redirect } from "react-router-dom";
import PersonIcon from "@material-ui/icons/Person";
import PostAddIcon from "@material-ui/icons/PostAdd";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';


export default function MyAppBar() {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Link to="/home">
          <IconButton color="white" aria-label="menu">
            <HomeIcon />
          </IconButton>
        </Link>
        <Link to="/profil">
          <IconButton color="white" aria-label="menu">
            <PersonIcon />
          </IconButton>
        </Link>
        <Link to="/post">
          <IconButton color="white" aria-label="menu">
            <PostAddIcon />
          </IconButton>
        </Link>
        <Link to="/favorite">
          <IconButton color="white" aria-label="menu">
            <FavoriteIcon />
          </IconButton>
        </Link>
        <Link to="/bookings">
          <IconButton color="white" aria-label="menu">
            <FlightTakeoffIcon />
          </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  );
}

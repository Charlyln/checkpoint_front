import React, { useEffect, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import { Link, Redirect, useParams } from "react-router-dom";
import PersonIcon from "@material-ui/icons/Person";
import PostAddIcon from "@material-ui/icons/PostAdd";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";
import { useLocation } from "react-router";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";

import "./myAppBar.css";

export default function MyAppBar() {
  const page = useLocation();

  const [page2, setPage2] = useState(useLocation().pathname);

  const getPage = (e) => {
    console.log(e.target);
  };

  return (
    <AppBar className="appBar">
      <Toolbar style={{ width: "100%", padding: 0 }}>
        <Link className="appLinks" to="/home">
          <IconButton
            className={page2 === "/home" ? "appBar" : "NoappBar"}
            aria-label="menu"
            onClick={() => setPage2("/home")}
          >
            <HomeIcon />
          </IconButton>
        </Link>
        <Link className="appLinks" to="/profil">
          <IconButton
            className={page2 === "/profil" ? "appBar" : "NoappBar"}
            aria-label="menu"
            onClick={() => setPage2("/profil")}
          >
            <PersonIcon />
          </IconButton>
        </Link>
        <Link className="appLinks" to="/post">
          <IconButton
            onClick={() => setPage2("/post")}
            className={page2 === "/post" ? "appBar" : "NoappBar"}
            aria-label="menu"
          >
            <PostAddIcon />
          </IconButton>
        </Link>
        <Link className="appLinks" to="/favorite">
          <IconButton
            onClick={() => setPage2("/favorite")}
            className={page2 === "/favorite" ? "appBar" : "NoappBar"}
            aria-label="menu"
          >
            <FavoriteIcon />
          </IconButton>
        </Link>
        <Link className="appLinks" to="/bookings">
          <IconButton
            onClick={() => setPage2("/bookings")}
            className={page2 === "/bookings" ? "appBar" : "NoappBar"}
            aria-label="menu"
          >
            <FlightTakeoffIcon />
          </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  );
}

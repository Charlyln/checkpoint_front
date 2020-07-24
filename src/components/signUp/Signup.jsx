import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Axios from "axios";
import { TextField, Avatar, Button } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import { Redirect } from "react-router-dom";

import { apiUrl } from "../../apiUrl";

function SignUp() {
  const [pseudo, setPseudo] = useState("");
  const [logo, setLogo] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const getRandomAvatar = () => {
    Axios.get(`https://randomuser.me/api`).then((res) =>
      setLogo(res.data.results[0].picture.large)
    );
  };

  const Signup = async (e) => {
    e.preventDefault();
    try {
      if (logo && pseudo) {
        const res = await Axios.post(`${apiUrl}/users`, {
          pseudo,
          avatar: logo,
        });
        window.localStorage.setItem("uuid", res.data.uuid);
        setisLoading(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (window.localStorage.getItem("uuid")) {
    return <Redirect to="/home" />;
  }

  return (
    <>
      <Grid container>
        <Grid item xs={12} style={{ marginTop: "130px" }}>
          <Grid container justify="center">
            {isLoading ? "" : ""}
            {/* <input
              accept="image/*"
              style={{ display: "none" }}
              id="contained-button-file"
              type="file"
              // files={logo}
              // onChange={handleLogo}
              multiple
            />
            <label htmlFor="contained-button-file">
              <Button
                // startIcon={<CloudUploadIcon />}
                variant="outlined"
                color="primary"
                component="span"
              >
                Upload
              </Button>
            </label> */}

            <Button
              color="primary"
              variant="outlined"
              onClick={getRandomAvatar}
              startIcon={<PersonIcon />}
            >
              Random
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12} style={{ marginTop: "50px" }}>
          <Grid container alignItems="center" justify="center">
            <Avatar
              alt="Temy Sharp"
              src={logo}
              style={{ width: "70px", height: "70px" }}
            />
          </Grid>
          <Grid item xs={12} style={{ marginTop: "50px" }}>
            <Grid container alignItems="center" justify="center">
              <TextField
                style={{ margin: "20px" }}
                id="message"
                label="Pseudo"
                variant="outlined"
                autoFocus="autofocus"
                onChange={(e) => setPseudo(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} style={{ marginTop: "50px" }}>
              <Grid container alignItems="center" justify="center">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ margin: "20px" }}
                  onClick={Signup}
                >
                  Signup
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default SignUp;

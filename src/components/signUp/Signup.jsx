import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { TextField, Avatar, Button } from "@material-ui/core";

function SignUp() {
  return (
    <>
      <Grid container>
        <Grid item xs={12} style={{ marginTop: "200px" }}>
          <Grid container justify="center">
            <input
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
            </label>

            <Button
              color="primary"
              variant="outlined"
              // onClick={getAvatar}
              // startIcon={<PersonIcon />}
            >
              Random
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12} style={{ marginTop: "50px" }}>
          <Grid container alignItems="center" justify="center">
            <Avatar
              alt="Temy Sharp"
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
                // onChange={(e) => setPseudo(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} style={{ marginTop: "50px" }}>
              <Grid container alignItems="center" justify="center">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ margin: "20px" }}
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

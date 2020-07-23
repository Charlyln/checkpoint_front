import React, { useState, useEffect } from "react";
import Axios from "axios";
import { apiUrl } from "../../apiUrl";
import List from "@material-ui/core/List";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

import {
  TextField,
  Button,
  Avatar,
  Grid,
  Snackbar,
  CardHeader,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Paper,
  IconButton,
  FormControlLabel,
  Checkbox,
  Fade,
  ListItem,
} from "@material-ui/core";

function Favorites() {
  const [travels, setTravels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [UserId, setUserId] = useState("");
  const [userdata, setuserdata] = useState([]);

  useEffect(() => {
    getTravels();
    getUser();
  }, []);

  const getUser = async () => {
    const id = window.localStorage.getItem("uuid");
    try {
      const res = await Axios.get(`${apiUrl}/users/${id}`);
      setuserdata(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const putLike = async (e) => {
    const id = e.target.id;
    const likeObject = userdata.Likes.find((like) => like.TravelUuid === id);
    if (likeObject) {
      const likeId = likeObject.id;
      console.log(likeObject);

      await Axios.delete(`${apiUrl}/likes/${likeId}`);
    } else {
      await Axios.post(`${apiUrl}/likes`, {
        TravelUuid: id,
        UserUuid: UserId,
      });
    }
    getTravels();
    getUser();
  };

  const getTravels = async () => {
    try {
      const res = await Axios.get(`${apiUrl}/travels`);
      setTravels(res.data);
      setUserId(window.localStorage.getItem("uuid"));
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Grid container alignItems="center" style={{ marginTop: "70px" }}>
        <Grid container>
          <Grid item xs={12} sm={12} md={8} lg={8}>
            <Grid container alignItems="center" justify="center">
               
              {isLoading ? (
                <h1>loading</h1>
              ) : (
                <Fade in={true}>
                  <List style={{ width: "500px" }}>
                    {travels
                      .filter((message) =>
                        message.Likes.find(
                          (element) => element.UserUuid === UserId
                        )
                      )
                      .sort(function (a, b) {
                        return new Date(b.createdAt) - new Date(a.createdAt);
                      })

                      .map((travel) => (
                        <Paper elevation={5}>
                          <Card
                            style={{
                              maxWidth: "500px",
                              margin: "20px 0px",
                            }}
                          >
                            <CardHeader
                              avatar={
                                <Avatar
                                  src={travel.User.avatar}
                                  aria-label="recipe"
                                >
                                  R
                                </Avatar>
                              }
                              title={travel.pseudo}
                            />
                            <CardMedia
                              style={{ height: 0, paddingTop: "56.25%" }}
                              image={travel.imageUrl}
                              title={travel.pseudo}
                            />

                            <CardContent>
                              <Typography>{travel.content}</Typography>
                            </CardContent>
                            <CardContent>
                              <Typography>{travel.localisation}</Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    icon={<FavoriteBorder fontSize="small" />}
                                    checkedIcon={<Favorite fontSize="small" />}
                                    id={travel.uuid}
                                    onChange={putLike}
                                    checked={
                                      travel.Likes.find(
                                        (like) => like.UserUuid === UserId
                                      )
                                        ? true
                                        : false
                                    }
                                  />
                                }
                              />
                            </CardActions>
                          </Card>
                        </Paper>
                      ))}
                  </List>
                </Fade>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Favorites;

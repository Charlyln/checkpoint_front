import "date-fns";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { apiUrl } from "../../apiUrl";
import List from "@material-ui/core/List";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import CheckIcon from "@material-ui/icons/Check";
import BlockIcon from "@material-ui/icons/Block";
import {
  Button,
  Avatar,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Paper,
  FormControlLabel,
  Checkbox,
  Fade,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
} from "@material-ui/core";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

import CloseIcon from "@material-ui/icons/Close";

function Booking() {
  const [travels, setTravels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [travelsFiltered, setTravelsFiltered] = useState([]);
  const [userdata, setuserdata] = useState([]);
  const [UserId, setUserId] = useState("");

  const [bookingIdForCancel, setBookingIDForCancel] = useState("");

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

  useEffect(() => {
    const interval = setInterval(() => {
      getTravels();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

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

  const changeBooking = async (e) => {
    e.preventDefault();

    try {
      await Axios.put(`${apiUrl}/bookings/${bookingIdForCancel}`, {
        accepted: "canceled",
      });
    } catch (err) {
      console.log(err);
    }
    getTravels();
  };

  const getTravels = async () => {
    try {
      const res = await Axios.get(`${apiUrl}/travels`);
      setTravels(res.data);
      setTravelsFiltered(res.data);
      setUserId(window.localStorage.getItem("uuid"));
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const ExampleCustomInput = ({ value, onClick }) => (
    <Button
      type="submit"
      color="primary"
      variant="outlined"
      className="example-custom-input buttonItem"
      onClick={onClick}
    >
      {value}
    </Button>
  );

  return (
    <>
      <Grid container alignItems="center" className="homeContainer">
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Grid container alignItems="center" justify="center">
               {travels ? "" : ""}
              {isLoading ? (
                ""
              ) : (
                <Fade in={true}>
                  <List className="list">
                    {travelsFiltered
                      .sort(function (a, b) {
                        return new Date(b.createdAt) - new Date(a.createdAt);
                      })
                      .filter((travel) =>
                        travel.Bookings.find(
                          (element) => element.UserUuid === UserId
                        )
                      )
                      .filter((travel) => travel.UserUuid !== UserId)
                      .map((travel) => {
                        // const dates = travel.Bookings.map(
                        //   (Booking) => new Date(Booking.startDate)
                        // );
                        return (
                          <Paper elevation={5}>
                            <Card
                              style={{
                                maxWidth: "500px",
                                margin: "20px 0px",
                              }}
                            >
                              <CardMedia
                                style={{ height: 0, paddingTop: "56.25%" }}
                                image={travel.imageUrl}
                                title={travel.pseudo}
                              />

                              <CardContent>
                                <Typography>{travel.title}</Typography>
                              </CardContent>
                              <CardContent>
                                <Typography>{travel.description}</Typography>
                              </CardContent>
                              <CardContent>
                                <Typography>{travel.localisation}</Typography>
                              </CardContent>
                              <Divider />
                              <CardContent>
                                <Typography variant="h5" gutterBottom>
                                  My Books
                                </Typography>
                              </CardContent>
                              <Divider />

                              {travel.Bookings.filter(
                                (booking) => booking.UserUuid === UserId
                              )
                                .sort(function (a, b) {
                                  return (
                                    new Date(b.createdAt) -
                                    new Date(a.createdAt)
                                  );
                                })
                                .map((booking) => (
                                  <>
                                    <CardContent>
                                      <List>
                                        <ListItem
                                          style={{ width: " max-content" }}
                                        >
                                          <DatePicker
                                            selected={
                                              new Date(booking.startDate)
                                            }
                                            // onChange={(date) => setStartDate(date)}
                                            // excludeDates={dates}
                                            placeholderText="Select a date other than today or yesterday"
                                            popperPlacement="auto-left"
                                            customInput={<ExampleCustomInput />}
                                          />
                                          <DatePicker
                                            selected={new Date(booking.endDate)}
                                            // onChange={(date) => setEndDate(date)}
                                            // excludeDates={[new Date()]}
                                            placeholderText="Select a date other than today or yesterday"
                                            customInput={<ExampleCustomInput />}
                                          />
                                          <ListItemAvatar
                                            style={{ marginLeft: "5px" }}
                                          >
                                            <Avatar
                                              src={booking.User.avatar}
                                              aria-label="recipe"
                                            />
                                          </ListItemAvatar>
                                          <ListItemText
                                            primary={booking.User.pseudo}
                                          />
                                        </ListItem>
                                        <ListItem>
                                          <form onSubmit={changeBooking}>
                                            {booking.accepted ===
                                            "confirmed" ? (
                                              <>
                                                <Button
                                                  style={{
                                                    backgroundColor: "#4caf50",
                                                  }}
                                                  variant="contained"
                                                  endIcon={<CheckIcon />}
                                                  className="buttonItem"
                                                >
                                                  Confirmed
                                                </Button>
                                                <Button
                                                  type="submit"
                                                  style={{
                                                    backgroundColor: "#e91e63",
                                                  }}
                                                  variant="contained"
                                                  onClick={(e) =>
                                                    setBookingIDForCancel(
                                                      booking.uuid
                                                    )
                                                  }
                                                >
                                                  <CloseIcon />
                                                </Button>
                                              </>
                                            ) : booking.accepted ===
                                              "waiting" ? (
                                              <Button
                                                style={{
                                                  backgroundColor: "#ffc400",
                                                }}
                                                variant="contained"
                                                endIcon={<HourglassEmptyIcon />}
                                                className="buttonItem"
                                              >
                                                Waiting
                                              </Button>
                                            ) : booking.accepted ===
                                              "refused" ? (
                                              <Button
                                                style={{
                                                  backgroundColor: "#ef6c00",
                                                }}
                                                variant="contained"
                                                endIcon={<BlockIcon />}
                                                className="buttonItem"
                                              >
                                                Refused
                                              </Button>
                                            ) : (
                                              <Button
                                                style={{
                                                  backgroundColor: "#757575",
                                                }}
                                                variant="contained"
                                                endIcon={<CloseIcon />}
                                                className="buttonItem"
                                              >
                                                Canceled
                                              </Button>
                                            )}
                                          </form>
                                        </ListItem>
                                      </List>
                                    </CardContent>

                                    <Divider />
                                  </>
                                ))}

                              <CardActions disableSpacing>
                                <ListItem>
                                  <ListItemAvatar>
                                    <Avatar
                                      src={travel.User.avatar}
                                      aria-label="recipe"
                                    />
                                  </ListItemAvatar>
                                  <ListItemText
                                    primary={`Post by ${travel.User.pseudo}`}
                                  />
                                </ListItem>
                                <FormControlLabel
                                  style={{ marginLeft: "auto" }}
                                  control={
                                    <Checkbox
                                      icon={<FavoriteBorder />}
                                      checkedIcon={<Favorite />}
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
                        );
                      })}
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

export default Booking;

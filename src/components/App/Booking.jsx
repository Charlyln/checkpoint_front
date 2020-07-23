import "date-fns";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { apiUrl } from "../../apiUrl";
import List from "@material-ui/core/List";
import DateFnsUtils from "@date-io/date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import CheckIcon from "@material-ui/icons/Check";

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
  ListItemAvatar,
  ListItemText,
  Divider,
} from "@material-ui/core";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import CloseIcon from "@material-ui/icons/Close";

function Booking() {
  const [travels, setTravels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [city, setCity] = useState("");
  const [travelsFiltered, setTravelsFiltered] = useState([]);
  const [userdata, setuserdata] = useState([]);
  const [UserId, setUserId] = useState("");
  // const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState(new Date());
  const [travelId, setTravelId] = useState("");
  const [startDate, setStartDate] = useState(new Date());

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
  // const search = (e) => {
  //   e.preventDefault();

  //   const arrayFiltered2 = travels.filter(
  //     (travel) => travel.localisation === city
  //   );
  //   setTravelsFiltered(arrayFiltered2);
  // };

  // const sendBooking = async (e) => {
  //   e.preventDefault();

  //   try {
  //     if (startDate && endDate) {
  //       const UserUuid = window.localStorage.getItem("uuid");

  //       const res = await Axios.post(`${apiUrl}/bookings`, {
  //         TravelUuid: travelId,
  //         UserUuid,
  //         startDate,
  //         endDate,
  //       });
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const ExampleCustomInput = ({ value, onClick }) => (
    <Button
      type="submit"
      color="primary"
      variant="outlined"
      className="example-custom-input"
      onClick={onClick}
    >
      {value}
    </Button>
  );

  // const isWeekday = () => {
  //   const day = new Date();
  //   return day !== 0 && day !== 6;
  // };

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
                        const dates = travel.Bookings.map(
                          (Booking) => new Date(Booking.startDate)
                        );
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

                              {travel.Bookings.filter(
                                (booking) => booking.UserUuid === UserId
                              ).map((booking) => (
                                <>
                                  <CardContent>
                                    <List>
                                      <ListItem
                                        style={{ width: " max-content" }}
                                      >
                                        <ListItemAvatar>
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
                                        <CardContent style={{ padding: "2px" }}>
                                          <DatePicker
                                            selected={
                                              new Date(
                                                travel.Bookings[0].startDate
                                              )
                                            }
                                            // onChange={(date) => setStartDate(date)}
                                            // excludeDates={dates}
                                            placeholderText="Select a date other than today or yesterday"
                                            popperPlacement="auto-left"
                                            customInput={<ExampleCustomInput />}
                                          />
                                        </CardContent>
                                        <CardContent style={{ padding: "2px" }}>
                                          <DatePicker
                                            selected={
                                              new Date(
                                                travel.Bookings[0].endDate
                                              )
                                            }
                                            // onChange={(date) => setEndDate(date)}
                                            // excludeDates={[new Date()]}
                                            placeholderText="Select a date other than today or yesterday"
                                            customInput={<ExampleCustomInput />}
                                          />
                                        </CardContent>
                                        <CardContent style={{ padding: "2px" }}>
                                          <form>
                                            {booking.accepted ===
                                            "confirmed" ? (
                                              <Button
                                                type="submit"
                                                style={{
                                                  backgroundColor: "#4caf50",
                                                }}
                                                variant="contained"
                                                endIcon={<CheckIcon />}
                                              >
                                                Confirmed
                                              </Button>
                                            ) : booking.accepted ===
                                              "waiting" ? (
                                              <Button
                                                style={{
                                                  backgroundColor: "#ffc400",
                                                }}
                                                variant="contained"
                                                endIcon={<HourglassEmptyIcon />}
                                              >
                                                Waiting
                                              </Button>
                                            ) : (
                                              <Button
                                                style={{
                                                  backgroundColor: "#e91e63",
                                                }}
                                                variant="contained"
                                                endIcon={<CloseIcon />}
                                              >
                                                Canceled
                                              </Button>
                                            )}
                                          </form>
                                        </CardContent>
                                      </ListItem>
                                    </List>
                                  </CardContent>

                                  <Divider />
                                </>
                              ))}

                              {/* <CardContent>
                                <List>
                                  <ListItem>
                                    <CardContent style={{ padding: "2px" }}>
                                      <DatePicker
                                        selected={
                                          new Date(travel.Bookings[0].startDate)
                                        }
                                        onChange={(date) => setStartDate(date)}
                                        excludeDates={dates}
                                        placeholderText="Select a date other than today or yesterday"
                                        popperPlacement="auto-left"
                                        customInput={<ExampleCustomInput />}
                                      />
                                    </CardContent>
                                    <CardContent style={{ padding: "2px" }}>
                                      <DatePicker
                                        selected={
                                          new Date(travel.Bookings[0].endDate)
                                        }
                                        onChange={(date) => setEndDate(date)}
                                        excludeDates={[new Date()]}
                                        placeholderText="Select a date other than today or yesterday"
                                        customInput={<ExampleCustomInput />}
                                      />
                                    </CardContent>
                                    <CardContent style={{ padding: "2px" }}>
                                      {travel.Bookings[0].accepted ? (
                                        <Button
                                          type="submit"
                                          style={{ backgroundColor: "#4caf50" }}
                                          variant="contained"
                                          endIcon={<CheckIcon />}
                                        >
                                          Confirmed
                                        </Button>
                                      ) : (
                                        <Button
                                          type="submit"
                                          style={{ backgroundColor: "#ffc400" }}
                                          variant="contained"
                                          endIcon={<HourglassEmptyIcon />}
                                        >
                                          Waiting
                                        </Button>
                                      )}
                                    </CardContent>
                                  </ListItem>
                                </List>
                              </CardContent> */}

                              <CardActions disableSpacing>
                                <FormControlLabel
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
                                <ListItem style={{ marginLeft: "50%" }}>
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

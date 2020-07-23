import React, { useState, useEffect } from "react";
import Axios from "axios";
import {
  TextField,
  Avatar,
  Button,
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
  List,
  ListItem,
  Divider,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import { Redirect } from "react-router-dom";
import DatePicker from "react-datepicker";
import SendIcon from "@material-ui/icons/Send";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";

import { apiUrl } from "../../apiUrl";

function Profil() {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [myTravels, setMyTravels] = useState([]);
  const [bookingId, setBookingID] = useState("");
  const [bookingIdForCancel, setBookingIDForCancel] = useState("");

  useEffect(() => {
    getUserData();
    getMyTravels();
    setIsLoading(false);
  }, []);

  const getMyTravels = async () => {
    try {
      const UserUuid = window.localStorage.getItem("uuid");
      const res = await Axios.get(`${apiUrl}/travels/${UserUuid}`);
      setMyTravels(res.data);
    } catch (err) {
      console.log(err);
    }
  };

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

  const getUserData = async () => {
    try {
      const id = window.localStorage.getItem("uuid");
      const res = await Axios.get(`${apiUrl}/users/${id}`);
      setUserData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getMyTravels();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const changeBooking = async (e) => {
    e.preventDefault();

    try {
      if (bookingIdForCancel) {
        await Axios.put(`${apiUrl}/bookings/${bookingIdForCancel}`, {
          accepted: "canceled",
        });
      } else if (bookingId) {
        await Axios.put(`${apiUrl}/bookings/${bookingId}`, {
          accepted: "confirmed",
        });
      }
    } catch (err) {
      console.log(err);
    }
    getMyTravels();
    getUserData();
  };

  return (
    <>
      {isLoading ? (
        <h1>coucou</h1>
      ) : (
        <Grid container alignItems="center" style={{ marginTop: "70px" }}>
          <Grid container>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <Grid container alignItems="center" justify="center">
                <ListItem>
                  <ListItemAvatar>
                    <Avatar src={userData.avatar} aria-label="recipe" />
                  </ListItemAvatar>
                  <ListItemText primary={userData.pseudo} />
                </ListItem>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={12} md={8} lg={8}>
              <Grid container alignItems="center" justify="center">
                <List style={{ width: "500px" }}>
                  {myTravels.map((travel) => (
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
                          <Typography gutterBottom>{travel.title}</Typography>
                        </CardContent>
                        <CardContent>
                          {travel.Bookings.length === 0 ? (
                            <Button color="primary" variant="outlined">
                              You don't have bookings yet
                            </Button>
                          ) : (
                            <Typography variant="h5" gutterBottom>
                              Bookings
                            </Typography>
                          )}
                        </CardContent>
                        <Divider />
                        {travel.Bookings.map((booking) => (
                          <>
                            <CardContent>
                              <List>
                                <ListItem style={{ width: " max-content" }}>
                                  <ListItemAvatar>
                                    <Avatar
                                      src={booking.User.avatar}
                                      aria-label="recipe"
                                    />
                                  </ListItemAvatar>
                                  <ListItemText primary={booking.User.pseudo} />
                                </ListItem>
                                <ListItem>
                                  <CardContent style={{ padding: "2px" }}>
                                    <DatePicker
                                      selected={new Date(booking.startDate)}
                                      // onChange={(date) => setStartDate(date)}
                                      // excludeDates={dates}
                                      placeholderText="Select a date other than today or yesterday"
                                      popperPlacement="auto-left"
                                      customInput={<ExampleCustomInput />}
                                    />
                                  </CardContent>
                                  <CardContent style={{ padding: "2px" }}>
                                    <DatePicker
                                      selected={new Date(booking.endDate)}
                                      // onChange={(date) => setEndDate(date)}
                                      // excludeDates={[new Date()]}
                                      placeholderText="Select a date other than today or yesterday"
                                      customInput={<ExampleCustomInput />}
                                    />
                                  </CardContent>
                                  <CardContent style={{ padding: "2px" }}>
                                    <form onSubmit={changeBooking}>
                                      {booking.accepted === "confirmed" ? (
                                        <>
                                          <Button
                                            type="submit"
                                            style={{
                                              backgroundColor: "#4caf50",
                                            }}
                                            variant="contained"
                                            endIcon={<CheckIcon />}
                                          >
                                            You Confirmed
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
                                      ) : booking.accepted === "waiting" ? (
                                        <Button
                                          type="submit"
                                          color="primary"
                                          variant="contained"
                                          endIcon={<SendIcon />}
                                          onClick={(e) =>
                                            setBookingID(booking.uuid)
                                          }
                                        >
                                          Accept
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
                      </Card>
                    </Paper>
                  ))}
                </List>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default Profil;

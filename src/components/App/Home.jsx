import "date-fns";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { apiUrl } from "../../apiUrl";
import List from "@material-ui/core/List";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  TextField,
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
  CircularProgress,
} from "@material-ui/core";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import SearchIcon from "@material-ui/icons/Search";
import CheckIcon from "@material-ui/icons/Check";

import "./home.css";

function Home() {
  const [travels, setTravels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [city, setCity] = useState("");
  const [travelsFiltered, setTravelsFiltered] = useState([]);
  const [userdata, setuserdata] = useState([]);
  const [UserId, setUserId] = useState("");
  const [endDate, setEndDate] = useState(new Date());
  const [travelId, setTravelId] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [isReset, setIsRest] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [fade, setFade] = useState(true);
  const [citySearch, setCitySearch] = useState("");

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
      setTravelsFiltered(res.data);
      setUserId(window.localStorage.getItem("uuid"));
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    } catch (err) {
      console.log(err);
    }
  };
  const search = (e) => {
    e.preventDefault();
    if (city) {
      setIsSearching(true);
      setIsLoading(true);
      setFade(false);

      const timer = setTimeout(() => {
        const arrayFiltered2 = travels.filter((travel) =>
          travel.localisation.toLowerCase().includes(city.toLowerCase())
        );
        setCitySearch(city);
        setFade(true);
        setTravelsFiltered(arrayFiltered2);
        setCity("");
        setIsSearching(false);
        setIsLoading(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  };

  const reset = () => {
    setIsRest(true);
    setFade(false);

    const timer = setTimeout(() => {
      setTravelsFiltered(travels);
      setFade(true);
      getTravels();
      setCitySearch("");
      setCity("");
      setIsRest(false);
    }, 1000);

    return () => clearTimeout(timer);
  };
  const sendBooking = async (e) => {
    e.preventDefault();

    try {
      if (startDate && endDate) {
        const UserUuid = window.localStorage.getItem("uuid");

        await Axios.post(`${apiUrl}/bookings`, {
          TravelUuid: travelId,
          UserUuid,
          startDate,
          endDate,
          accepted: "waiting",
        });
      }
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

  return (
    <>
      <Grid container alignItems="center" className="homeContainer">
        <Grid container>
          <Grid item xs={12} sm={12} md={4} lg={3}>
            <Grid
              container
              alignItems="center"
              justify="center"
              className="column1"
            >
              <form noValidate autoComplete="off" onSubmit={search}>
                <List>
                  <ListItem>
                    <TextField
                      id="outlined-basic"
                      label="Where do you go ?"
                      value={city}
                      variant="outlined"
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </ListItem>
                  <ListItem>
                    {isSearching || isLoading ? (
                      <Button
                        type="submit"
                        color="primary"
                        variant="outlined"
                        endIcon={<CircularProgress size={20} />}
                      >
                        Search
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        color="primary"
                        variant="outlined"
                        endIcon={<SearchIcon />}
                      >
                        Search
                      </Button>
                    )}

                    {isReset ? (
                      <Button
                        color="primary"
                        variant="outlined"
                        endIcon={<CircularProgress size={20} />}
                        style={{ marginLeft: "8px" }}
                        onClick={reset}
                      >
                        Reset
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        color="primary"
                        variant="outlined"
                        endIcon={<RotateLeftIcon />}
                        style={{ marginLeft: "8px" }}
                        onClick={reset}
                      >
                        Reset
                      </Button>
                    )}
                  </ListItem>
                </List>
              </form>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={9}>
            <Grid container alignItems="center" justify="center">
               
              {isLoading ? (
                ""
              ) : (
                <Fade in={fade} timeout={400}>
                  <List className="list">
                    {travelsFiltered
                      .sort(function (a, b) {
                        return new Date(b.createdAt) - new Date(a.createdAt);
                      })
                      .filter((travel) => {
                        if (citySearch) {
                          return travel.localisation
                            .toLowerCase()
                            .includes(citySearch.toLowerCase());
                        } else {
                          return travel;
                        }
                      })
                      .map((travel) => {
                        const dates = travel.Bookings.map(
                          (Booking) => new Date(Booking.startDate)
                        );
                        return (
                          <Paper elevation={5}>
                            <Card className="card">
                              <CardMedia
                                style={{ height: 0, paddingTop: "56.25%" }}
                                image={travel.imageUrl}
                                title={travel.pseudo}
                              />

                              <CardContent>
                                <Typography variant="h5">
                                  {travel.title}
                                </Typography>
                              </CardContent>
                              <CardContent>
                                <Typography>{travel.localisation}</Typography>
                              </CardContent>
                              <CardContent>
                                <Typography>{travel.description}</Typography>
                              </CardContent>

                              {travel.UserUuid === UserId ? (
                                ""
                              ) : (
                                <CardContent>
                                  <List>
                                    <ListItem>
                                      <CardContent style={{ padding: "2px" }}>
                                        <DatePicker
                                          selected={startDate}
                                          onChange={(date) =>
                                            setStartDate(date)
                                          }
                                          excludeDates={dates}
                                          placeholderText="Select a date other than today or yesterday"
                                          customInput={<ExampleCustomInput />}
                                          popperPlacement="top-right"
                                        />
                                      </CardContent>
                                      <CardContent style={{ padding: "2px" }}>
                                        <DatePicker
                                          selected={endDate}
                                          onChange={(date) => setEndDate(date)}
                                          excludeDates={[new Date()]}
                                          placeholderText="Select a date other than today or yesterday"
                                          customInput={<ExampleCustomInput />}
                                          popperPlacement="top-right"
                                        />
                                      </CardContent>
                                      <CardContent style={{ padding: "2px" }}>
                                        <form onSubmit={sendBooking}>
                                          {travelId === travel.uuid ? (
                                            <Button
                                              type="submit"
                                              style={{
                                                backgroundColor: "#4caf50",
                                              }}
                                              variant="contained"
                                              endIcon={<CheckIcon />}
                                            >
                                              Sent
                                            </Button>
                                          ) : (
                                            <Button
                                              type="submit"
                                              color="primary"
                                              variant="contained"
                                              onClick={() =>
                                                setTravelId(travel.uuid)
                                              }
                                            >
                                              {travel.Bookings.find(
                                                (booking) =>
                                                  booking.UserUuid === UserId
                                              )
                                                ? "Re book"
                                                : "Book"}
                                            </Button>
                                          )}
                                        </form>
                                      </CardContent>
                                    </ListItem>
                                  </List>
                                </CardContent>
                              )}

                              <CardActions
                                disableSpacing
                                style={{ marginLeft: "5px" }}
                              >
                                <ListItem>
                                  <ListItemAvatar>
                                    <Avatar
                                      src={travel.User.avatar}
                                      aria-label="recipe"
                                    />
                                  </ListItemAvatar>

                                  {travel.UserUuid === UserId ? (
                                    <ListItemText primary={`Post by Me`} />
                                  ) : (
                                    <ListItemText
                                      primary={`Post by ${travel.User.pseudo}`}
                                    />
                                  )}
                                </ListItem>

                                {travel.UserUuid === UserId ? (
                                  ""
                                ) : (
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
                                )}
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

export default Home;

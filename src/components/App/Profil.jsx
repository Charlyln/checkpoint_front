import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import {
  Avatar,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Paper,
  List,
  ListItem,
  Divider,
  ListItemAvatar,
  ListItemText,
  Fade,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Snackbar,
  CardActions
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

import Alert from '@material-ui/lab/Alert'
import DatePicker from 'react-datepicker'
import SendIcon from '@material-ui/icons/Send'
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'
import BlockIcon from '@material-ui/icons/Block'
import ClearIcon from '@material-ui/icons/Clear'

import { apiUrl } from '../../apiUrl'
import './profil.css'
import MyAppBar from '../signUp/appBar/MyAppBar'
import { Redirect } from 'react-router-dom'

function Profil() {
  const [userData, setUserData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [myTravels, setMyTravels] = useState([])
  const [bookingId, setBookingID] = useState('')
  const [bookingIdForCancel, setBookingIDForCancel] = useState('')
  const [bookingIdForRefuse, setBookingIDForRefuse] = useState('')
  const [open, setOpen] = useState(false)
  const [openDeletePost, setOpenDeletePost] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }
  const handleOpen = () => {
    setOpen(true)
  }

  const handleCloseDeletePost = () => {
    setOpenDeletePost(false)
  }
  const handleOpenDeletePost = () => {
    setOpenDeletePost(true)
  }

  const deletePost = async (uuid) => {
    await Axios.delete(`${apiUrl}/travels/${uuid}`)
    getMyTravels()
    handleOpenDeletePost()
  }

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
  )

  useEffect(() => {
    getUserData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getMyTravels = async () => {
    try {
      const UserUuid = window.localStorage.getItem('uuid')
      const res = await Axios.get(`${apiUrl}/travels/${UserUuid}`)
      setMyTravels(res.data)
      setIsLoading(false)
    } catch (err) {
      console.log(err)
    }
  }
  const getUserData = async () => {
    try {
      const id = window.localStorage.getItem('uuid')
      const res = await Axios.get(`${apiUrl}/users/${id}`)
      setUserData(res.data)
      getMyTravels()
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      getMyTravels()
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const changeBooking = async (e) => {
    e.preventDefault()

    try {
      if (bookingIdForRefuse) {
        await Axios.put(`${apiUrl}/bookings/${bookingIdForRefuse}`, {
          accepted: 'refused'
        })
      } else if (bookingIdForCancel) {
        await Axios.put(`${apiUrl}/bookings/${bookingIdForCancel}`, {
          accepted: 'canceled'
        })
      } else if (bookingId) {
        await Axios.put(`${apiUrl}/bookings/${bookingId}`, {
          accepted: 'confirmed'
        })
      }
    } catch (err) {
      console.log(err)
    }
    getMyTravels()
    getUserData()
    setBookingID('')
    setBookingIDForCancel('')
    setBookingIDForRefuse('')
  }

  const deleteUser = async () => {
    const uuid = window.localStorage.getItem('uuid')
    await Axios.delete(`${apiUrl}/users/${uuid}`)
    window.localStorage.removeItem('uuid')
    setUserData('')
  }

  if (!window.localStorage.getItem('uuid')) {
    return <Redirect to="/" />
  }

  return (
    <>
      <MyAppBar />
      {isLoading ? (
        ''
      ) : (
        <>
          <Grid container alignItems="center" className="homeContainer">
            <Grid container>
              <Grid item xs={12} sm={12} md={4} lg={3}>
                <Grid
                  container
                  alignItems="center"
                  justify="center"
                  style={{ marginTop: '15px' }}
                >
                  <ListItem>
                    <Fade in={true}>
                      <ListItemAvatar>
                        <Avatar
                          src={isLoading ? '' : userData.avatar}
                          aria-label="recipe"
                        />
                      </ListItemAvatar>
                    </Fade>
                    <ListItemText primary={userData.pseudo} />
                  </ListItem>
                  <ListItem>
                    <Button
                      size="small"
                      variant="contained"
                      color="secondary"
                      endIcon={<ClearIcon />}
                      onClick={handleOpen}
                    >
                      Delete my profil
                    </Button>
                  </ListItem>
                </Grid>
              </Grid>

              <Snackbar
                open={openDeletePost}
                autoHideDuration={3000}
                onClose={handleCloseDeletePost}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <Alert
                  onClose={handleCloseDeletePost}
                  severity="success"
                  variant="filled"
                >
                  Travel deleted !
                </Alert>
              </Snackbar>

              <Dialog
                open={open}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                maxWidth="sm"
                fullWidth
              >
                <DialogTitle
                  id="alert-dialog-slide-title"
                  style={{ alignSelf: 'center' }}
                >
                  {'Do you want delete your profil ?'}
                </DialogTitle>
                <DialogContent style={{ alignSelf: 'center' }}>
                  <DialogContentText id="alert-dialog-description">
                    ( All your travels and your bookings will be deleted too )
                  </DialogContentText>
                </DialogContent>

                <DialogContent style={{ alignSelf: 'center' }}>
                  <Button color="primary" onClick={handleClose}>
                    Back
                  </Button>
                  <Button
                    style={{ marginLeft: '30px' }}
                    variant="contained"
                    color="secondary"
                    endIcon={<ClearIcon />}
                    onClick={deleteUser}
                  >
                    I confirme
                  </Button>
                </DialogContent>
              </Dialog>

              <Grid item xs={12} sm={12} md={8} lg={9}>
                <Grid container alignItems="center" justify="center">
                  <List className="list">
                    {myTravels && myTravels.length === 0 ? (
                      <Alert severity="info" style={{ marginTop: '30px' }}>
                        You haven't posted any trip yet.
                      </Alert>
                    ) : (
                      ''
                    )}
                    {myTravels
                      .sort(function (a, b) {
                        return new Date(b.createdAt) - new Date(a.createdAt)
                      })
                      .map((travel) => (
                        <Paper elevation={5}>
                          <Card
                            style={{
                              maxWidth: '500px',
                              margin: '20px 0px'
                            }}
                          >
                            <CardMedia
                              style={{ height: 0, paddingTop: '56.25%' }}
                              image={travel.imageUrl}
                              title={travel.pseudo}
                            />
                            <CardContent>
                              <Typography gutterBottom>
                                {travel.title}
                              </Typography>
                            </CardContent>

                            <CardContent>
                              <Typography>{travel.localisation}</Typography>
                            </CardContent>
                            <CardContent>
                              <Typography>{travel.description}</Typography>
                            </CardContent>

                            <CardActions>
                              <IconButton
                                color="secondary"
                                style={{ marginLeft: 'auto' }}
                                onClick={() => deletePost(travel.uuid)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </CardActions>
                            <Divider />
                            <CardContent>
                              {travel.Bookings.length === 0 ? (
                                <Alert
                                  severity="info"
                                  style={{ marginTop: '30px' }}
                                >
                                  You don't have any bookings on this trip yet.
                                </Alert>
                              ) : (
                                <Typography variant="h5" gutterBottom>
                                  Bookings
                                </Typography>
                              )}
                            </CardContent>

                            <Divider />
                            {travel.Bookings.sort(function (a, b) {
                              return (
                                new Date(b.createdAt) - new Date(a.createdAt)
                              )
                            }).map((booking) => (
                              <>
                                <CardContent>
                                  <List>
                                    <ListItem style={{ width: ' max-content' }}>
                                      <DatePicker
                                        disabled
                                        selected={new Date(booking.startDate)}
                                        // onChange={(date) => setStartDate(date)}
                                        // excludeDates={dates}
                                        placeholderText="Select a date other than today or yesterday"
                                        popperPlacement="auto-left"
                                        customInput={<ExampleCustomInput />}
                                      />

                                      <DatePicker
                                        disabled
                                        selected={new Date(booking.endDate)}
                                        // onChange={(date) => setEndDate(date)}
                                        // excludeDates={[new Date()]}
                                        placeholderText="Select a date other than today or yesterday"
                                        customInput={<ExampleCustomInput />}
                                      />

                                      <ListItemAvatar
                                        style={{ marginLeft: '5px' }}
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
                                        {booking.accepted === 'confirmed' ? (
                                          <>
                                            <Button
                                              type="submit"
                                              style={{
                                                backgroundColor: '#4caf50'
                                              }}
                                              variant="contained"
                                              endIcon={<CheckIcon />}
                                              className="buttonItem"
                                            >
                                              You Confirmed
                                            </Button>
                                            <Button
                                              type="submit"
                                              style={{
                                                backgroundColor: '#e91e63'
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
                                        ) : booking.accepted === 'waiting' ? (
                                          <>
                                            <Button
                                              type="submit"
                                              color="primary"
                                              variant="contained"
                                              className="buttonItem"
                                              endIcon={<SendIcon />}
                                              onClick={(e) =>
                                                setBookingID(booking.uuid)
                                              }
                                            >
                                              Accept
                                            </Button>
                                            <Button
                                              type="submit"
                                              style={{
                                                backgroundColor: '#ef6c00'
                                              }}
                                              variant="contained"
                                              endIcon={<BlockIcon />}
                                              onClick={(e) =>
                                                setBookingIDForRefuse(
                                                  booking.uuid
                                                )
                                              }
                                            >
                                              Refuse
                                            </Button>
                                          </>
                                        ) : booking.accepted === 'refused' ? (
                                          <Button
                                            style={{
                                              backgroundColor: '#ef6c00'
                                            }}
                                            variant="contained"
                                            endIcon={<BlockIcon />}
                                            className="buttonItem"
                                          >
                                            You refuse
                                          </Button>
                                        ) : (
                                          <Button
                                            style={{
                                              backgroundColor: '#757575'
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
                          </Card>
                        </Paper>
                      ))}
                  </List>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </>
  )
}

export default Profil

import React, { useState } from 'react'
import {
  Grid,
  Button,
  ListItem,
  List,
  TextField,
  DialogTitle,
  Dialog,
  DialogContent,
  Typography,
  DialogActions,
  Paper,
  CardMedia,
  CircularProgress
} from '@material-ui/core'
import Axios from 'axios'
import { apiUrl } from '../../apiUrl'
import PhotoIcon from '@material-ui/icons/Photo'
import CheckIcon from '@material-ui/icons/Check'
import MyAppBar from '../signUp/appBar/MyAppBar'
import { Redirect } from 'react-router-dom'

const Post = () => {
  const [title, setTitle] = useState('')
  const [photo, setPhoto] = useState('')
  const [imageCard, setImageCard] = useState('')
  const [localisation, setLocalisation] = useState('')
  const [description, setDescrition] = useState('')
  const [postLoading, setPostLoading] = useState(false)
  const [postSuccess, setPostSuccess] = useState(false)

  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleLogo = (e) => {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0])
      setImageCard(URL.createObjectURL(e.target.files[0]))
    }
  }

  const sendPost = async (e) => {
    e.preventDefault()
    setPostLoading(true)

    try {
      if (photo && title && localisation && description) {
        const imgurToken = '44670bbff769f1a'
        const UserId = window.localStorage.getItem('uuid')

        const res = await Axios.post('https://api.imgur.com/3/image', photo, {
          headers: {
            Authorization: `Client-ID ${imgurToken}`
          }
        })
        await Axios.post(`${apiUrl}/travels`, {
          UserUuid: UserId,
          imageUrl: res.data.data.link,
          localisation,
          description,
          title
        })
      }

      const timer = setTimeout(() => {
        setPostLoading(false)
      }, 1000)
      setPostSuccess(true)

      const timer3 = setTimeout(() => {
        setOpen(false)
        setTitle('')
        setPhoto('')
        setImageCard('')
        setLocalisation('')
        setDescrition('')
        setPostSuccess(false)
      }, 3000)

      return () => clearTimeout(timer3, timer)
    } catch (err) {
      console.log(err)
    }
  }

  if (!window.localStorage.getItem('uuid')) {
    return <Redirect to="/" />
  }

  return (
    <>
      <MyAppBar />

      <Grid container justify="center">
        <Grid item lg={6} style={{ marginTop: '150px' }}>
          <Grid container justify="center">
            <List>
              <ListItem>
                <TextField
                  id="outlined-multiline-flexible"
                  label="Title"
                  multiline
                  value={title}
                  rowsMax={4}
                  variant="outlined"
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </ListItem>
              <ListItem>
                <TextField
                  id="outlined-multiline-flexible"
                  label="Localisation"
                  value={localisation}
                  multiline
                  rowsMax={4}
                  variant="outlined"
                  onChange={(e) => setLocalisation(e.target.value)}
                  required
                />
              </ListItem>
              <ListItem>
                <TextField
                  id="outlined-multiline-static"
                  label="Description"
                  value={description}
                  multiline
                  rows={4}
                  variant="outlined"
                  onChange={(e) => setDescrition(e.target.value)}
                  required
                />
              </ListItem>
              <ListItem>
                <input
                  accept="image/*"
                  id="icon-button-file"
                  type="file"
                  style={{ display: 'none' }}
                  files={photo}
                  onChange={handleLogo}
                />

                <label htmlFor="icon-button-file">
                  <Button
                    variant="outlined"
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <PhotoIcon />
                  </Button>
                </label>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={handleClickOpen}
                  style={{ marginLeft: '15px' }}
                >
                  Preview
                </Button>
              </ListItem>
            </List>

            <Dialog
              onClose={handleClose}
              aria-labelledby="customized-dialog-title"
              open={open}
              maxWidth="sm"
              fullWidth
            >
              <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                {title}
              </DialogTitle>
              <DialogContent dividers>
                <Typography gutterBottom>{localisation}</Typography>
              </DialogContent>
              <DialogContent dividers>
                <Typography gutterBottom>{description}</Typography>
              </DialogContent>
              <DialogContent>
                <Paper elevation={5}>
                  <CardMedia
                    style={{ height: 0, paddingTop: '56.25%' }}
                    image={imageCard}
                    title="Photo"
                  />
                </Paper>
              </DialogContent>
              <DialogActions style={{ alignSelf: 'center' }}>
                {postLoading ? (
                  <Button
                    style={{
                      width: '85px',
                      height: '35px'
                    }}
                    autoFocus
                    variant="contained"
                    color="primary"
                    disabled={postLoading}
                  >
                    <CircularProgress size={23} />
                  </Button>
                ) : postSuccess ? (
                  <Button
                    style={{
                      backgroundColor: '#4caf50',
                      width: '85px',
                      height: '35px'
                    }}
                    variant="contained"
                    endIcon={<CheckIcon />}
                  >
                    Done
                  </Button>
                ) : (
                  <Button
                    style={{
                      width: '85px',
                      height: '35px'
                    }}
                    autoFocus
                    onClick={sendPost}
                    variant="contained"
                    color="primary"
                    disabled={!title || !photo || !localisation || !description}
                  >
                    Post
                  </Button>
                )}
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default Post

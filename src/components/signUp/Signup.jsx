import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Axios from 'axios'
import {
  TextField,
  Avatar,
  Button,
  CircularProgress,
  AppBar,
  Toolbar,
  Typography
} from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person'
import { Redirect } from 'react-router-dom'
import CheckIcon from '@material-ui/icons/Check'

import { apiUrl } from '../../apiUrl'

function SignUp() {
  const [pseudo, setPseudo] = useState('')
  const [logo, setLogo] = useState('')
  const [postLoading, setPostLoading] = useState(false)
  const [postSuccess, setPostSuccess] = useState(false)
  const [redirect, setRedirect] = useState(window.localStorage.getItem('uuid'))

  const getRandomAvatar = () => {
    Axios.get(`https://randomuser.me/api`).then((res) =>
      setLogo(res.data.results[0].picture.large)
    )
  }

  const SignupPost = async (e) => {
    e.preventDefault()
    setPostLoading(true)
    try {
      if (logo && pseudo) {
        const res = await Axios.post(`${apiUrl}/users`, {
          pseudo,
          avatar: logo
        })
        window.localStorage.setItem('uuid', res.data.uuid)
        const timer = setTimeout(() => {
          setPostLoading(false)
        }, 1000)
        setPostSuccess(true)

        const timer3 = setTimeout(() => {
          setPostSuccess(false)
          setRedirect(true)
        }, 3000)

        return () => clearTimeout(timer3, timer)
      }
    } catch (err) {
      console.log(err)
    }
  }

  if (redirect) {
    return <Redirect to="/home" />
  }

  return (
    <>
      <AppBar className="appBar">
        <Toolbar style={{ width: '100%', padding: 0 }}></Toolbar>
      </AppBar>
      <Grid container>
        <Grid item xs={12} style={{ marginTop: '100px', textAlign: 'center' }}>
          <Typography variant="button" gutterBottom>
            1. Select your avatar
          </Typography>
          <Grid container justify="center" style={{ marginTop: '20px' }}>
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
        <Grid item xs={12} style={{ marginTop: '50px' }}>
          <Grid container alignItems="center" justify="center">
            <Avatar
              alt="Temy Sharp"
              src={logo}
              style={{ width: '70px', height: '70px' }}
            />
          </Grid>
          <Grid item xs={12} style={{ marginTop: '50px', textAlign: 'center' }}>
            <Typography variant="button" gutterBottom>
              2. Provide your pseudo
            </Typography>
            <Grid container alignItems="center" justify="center">
              <TextField
                style={{ margin: '20px' }}
                id="message"
                label="Pseudo"
                variant="outlined"
                onChange={(e) => setPseudo(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} style={{ marginTop: '50px' }}>
              <Grid container alignItems="center" justify="center">
                {/* <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ margin: "20px" }}
                  onClick={Signup}
                >
                  Signup
                </Button> */}

                {postLoading ? (
                  <Button
                    style={{
                      width: '85px',
                      height: '35px'
                    }}
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
                    type="submit"
                    style={{
                      width: '85px',
                      height: '35px'
                    }}
                    onClick={SignupPost}
                    variant="contained"
                    color="primary"
                    disabled={!pseudo || !logo}
                  >
                    Signup
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default SignUp

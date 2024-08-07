import { Box, Button, CircularProgress, FormHelperText, Grid, IconButton, InputAdornment, Paper, Snackbar, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import LoginImg from '../images/Visitor-login.png'
// import LoginLogoImg from '../images/loginLogo.png'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { login } from '../../actions/actions';
// import constants from '../config/constants';
// import { LoginReducer } from '../Reducers/LoginReducer';

const Login = () => {
  const [userName, setUserName] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState('');
  const [isMessage, setIsMessage] = React.useState(null);
  const [passwordVisibility, setPasswordVisibility] = React.useState(false);
  const dispatch = useDispatch();
  const { handleSubmit } = useForm({});
  const navigate = useNavigate();

  const handleEmail = (e) => {
    setUserName(e.target.value)
    setHelperText(' ');
    setIsMessage(null);
    setError(false);
  }

  const handelePassword = (e) => {
    setPassword(e.target.value)
    setHelperText(' ');
    setIsMessage(null);
    setError(false);
  }

  const handlePasswordVisibility = () => {
    passwordVisibility === true ?
      setPasswordVisibility(false)
      :
      setPasswordVisibility(true)
  };

  const loginUser = useSelector(state => state.employee.loginUser)

  const [shouldShowMsg, setShouldShowMsg] = useState(false);
  useEffect(() => {

    if (shouldShowMsg) {
      if (loginUser !== null) {
        setHelperText(loginUser);
        setShouldShowMsg(false);
        dispatch({ type: 'RESET_MESSAGE' }); // Dispatch an action to reset the message
      }
    }
   

    if (loginUser?.userInfo) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }, [loginUser, shouldShowMsg, navigate])



  useEffect(() => {
    if (loginUser) {
      setShouldShowMsg(true);
    }
  }, [loginUser, dispatch]);
  


  const [isLoading, setIsLoading] = useState(true)
  const onSubmit = (e) => {
    let data = {userName: userName,password: password};
    dispatch(login(data));
  };



  return (
    <>

      <Paper sx={{ height: '100vh', boxShadow: 'none' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={7} sm={7}
            style={{
              marginTop: '20px',
              display: 'flex',
              alignItems: 'flex-end',
              backgroundImage: `url(${LoginImg})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '98vh',
            }}
          >
          </Grid>
          <Grid item xs={12} md={5} sm={5}>
            <Box
              sx={{
                my: 10,
                mx: 5,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >

              <Typography variant="h4" style={{ textAlign: 'center', marginBottom: '40px', color: '#336699' }}>
                Visitor
              </Typography>
              {/* <img src={LoginLogoImg} style={{ height: "90px", marginBottom: '2px' }} /> */}

              {/* <Typography variant="h4" style={{ display: 'flex', justifyContent: 'center' }}>
              Sign In
            </Typography> */}
              <form onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
                <FormHelperText style={{ color: 'red', fontSize: '15px' }}>{helperText}</FormHelperText>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="userName"
                  label="Username"
                  name="userName"
                  value={userName}
                  onChange={handleEmail}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={passwordVisibility ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={handelePassword}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">
                      <IconButton style={{ color: '#FF5722' }}
                        aria-label="Toggle password visibility"
                        onClick={handlePasswordVisibility}>
                        {passwordVisibility ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }}
                />
                {/* <NavLink to="/dashboard"> */}
                <Button
                  style={{ background: '#336699', color: 'white', borderRadius: '10px', fontSize: '18px' }}
                  type="submit"
                  fullWidth
                  variant="contained"
                  size='large'
                  sx={{ mt: 3, mb: 2 }}
                >
                  <b>Sign In</b>
                </Button>
                {/* </NavLink> */}
              </form>

            </Box>
            {isMessage && (
              <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={isMessage ? true : false}
                onClose={setIsMessage}
                autoHideDuration={3000}
                message={isMessage}
              />
            )}
          </Grid>
        </Grid>
      </Paper>

    </>
  )
}

export default Login
import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import Paper from '@mui/material/Paper';



function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        UniEventPro
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {

  const [email, setEmail] = useState(''); // email state
  const [password, setPassword] = useState('');// password state
  const [firstname, setFirstname] = useState('');// password state
  const [lastname, setLastname] = useState('');// password state
  const [role, setRole] = useState('');// password state

  const [registerSuccess, setRegisterSuccess] = useState(false);// register success state
  const [registerError, setRegisterError] = useState(false);// register error state

  const [showPassword, setShowPassword] = React.useState(false);// show password state


  const [emailError, setEmailError] = useState('');// email error state
  const [passwordError, setPasswordError] = useState('');// password error state
  const [firstnameError, setFirstnameError] = useState('');// password error state
  const [lastnameError, setLastnameError] = useState('');// password error state
  const [roleError, setRoleError] = useState('');// password error state
  
  const handleClickShowPassword = () => setShowPassword((show) => !show);// handle show password

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };// handle mouse down password




  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email) {
      setEmailError('Email is required');
    }
    if (!password) {
      setPasswordError('Password is required');
    }
    if (!firstname) {
      setFirstnameError('First name is required');
    }
    if (!lastname) {
      setLastnameError('Last name is required');
    }
    if (!role) {
      setRoleError('Role is required');
    }
  
    // Return early if any errors exist
    if (emailError || passwordError || firstnameError || lastnameError || roleError) {
      return;
    }


    try {

      await axios.post('http://localhost:3000/api/users/register', { email, password, firstname, lastname, role });// send post request to register route
      // alert('Registration Successful');// alert user
      setRegisterSuccess(true);

    } catch (error) {
      console.log(error);
      // alert('Registration Failed');// alert user
      setRegisterError(true);
    }


  };

  const validateEmail = () => {
    if (!email) {
      setEmailError('Email is required');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = () => {
    if (password.length < 8) {
      return { error: true, helperText: 'Password must be at least 8 characters long' };
    }
    return { error: false, helperText: '' };
  };




  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            // bgcolor: '#E1E4ED',
            borderRadius: '10px',
            boxShadow: '0 0 10px 0 rgba(0,0,0,0.2)',
            padding: '20px',


          }}




        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <AccountCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h3">
            Register User
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>

            {/* display success message if register is successful */}
            {registerSuccess && (
              <Alert severity="success" onClose={() => setRegisterSuccess(false)}>
                Register successful
              </Alert>
            )}

            {/* display error message if register fails */}
            {registerError && (
              <Alert severity="error" onClose={() => setRegisterError(false)}>
                Register Failed - Email already exists
              </Alert>
            )}

            <br></br>


            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={firstname}// set value of firstname
                  onChange={(e) => setFirstname(e.target.value)}// set firstname state
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={email}
                  error={Boolean(emailError)}
                  helperText={emailError}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={validateEmail}
                />
              </Grid>

              <FormControl sx={{ ml: 2, mt: 2, width: '100%' }} variant="outlined">
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  type={showPassword ? 'text' : 'password'}
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  id="password"
                  autoComplete="current-password"
                  sx={{ width: '100%' }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                    // Validate the password
                    ...(validatePassword().error && { error: true }),
                    ...(validatePassword().helperText && { helperText: validatePassword().helperText }),
                  }}
                  label="Password"
                />
              </FormControl>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Role</InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    label='Role'
                    name='role'
                    required
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <MenuItem value='student'>Student</MenuItem>
                    {/* <MenuItem value='admin'>User Manager</MenuItem> */}
                    <MenuItem value='accountant'>Accountant</MenuItem>
                    <MenuItem value='venue'>Venue Manager</MenuItem>
                    <MenuItem value='attendee'>Attendee Manager</MenuItem>
                    <MenuItem value='resource'>Resource Manager</MenuItem>
                    <MenuItem value='staff'>Staff</MenuItem>
                    <MenuItem value='admin'>Administrator</MenuItem>


                  </Select>
                </FormControl>
              </Grid>

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, fontSize: 20 }}
            >
              Sign Up
            </Button>

          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
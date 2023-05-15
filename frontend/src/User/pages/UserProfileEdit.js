import * as React from 'react';
import { useState, useEffect } from 'react';
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
import { MuiTelInput } from 'mui-tel-input';
import Cookie from 'js-cookie';


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

export default function UserProfileEdit() {
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [foodtype, setFoodtype] = useState('');
  const [mobile, setMobile] = useState('+94');
  const [address, setAddress] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [registerError, setRegisterError] = useState(false);
  const [profileimage, setProfileimage] = useState('');
  const [itnumber, setItnumber] = useState('');

  const handleChange = (newValue) => {
    setMobile(newValue);
  };

  const id = Cookie.get('id');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/users/${id}`);
        const user = response.data;
        setEmail(user.email);
        setFirstname(user.firstname);
        setLastname(user.lastname);
        setFoodtype(user.foodtype);
        setMobile(user.mobile);
        setAddress(user.address);
        setProfileimage(user.profileimage);
        setItnumber(user.itnumber);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserDetails();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/users/${id}`, { email, foodtype, firstname, lastname, address, mobile,itnumber });
      setRegisterSuccess(true);
    } catch (error) {
      console.log(error);
      setRegisterError(true);
    }
  };

  const profilePage = () => {
    window.location.href = '/admin/profile';
  };

  const uploadImage = () => {
    const formData = new FormData();
    formData.append("file", profileimage);
    formData.append("upload_preset", "xnc06kmi");
    axios
      .post("https://api.cloudinary.com/v1_1/da0y8gypt/image/upload", formData)
      .then((response) => {
        const cloudinaryId = response.data.public_id;
        axios
          .put(`http://localhost:3000/api/users/${id}`, {
            email,
            foodtype,
            firstname,
            lastname,
            address,
            mobile,
            profileimage: cloudinaryId,
            itnumber,
          })
          .then(() => {
            setRegisterSuccess(true);
          })
          .catch((error) => {
            console.log(error);
            setRegisterError(true);
          });
      })
      .catch((error) => {
        console.log(error);
        setRegisterError(true);
      });
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
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <AccountCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Edit Profile
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={firstname}
                  onChange={(event) => setFirstname(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  value={lastname}
                  onChange={(event) => setLastname(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl required fullWidth>
                  <InputLabel id="foodtype-label">Food Type</InputLabel>
                  <Select
                    labelId="foodtype-label"
                    id="foodtype"
                    value={foodtype}
                    label="Food Type"
                    onChange={(event) => setFoodtype(event.target.value)}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={'veg'}>Vegetarian</MenuItem>
                    <MenuItem value={'non-veg'}>Non-Vegetarian</MenuItem>
                    <MenuItem value={'both'}>Both</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <MuiTelInput
                  label="Mobile Number"
                  name="mobile"
                  data-cy="mobile"
                  value={mobile}
                  onChange={handleChange}
                  defaultCountry={'lk'}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  autoComplete="address"
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="itnumber"
                  label="IT Number"
                  name="itnumber"
                  value={itnumber}
                  onChange={(event) => setItnumber(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="contained-button-file"
                  multiple
                  type="file"
                  onChange={(event) => setProfileimage(event.target.files[0])}
                />
                <label htmlFor="contained-button-file">
                  <Button variant="contained" component="span">
                    Upload Profile Image
                  </Button>
                </label>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={uploadImage}
                  disabled={!profileimage}
                  style={{ marginLeft: '20px' }}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              
            >
              Save Changes
            </Button>
            {registerSuccess && (
              <Alert severity="success">Profile updated successfully!</Alert>
            )}
            {registerError && (
              <Alert severity="error">
                An error occurred while updating the profile. Please try again later.
              </Alert>
            )}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2" onClick={profilePage}>
                  Back to Profile
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary" align="center">
            <Link color="inherit" href="https://mui.com/">
              UniEventPro
            </Link>{' '}
            {new Date().getFullYear()}
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
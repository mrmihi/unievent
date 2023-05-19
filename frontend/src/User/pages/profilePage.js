import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import Cookie from 'js-cookie';
import Logout from 'User/components/logout';
import { useEffect } from 'react';
import Grid from "@mui/material/Grid";
import Paper from '@mui/material/Paper';
import "../styles/profilePage.css";
import {Image} from 'cloudinary-react';
import Swal from 'sweetalert2';

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

export default function ProfilePage() {


  const userProfileEdit = () => {
    window.location.href = "/admin/profile/edit"
  }


  const [email, setEmail] = useState(''); // email state
  const [firstname, setFirstname] = useState('');// fname state
  const [lastname, setLastname] = useState('');// lname state
  const [role, setRole] = useState('');// role state
  const [foodtype, setFoodtype] = useState('');// foodtype state
  const [address, setAddress] = useState('');// address state
  const [mobile, setMobile] = React.useState('')
  const [image, setImage] = useState('');// image state
  const [itnumber, setItnumber] = useState('');// itnumber state


  // const [updateSuccess, setUpdateSuccess] = useState(false);// update success state
  // const [updateError, setUpdateError] = useState(false);// update error state

  const id = Cookie.get('id');// get id from cookie
  console.log(id)

  useEffect(() => {

    axios.get(`http://localhost:3000/api/users/${id}`).then((response) => {
      console.log(response.data);
      setEmail(response.data.email);
      setFirstname(response.data.firstname);
      setLastname(response.data.lastname);
      setRole(response.data.role);
      setFoodtype(response.data.foodtype);
      setAddress(response.data.address);
      setMobile(response.data.mobile);
      setImage(response.data.profileimage);
      setItnumber(response.data.itnumber);
    });
  });

  const handleSubmit = async (event) => {
    event.preventDefault();


    try {
      await axios.put(`http://localhost:3000/api/users/${id}`, { email, firstname, lastname, role, foodtype, address, mobile });// send post request to update route
      alert('Update Successful');// alert user
      // setUpdateSuccess(true);

    } catch (error) {
      console.log(error);
      alert('Update Failed');// alert user
      // setUpdateError(true);
    }


  };


  const handleDelete = async (event) => {
    event.preventDefault();
  
    // Show confirmation dialog using SweetAlert2
    const result = await Swal.fire({
      title: 'Are you sure you want to delete your account?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#BF6868',
      cancelButtonColor: '#6C757D',
      confirmButtonText: 'Yes, delete my account'
    });
  
    // If user confirms deletion, proceed with the delete request
    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3000/api/users/${id}`);
        await Swal.fire({
          title: 'Account deleted',
          text: 'Your account has been deleted successfully.',
          icon: 'success',
          timer: 2000
        });
        window.location.href = '/'; // redirect to login page after successful delete
      } catch (error) {
        console.log(error);
        await Swal.fire({
          title: 'Error',
          text: 'An error occurred while deleting your account.',
          icon: 'error'
        });
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid justifyContent='center' container component="main" sx={{ height: '90vh',borderRadius:'5px' }} paddingTop={5} >
        <CssBaseline />

        <Grid
          item
          xs={false}
          sm={4}
          md={4}
          sx={{
            backgroundColor: '#B5E7FB'

          }}

          className='image-box'
        >
          <div className='profile_img text center p-4' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
            <div className='flex flex-column justify-content-center align-items-center'>
            
              <Image 
              cloudName="da0y8gypt" 
              publicId={`https://res.cloudinary.com/da0y8gypt/image/upload/v1684080253/${image}.jpg`}
              width="300" 
              height="300" 
              crop="scale"
              style={{
                width: '300px',
                height: '300px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '4px solid #1F375D'
              }}
              
              />

            </div>

          </div>

          <Typography color="#1F375D" component="h1" variant="h3" textAlign='center' paddingTop={2} textTransform="capitalize" fontWeight="bold">
            {firstname} {lastname}
          </Typography>

        </Grid>

        <Grid md={4} component={Paper} elevation={6} square>



          <br></br>
          <br></br>
          <Typography color="#737B77" component="h2" variant="h4" padding={1}>
            Information
          </Typography>
          <hr></hr>
          <Box textAlign='left' padding={3}  >
          <Typography component="h4" variant="h4">
              IT Number:
            </Typography>
            <Typography component="h2" variant="h5" color="#8E9490">
              {itnumber}
            </Typography>

            <br></br>
            <Typography component="h4" variant="h4">
              Email:
            </Typography>
            <Typography component="h2" variant="h5" color="#8E9490">
              {email}
            </Typography>

            <br></br>

            <Typography component="h4" variant="h4">
              Role:
            </Typography>
            <Typography component="h2" variant="h5" color="#8E9490" textTransform="capitalize">
              {role}
            </Typography>

            <br></br>

            <Typography component="h4" variant="h4">
              Food Type:
            </Typography>
            <Typography component="h2" variant="h5" color="#8E9490" textTransform="capitalize">
              {foodtype}
            </Typography>

            <br></br>

            <Typography component="h4" variant="h4">
              Address:
            </Typography>
            <Typography component="h2" variant="h5" color="#8E9490" textTransform="capitalize">
              {address}
            </Typography>
            <br></br>

            <Typography component="h4" variant="h4" >
              Mobile:
            </Typography>
            <Typography component="h2" variant="h5" color="#8E9490">
              {mobile}
            </Typography>
          </Box>
          <Box>
            <Button
              type="submit"
              size='large'
              variant="contained"
              sx={{ ml: 9, mt: 3, mb: 2, backgroundColor: '#DDB86F', color: '#FFFFFF' }}
              onClick={userProfileEdit}

            >Update Profile</Button>
            <Button
              type="submit"
              size='large'
              variant="contained"
              sx={{ ml: 1, mt: 3, mb: 2, backgroundColor: '#BF6868', color: '#FFFFFF', }}
              hover={{ backgroundColor: '#FF0000' }}
              onClick={handleDelete}
            >Delete Profile</Button>
            <Button
              type="submit"
              size='large'
              variant="contained"
              sx={{ ml: 1, mt: 3, mb: 2, backgroundColor: '#688ABF', color: '#FFFFFF' }}
              onClick={Logout}
            >Logout</Button>

          </Box>

        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
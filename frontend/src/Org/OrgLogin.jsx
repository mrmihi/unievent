import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useFormik } from 'formik';
import Grid from '@mui/material/Grid';
import * as Yup from 'yup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const theme = createTheme();

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Please enter your email'),
  password: Yup.string().required('Please enter your password'),
});

export default function OLoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (Cookies.get('org_accessToken') && Cookies.get('org_role') === 'org') {
      navigate('/org/dashboard');
    }
  }, [navigate]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const { email, password } = values;
        const response = await axios.post(
          'http://localhost:5000/api/org/login',
          JSON.stringify({ email, password }),
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          }
        );
        const accessToken = response?.data?.token;
        const name = response?.data?.name;
        const _id = response?.data?._id;

        console.log(response.data);
        console.log(_id);

        Cookies.set('org_id', _id, { expires: 1 });
        Cookies.set('org_accessToken', accessToken, { expires: 1 });
        Cookies.set('org_name', name, { expires: 1 });
        Cookies.set('org_role', 'org', { expires: 1 });

        navigate('/org/dashboard/');
      } catch (error) {
        if (!error?.response) {
          toast.error('No Server Response', {
            position: toast.POSITION.TOP_CENTER,
          });
        } else if (error.response?.status === 400) {
          toast.error('Missing Username or Password', {
            position: toast.POSITION.TOP_CENTER,
          });
        } else if (error.response?.status === 401) {
          toast.error('Invalid email or password', {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          toast.error('Login Failed', {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      }
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 18,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 2, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h4">
              Organization Sign In
            </Typography>
            <Grid
              container
              spacing={2}
              component="form"
              onSubmit={formik.handleSubmit}
              noValidate
              sx={{ mt: 2 }}
            >
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email Address"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Show Password"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
        <Copyright sx={{ mt: 35, mb: 4 }} />
      </ThemeProvider>
      <ToastContainer />
    </>
  );
}

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="">
        UniEventPro
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

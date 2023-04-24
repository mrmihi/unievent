import {
  TextField,
  Box,
  Tooltip,
  IconButton,
  Typography,
  Button,
} from '@mui/material';
import { ArrowBackIos } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Please enter your email'),
  password: Yup.string().required('Please enter your password'),
});

const EventCreationForm = () => {
  const navigate = useNavigate();
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
          '/api/events',
          JSON.stringify({ email, password }),
          {
            headers: { 'Content-Type': 'application/json' },
          }
        );
        navigate('/admin/venue/dashboard/');
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
      <Box sx={{ ml: 30, mt: 5 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIos />}
          color="secondary"
        >
          Go Back
        </Button>
      </Box>
      <div className="items-center justify-center pt-6	">
        <TextField
          id="email"
          name="email"
          label="Email Address"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
      </div>
    </>
  );
};

export default EventCreationForm;

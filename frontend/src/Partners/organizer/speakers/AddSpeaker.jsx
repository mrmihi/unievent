import * as React from 'react';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  MobileDateTimePicker,
  MobileTimePicker,
  TimePicker,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import dayjs, { Dayjs } from 'dayjs';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams } from 'react-router';

const validationSchema = yup.object({
  fullName: yup.string().required('Name is required'),
  sessionTime: yup.string().required('Session Time is required'),
  contactNo: yup
    .string()
    .required('Contact Number is required')
    .min(10, 'Contact Number should be at least 10')
    .max(10, 'Contact Number should be at most 10'),
  email: yup.string().required('Email is required'),
});

const AddSpeaker = () => {
  const { eventID } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageSelected, setImageSelected] = useState('');
  const [serverSuccessMessage, setServerSuccessMessage] = useState('');
  const [serverErrorMessage, setServerErrorMessage] = useState('');
  const [imageUrl, setimageUrl] = useState('');
  const today = dayjs().add(1, 'day');

  const formik = useFormik({
    initialValues: {
      fullName: '',
      sessionTime: '',
      contactNo: '',
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);

      if (!imageUrl) {
        Swal.fire('', 'Please Upload an Image!', 'warning');
        return;
      }

      // perform submit here, e.g. send data to server
      console.log('Inside the onsubmit');
      const newValues = {
        ...values,
        speakerImage: imageUrl,
        eventID: `${eventID}`,
        organizationID: '642e4928973a5984d960f4bc',
      };

      try {
        const response = await axios.post("/api/partners/speakers", newValues);
        console.log(response);
        setServerSuccessMessage(response.data.message);
        if (response.data.message !== '') {
          setServerSuccessMessage(response.data.message);
          Swal.fire('', response.data.message, 'success');
        }
      } catch (error) {
        setServerErrorMessage(error.response.data.message);
      }

      resetForm();
      setIsSubmitting(false);
    },
  });

  const uploadImage = () => {
    if (imageSelected) {
      const formData = new FormData();
      formData.append('file', imageSelected);
      formData.append('upload_preset', 'vief6ix8');

      axios
        .post(
          'https://api.cloudinary.com/v1_1/dpi1yqznl/image/upload',
          formData
        )
        .then((response) => {
          console.log(response);
          setimageUrl(response.data.secure_url);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  useEffect(() => {
    uploadImage();
  }, [imageSelected]);

  return (
    <div>
      <div className="text-center mb-12 font-bold">
        <Typography variant="h3">Add A Speaker</Typography>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <Stack
          sx={{
            width: '50%',
            minWidth: { xs: '300px', sm: '360px', md: '400px' },
            gap: '1.5rem',
            margin: 'auto',
          }}
        >
          <TextField
            id="fullName"
            name="fullName" // Update the name to "fullName"
            label="Full Name"
            value={formik.values.fullName} // Update the value to formik.values.fullName
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            helperText={formik.touched.fullName && formik.errors.fullName}
            margin="normal"
          />

          <TextField
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            margin="normal"
          />

          <TextField
            id="contactNo"
            name="contactNo"
            label="Contact Number"
            value={formik.values.contactNo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.contactNo && Boolean(formik.errors.contactNo)}
            helperText={formik.touched.contactNo && formik.errors.contactNo}
            margin="normal"
          />

          <Typography>Session Date & Time</Typography>
          <MobileTimePicker
            key="sessionTime"
            name="sessionTime"
            views={['hours', 'minutes', 'seconds']}
            value={formik.values.sessionTime || today}
            onChange={(time) => formik.setFieldValue('sessionTime', time)}
          />

          <Typography>Upload Speaker Image (Max Size: 5MB)</Typography>
          <TextField
            key="headerImage"
            name="headerImage"
            type="file"
            onChange={(e) => {
              setImageSelected(e.target.files[0]);
              uploadImage();
            }}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            // disabled={isSubmitting}
          >
            Submit
          </Button>
          <br></br>
        </Stack>
      </form>
    </div>
  );
};

export default AddSpeaker;

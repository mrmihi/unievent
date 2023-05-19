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
  DatePicker,
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
  name: yup.string().required('Name is required'),
  description: yup.string().required('Session Time is required'),
  date: yup.string().required('Date is required'),
  time: yup.string().required('Time is required'),
});

const AppOpportunity = () => {
  const { eventID } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageSelected, setImageSelected] = useState('');
  const [serverSuccessMessage, setServerSuccessMessage] = useState('');
  const [serverErrorMessage, setServerErrorMessage] = useState('');
  const [imageUrl, setimageUrl] = useState('');
  const oneYearFromNow = dayjs().add(1, 'year');
  const today = dayjs().add(1, 'day');
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      date: today,
      time: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);

      if (!imageUrl) {
        Swal.fire('', 'Please Upload an Image!', 'warning');
        return;
      }

      const newValues = {
        ...values,
        opportunityImage: imageUrl,
        eventID: `${eventID}`,
      };

      try {
        const response = await axios.post(
          "/api/partners/opportunities",
          newValues
        );
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
        <Typography variant="h3">Add An Opportunity</Typography>
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
            id="name"
            name="name" // Update the name to "name"
            label="Opportunity Name"
            value={formik.values.name} // Update the value to formik.values.name
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            margin="normal"
          />

          <TextField
            id="description"
            name="description"
            label="Description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
            margin="normal"
          />

          <Typography>Session Date & Time</Typography>

          <DatePicker
            label="Date"
            value={formik.values.date}
            defaultValue={today}
            disablePast
            maxDate={oneYearFromNow}
          />
          <MobileTimePicker
            key="Time"
            name="time"
            value={formik.values.time || today}
            onChange={(time) => {
              formik.setFieldValue('time', time);
            }}
          />

          <Typography>Upload Speaker Image (Max Size: 5MB)</Typography>
          <TextField
            key="opportunityImage"
            name="opportunityImage"
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

export default AppOpportunity;

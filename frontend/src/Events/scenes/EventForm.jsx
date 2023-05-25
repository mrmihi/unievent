import * as React from 'react';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
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
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import dayjs from 'dayjs';

const validationSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .min(5, 'Name should have a minimum of 10 characters'),
  category: yup.string().required('Category is required'),
  capacity: yup
    .number()
    .required('Capacity is required')
    .min(10, 'Capacity should be at least 10')
    .max(1000, 'Capacity should be at most 1000'),
  description: yup
    .string()
    .required('Description is required')
    .min(10, 'Description should have a minimum of 10 characters'),
  // startTime: yup.string().required('Start Date & Time is required'),
  // endTime: yup.string().required('End Date & Time is required'),
});

export function EventForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageSelected, setImageSelected] = useState('');
  const [serverSuccessMessage, setServerSuccessMessage] = useState('');
  const [serverErrorMessage, setServerErrorMessage] = useState('');
  const [imageUrl, setimageUrl] = useState('');

  const navigate = useNavigate();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };
  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      category: '',
      capacity: '',
      description: '',
      // startTime: '',
      // endTime: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);

      if (!startDate) {
        Swal.fire('', 'Please Enter an Valid Event Start Time!', 'warning');
        return;
      }
      if (!endDate) {
        Swal.fire('', 'Please Enter an Valid Event End Time!', 'warning');
        return;
      }
      if (!imageUrl) {
        Swal.fire('', 'Please Upload an Image!', 'warning');
        return;
      }
      // perform submit here, e.g. send data to server
      console.log('Inside the onsubmit');
      const newValues = {
        ...values,
        startTime: startDate,
        endTime: endDate,
        headerImage: imageUrl,
        orgId: Cookies.get('org_id'),
        org: Cookies.get('org_name'),
      };

      try {
        const response = await axios.post("/api/events", newValues);
        console.log(response);
        setServerSuccessMessage(response.data.message);
        if (response.data.message !== '') {
          Swal.fire('', response.data.message, 'success');
        }
      } catch (error) {
        setServerErrorMessage(error.response.data.message);
      }

      resetForm();
      formik.setFieldValue('headerImage', null);
      setIsSubmitting(false);
    },
  });

  console.log('Org ID', Cookies.get('org_id'));
  const uploadImage = () => {
    if (imageSelected) {
      const formData = new FormData();
      formData.append('file', imageSelected);
      formData.append('upload_preset', 'rytp0oyr');

      axios
        .post(
          'https://api.cloudinary.com/v1_1/dn3wwir7s/image/upload',
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

  const oneYearFromNow = dayjs().add(1, 'year');
  const today = dayjs().add(1, 'day');

  return (
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
          name="name"
          label="Event Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          margin="normal"
        />
        <TextField
          id="category"
          name="category"
          label="Category"
          value={formik.values.category}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.category && Boolean(formik.errors.category)}
          helperText={formik.touched.category && formik.errors.category}
          margin="normal"
        />
        <TextField
          id="capacity"
          name="capacity"
          label="Capacity"
          type="number"
          value={formik.values.capacity}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.capacity && Boolean(formik.errors.capacity)}
          helperText={formik.touched.capacity && formik.errors.capacity}
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

        <Typography>Start Date & Time</Typography>
        <MobileDateTimePicker
          key="startTime"
          name="startTime"
          // value={formik.values.startTime}
          // onChange={(date) => formik.setFieldValue('startTime', date)}
          onChange={handleStartDateChange}
          disablePast
          maxDate={oneYearFromNow}
          defaultValue={today}
        />
        <Typography>End Date & Time</Typography>
        <MobileDateTimePicker
          key="endTime"
          name="endTime"
          // value={formik.values.endTime}
          // onChange={(date) => formik.setFieldValue('endTime', date)}
          onChange={handleEndDateChange}
          disablePast
          maxDate={oneYearFromNow}
          defaultValue={today}
        />

        <Typography>Upload Event Image (Max Size: 5MB)</Typography>
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
  );
}

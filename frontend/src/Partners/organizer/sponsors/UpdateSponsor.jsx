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
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
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
import { useLocation } from 'react-router-dom';

const validationSchema = yup.object({
  fullName: yup.string().required('Name is required'),
  packageType: yup.string().required('Package Type is required'),
  email: yup.string().required('Email is required'),
});

const UpdateSponsor = () => {
  const location = useLocation();
  const sponsor = location.state?.sponsor;
  console.log(sponsor);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageSelected, setImageSelected] = useState('');
  const [serverSuccessMessage, setServerSuccessMessage] = useState('');
  const [serverErrorMessage, setServerErrorMessage] = useState('');
  const [imageUrl, setimageUrl] = useState('');

  const formik = useFormik({
    initialValues: {
      fullName: sponsor.fullName,
      packageType: sponsor.packageType,
      email: sponsor.email,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);

      if (!imageUrl) {
        Swal.fire('', 'Please Upload an Image!', 'warning');
        return;
      }

      // perform submit here, e.g. send data to server
      const newValues = {
        ...values,
        sponsorImage: imageUrl,
      };

      try {
        const response = await axios.put(
          `/api/partners/sponsors/${sponsor._id}`,
          newValues
        );

        setServerSuccessMessage(response.data.message);
        if (response.data.message !== '') {
          setServerSuccessMessage(response.data.message);
          Swal.fire('', serverSuccessMessage, 'success');
        }
      } catch (error) {
        setServerErrorMessage(error.response.data.message);
        Swal.fire('', serverErrorMessage, 'error');
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
        <Typography variant="h3">Update Speaker {sponsor.fullName}</Typography>
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

          <FormControl>
            <InputLabel id="packageTypeLabel">Package Type</InputLabel>
            <Select
              name="packageType"
              labelId="packageTypeLabel"
              id="packageType"
              value={formik.values.packageType}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.packageType && Boolean(formik.errors.packageType)
              }
              label="Package Type"
            >
              <MenuItem value={'Diamond'}>Diamond</MenuItem>
              <MenuItem value={'Gold'}>Gold</MenuItem>
              <MenuItem value={'Silver'}>Silver</MenuItem>
              <MenuItem value={'Bronze'}>Bronze</MenuItem>
            </Select>
          </FormControl>
          <Typography>Upload Sponsor Image (Max Size: 5MB)</Typography>
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

export default UpdateSponsor;

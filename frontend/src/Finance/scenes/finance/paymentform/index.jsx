import { useState, useEffect } from 'react';
import {
  FormControl,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  Box,
  Typography,
  InputAdornment,
} from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import { CloudinaryContext } from 'cloudinary-react';
import { Link } from 'react-router-dom';

const PaymentPage = () => {
  const [price, setPrice] = useState('');
  const [venue, setVenue] = useState('61556c6d037937a260869b0f');
  const [organizer, setOrganizer] = useState('61556c6d037937a260869b0e');
  const [start_time, setStartTime] = useState();
  const [end_time, setEndTime] = useState(null);
  const [duration, setDuration] = useState(0);
  const [status, setStatus] = useState('');
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (start_time && end_time) {
      const durationInMs =
        (new Date(end_time).getTime() - new Date(start_time).getTime()) /
        3600000;
      setDuration(durationInMs);
    } else {
      setDuration(0);
    }
  }, [start_time, end_time]);

  const validate = () => {
    let errors = {};

    if (!price) {
      errors.price = 'Price is required';
    } else if (price < 0) {
      errors.price = 'Price cannot be negative';
    }
    if (!venue) {
      errors.venue = 'Venue is required';
    }

    if (!organizer) {
      errors.organizer = 'Organizer is required';
    }

    if (!start_time) {
      errors.start_time = 'Start time is required';
    }

    if (!end_time) {
      errors.end_time = 'End time is required';
    } else if (start_time > end_time) {
      errors.end_time = 'End time cannot be less than start time';
    }

    if (!duration) {
      errors.duration = 'Duration is required';
    }

    if (!status) {
      errors.status = 'Status is required';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      let imageUrl = '';
      if (image) {
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'iussagsw');
        const response = await axios.post(
          'https://api.cloudinary.com/v1_1/dtf9sr7jl/image/upload',
          formData
        );
        imageUrl = response.data.secure_url;
      }

      const response = await axios.post('/api/payments', {
        price,
        venue,
        organizer,
        start_time,
        end_time,
        duration,
        status,
        paymentImage: imageUrl,
      });
      console.log(response.data);
      Swal.fire('Success!', 'Payment Successful!', 'success');
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Payment Failed!',
      });
    }
  };

  return (
    <div>
      <center>
        <Box m="1rem" width="50%" mt="1rem">
          <Typography variant="h2" sx={{ mb: '1rem' }}>
            Payment Form
          </Typography>
          <CloudinaryContext
            cloudName="your_cloudinary_cloud_name"
            uploadPreset="iussagsw"
          >
            <form onSubmit={handleSubmit}>
              <FormControl fullWidth margin="normal">
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">USD</InputAdornment>
                    ),
                  }}
                  label="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  error={errors.price ? true : false}
                  helperText={errors.price}
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <TextField
                  label="Venue"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  error={errors.venue ? true : false}
                  helperText={errors.venue}
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <TextField
                  label="Organizer"
                  value={organizer}
                  onChange={(e) => setOrganizer(e.target.value)}
                  error={errors.organizer ? true : false}
                  helperText={errors.organizer}
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <TextField
                  type="datetime-local"
                  label="Start Time"
                  value={start_time}
                  onChange={(e) => setStartTime(e.target.value)}
                  error={errors.start_time ? true : false}
                  helperText={errors.start_time}
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <TextField
                  label="End Time"
                  type="datetime-local"
                  value={end_time}
                  onChange={(e) => setEndTime(e.target.value)}
                  error={errors.end_time ? true : false}
                  helperText={errors.end_time}
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <TextField
                  label="Duration"
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  error={errors.duration ? true : false}
                  helperText={errors.duration}
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel id="demo-simple-select-helper-label">
                  Status
                </InputLabel>
                <Select
                  label="Status"
                  labelId="demo-simple-select-helper-label"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  error={errors.status ? true : false}
                  helperText={errors.status}
                >
                  <MenuItem value="approved">Approved</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="rejected">Rejected</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <TextField
                  labelId="demo-simple-select-helper-label"
                  type="file"
                  label="Upload the recipt"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </FormControl>
              <Box m="1rem">
                <Link to ="/finance/paymentpage">
              <Button
                  variant="contained"
                  type="submit"
                  color="secondary"
                  style={{
                    marginInline: '5px',
                    width: '150px',
                  }}
                >
                  Back
                  </Button>
                  </Link>
                <Button
                  variant="contained"
                  type="submit"
                  color="secondary"
                  style={{
                    marginInline: '5px',
                    width: '150px',
                  }}
                >
                  Submit
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  type="cancel"
                  style={{
                    marginInline: '5px',
                    width: '150px',
                    backgroundColor: '#d32f2f',
                    onhover: {
                      backgroundColor: '#b71c1c',
                    },
                  }}
                >
                  Cancel
                </Button>
              </Box>
              <Box></Box>
            </form>
          </CloudinaryContext>
        </Box>
      </center>
    </div>
  );
};

export default PaymentPage;

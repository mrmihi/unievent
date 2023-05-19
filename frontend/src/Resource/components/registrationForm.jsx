import {
  Button,
  Checkbox,
  FormControlLabel,
  Radio,
  TextField,
  Typography,
} from '@mui/material';

import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const userID = '643f6e981a4293c8000d4bd7';

const OpportunityRegister = () => {
  const navigate = useNavigate();
  const [serverErrorMessage, setServerErrorMessage] = useState('');
  const [serverSuccessMessage, setServerSuccessMessage] = useState('');

  const { id } = useParams();

  //   let { opportunityID } = useParams();
  //   opportunityID = opportunityID.toString();
  //   console.log(typeof opportunityID);

  const registerToAnEvent = async (data) => {
    try {
      const response = await axios.post("/api/registrants", data);
      setServerSuccessMessage(response.data);
      console.log(`response: ${response}`);
    } catch (error) {
      setServerErrorMessage(error);
    }
  };

  useEffect(() => {
    if (serverSuccessMessage !== '') {
      Swal.fire('', 'success').then(() => navigate(`/events/${id}`));
    }
  }, [navigate, serverSuccessMessage, id]);

  useEffect(() => {
    if (serverErrorMessage !== '') {
      Swal.fire('', serverErrorMessage, 'error');
    }
  }, [serverErrorMessage]);

  const {
    register,
    formState: { errors },
    setError,
    handleSubmit,
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    if (!data.foodPref) {
      setError('foodPref', {
        type: 'manual',
        message: 'Please select at least one food Preference.',
      });
      return;
    }
    try {
      await registerToAnEvent(data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div>
      <div className="">
        <div className="text-center mt-8 mb-12">
          <Typography variant="h4">Register for the Event</Typography>
          <Typography variant="h5">{id}</Typography>
        </div>
        <div className="mt-12 ">
          <div className="flex items-center justify-center shadow-lg border-1  mr-96 ml-96 p-6 rounded-md border-slate-900">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex items-center">
                <TextField
                  value={userID}
                  style={{ display: 'none' }}
                  {...register('userId')}
                />
                <TextField
                  value={id}
                  style={{ display: 'none' }}
                  {...register('eventId')}
                />
                <TextField
                  fullWidth
                  {...register('fullName', {
                    required: 'Please enter your full name.',
                  })}
                  label="Full Name"
                  variant="outlined"
                  error={!!errors.fullName}
                  helperText={
                    errors.fullName && errors.fullName.message
                      ? errors.fullName.message
                      : null
                  }
                />
              </div>
              <div className=" mt-8">
                <TextField
                  fullWidth
                  type="text"
                  {...register('contactNo', {
                    required: 'Please enter a valid contact number.',
                    pattern: {
                      value: /^\d{10}$/,
                      message: 'Please enter a valid 10-digit phone number.',
                    },
                  })}
                  label="Contact Number"
                  variant="outlined"
                  error={!!errors.contactNo}
                  helperText={
                    errors.contactNo && errors.contactNo.message
                      ? errors.contactNo.message
                      : null
                  }
                />
              </div>

              <div className=" mt-8">
                <TextField
                  fullWidth
                  {...register('email', {
                    required: 'Please enter a valid email',
                  })}
                  label="Email"
                  variant="outlined"
                  error={!!errors.email}
                  helperText={
                    errors.email && errors.email.message
                      ? errors.email.message
                      : null
                  }
                />
              </div>

              <div className="flex flex-col  text-slate-500  mt-8">
                <div>
                  <Typography variant="h6">Food Preference</Typography>
                  <FormControlLabel
                    {...register('foodPref', { required: true })}
                    control={<Radio value="Veg" />}
                    label="Veg"
                  />
                  <FormControlLabel
                    {...register('foodPref', { required: true })}
                    control={<Radio value="Non-Veg" />}
                    label="Non-Veg"
                  />
                </div>
                <div>
                  {errors.foodPref && (
                    <Typography variant="body" color="error">
                      {errors.foodPref.message}
                    </Typography>
                  )}
                </div>
              </div>
              <div className="mt-8 text-center ml-12 mr-12 mb-6">
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ padding: 2 }}
                  fullWidth
                >
                  Submit
                </Button>
                <Button
                  variant="overline"
                  sx={{ padding: 2 }}
                  fullWidth
                  colot="error"
                  onClick={() => navigate(`/events/${id}`)}
                >
                  <Typography variant="body" color="error">
                    Cancel
                  </Typography>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OpportunityRegister;

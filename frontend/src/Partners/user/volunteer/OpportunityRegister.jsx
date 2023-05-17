import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from '@mui/material';

import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';

const userID = Cookies.get('id');
console.log(userID);

const OpportunityRegister = () => {
  const navigate = useNavigate();
  const [serverErrorMessage, setServerErrorMessage] = useState('');
  const [serverSuccessMessage, setServerSuccessMessage] = useState('');

  let { opportunityID } = useParams();
  opportunityID = opportunityID.toString();
  console.log(typeof opportunityID);

  const registerToAnOpportunity = async (data) => {
    try {
      const response = await axios.post(
        `/api/partners/volunteers/${opportunityID}`,
        data
      );
      setServerSuccessMessage(response.data.message);
    } catch (error) {
      setServerErrorMessage(error.response.data.message);
    }
  };

  useEffect(() => {
    if (serverSuccessMessage !== '') {
      Swal.fire('', serverSuccessMessage, 'success');
    }
  }, [navigate, serverSuccessMessage]);

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
    if (!data.availableTime || data.availableTime.length === 0) {
      setError('availableTime', {
        type: 'manual',
        message: 'Please select at least one available time.',
      });
      return;
    }
    try {
      await registerToAnOpportunity(data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div>
      <div className="">
        <div className="text-center mt-8 mb-12">
          <Typography variant="h4">Apply As A Volunteer</Typography>
        </div>
        <div className="mt-12 ">
          <div className="flex items-center justify-center shadow-lg border-1  mr-96 ml-96 p-6 rounded-md border-slate-900">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex items-center">
                <TextField
                  value={userID}
                  style={{ display: 'none' }}
                  {...register('userID')}
                />
                <TextField
                  value="pending"
                  style={{ display: 'none' }}
                  {...register('status')}
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
                  <FormControlLabel
                    {...register('availableTime', { required: true })}
                    control={<Checkbox value="Morning" />}
                    label="Morning"
                  />
                  <FormControlLabel
                    {...register('availableTime', { required: true })}
                    control={<Checkbox value="Evening" />}
                    label="Evening"
                  />
                  <FormControlLabel
                    {...register('availableTime', { required: true })}
                    control={<Checkbox value="Night" />}
                    label="Night"
                  />
                </div>
                <div>
                  {errors.availableTime && (
                    <Typography variant="body" color="error">
                      {errors.availableTime.message}
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
                  type="submit"
                  variant="contained"
                  onClick={() => {
                    navigate(`/event/appliedOpportunities/${userID}`);
                  }}
                  sx={{ padding: 2, marginTop: '10px' }}
                  fullWidth
                >
                  View Applied Opportunities
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

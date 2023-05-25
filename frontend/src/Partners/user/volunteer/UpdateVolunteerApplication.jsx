import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdateVolunteerApplication = () => {
  const location = useLocation();
  const volunteer = location.state?.volunteer;
  console.log(volunteer);
  const navigate = useNavigate();
  const [serverErrorMessage, setServerErrorMessage] = useState('');
  const [serverSuccessMessage, setServerSuccessMessage] = useState('');

  const [formValues, setFormValues] = useState({
    fullName: volunteer.fullName,
    email: volunteer.email,
    contactNo: volunteer.contactNo,
    status: volunteer.status,
    userID: volunteer.userID,
    opportunityID: volunteer.opportunityID,
    availableTime: volunteer.availableTime,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  let { volunteerID } = useParams();
  volunteerID = volunteerID.toString();
  console.log(typeof volunteerID);

  const updateData = async (data) => {
    try {
      const response = await axios.put(
        `/api/partners/volunteers/${volunteerID}`,
        data
      );
      setServerSuccessMessage(response.data.message);
    } catch (error) {
      console.log(error);
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
      await updateData(data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/api/partners/volunteers/${volunteerID}`)
          .then((response) => {
            Swal.fire(
              'Deleted!',
              '{"Your file has been deleted."}',
              'success'
            ).then(navigate(`/appliedOpportunitiesList/${volunteer.userID}`));
            console.log(response);
          })
          .catch((error) => {
            Swal.fire('', 'Failed to Delete the Application.', 'error');
            console.log(error);
          });
      }
    });
  };

  return (
    <div>
      <div className="">
        <div className="text-center mt-8 mb-12">
          <Typography variant="h4">Update Your Submitted Details</Typography>
        </div>
        <div className="mt-12 ">
          <div className="flex items-center justify-center shadow-lg border-1  mr-96 ml-96 p-6 rounded-md border-slate-900">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex items-center">
                <TextField
                  defaultValue={volunteer.userID}
                  style={{ display: 'none' }}
                  {...register('userID')}
                />
                <TextField
                  defaultValue={volunteer.opportunityID}
                  style={{ display: 'none' }}
                  {...register('opportunityID')}
                />
                <TextField
                  defaultValue={volunteer.status}
                  style={{ display: 'none' }}
                  {...register('status')}
                />
                <TextField
                  fullWidth
                  defaultValue={formValues.fullName}
                  onChange={handleChange}
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
                  defaultValue={volunteer.contactNo}
                  onChange={handleChange}
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
                  defaultValue={volunteer.email}
                  {...register('email', {
                    required: 'Please enter a valid email',
                  })}
                  label="Email"
                  onChange={handleChange}
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
                    control={
                      <Checkbox
                        value="Morning"
                        defaultChecked={volunteer.availableTime.includes(
                          'Morning'
                        )}
                        onChange={handleChange}
                      />
                    }
                    label="Morning"
                  />
                  <FormControlLabel
                    {...register('availableTime', { required: true })}
                    control={
                      <Checkbox
                        value="Evening"
                        defaultChecked={volunteer.availableTime.includes(
                          'Evening'
                        )}
                        onChange={handleChange}
                      />
                    }
                    label="Evening"
                  />
                  <FormControlLabel
                    {...register('availableTime', { required: true })}
                    control={
                      <Checkbox
                        value="Night"
                        defaultChecked={volunteer.availableTime.includes(
                          'Night'
                        )}
                        onChange={handleChange}
                      />
                    }
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
              <div className="mt-8 flex items-center justify-around ml-5 mr-10 mb-6">
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ padding: 2, marginRight: '20px' }}
                  fullWidth
                >
                  Submit
                </Button>
                <Button
                  // type="submit"
                  onClick={handleDelete}
                  color="error"
                  variant="contained"
                  sx={{
                    padding: 2,
                  }}
                  fullWidth
                >
                  Delete
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UpdateVolunteerApplication;

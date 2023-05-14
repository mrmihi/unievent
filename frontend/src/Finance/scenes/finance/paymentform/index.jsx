// import { useState } from 'react';
// import { FormControl, TextField, Button, Select, MenuItem, InputLabel,Box, Typography} from '@mui/material';
// // import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
// import axios from 'axios';
// import Swal from 'sweetalert2';

// const PaymentPage = () => {
//   const [price, setPrice] = useState('');
//   const [venue, setVenue] = useState('61556c6d037937a260869b0f');
//   const [organizer, setOrganizer] = useState('61556c6d037937a260869b0e');
//   const [start_time, setStartTime] = useState(null);
//   const [end_time, setEndTime] = useState(null);
//   const [duration, setDuration] = useState(0);
//   const [status, setStatus] = useState('');

  

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('/api/payments', {
//         price,
//         venue,
//         organizer,
//         start_time,
//         end_time,
//         duration,
//         status
//       });
//       console.log(response.data);
//       Swal.fire(
//         'Success!',
//         'Payment Successful!',
//         'success'
//       )
//     } catch (error) {
//       console.error(error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: 'Payment Failed!',
        
//       })
//     }
//   };

//   return (
//     <div >
//       <center>
//       <Box m='2rem' width='50%' mt='3rem'>
//       <Typography variant="h2" sx={{ mb: '2rem' }}>
//         Payment Form
//       </Typography>
//     <form onSubmit={handleSubmit}>
//       <FormControl fullWidth margin="normal">
//         <TextField label="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
//       </FormControl>
//       <FormControl fullWidth margin="normal">
//         <TextField label="Venue" value={venue} onChange={(e) => setVenue(e.target.value)} />
//       </FormControl>
//       <FormControl fullWidth margin="normal">
//         <TextField label="Organizer" value={organizer} onChange={(e) => setOrganizer(e.target.value)} />
//       </FormControl>
//       <FormControl fullWidth margin="normal">
//         <InputLabel>Start Time</InputLabel>
//         <TextField type="datetime-local" value={start_time} onChange={(e) => setStartTime(e.target.value)} />
//       </FormControl>
//       <FormControl fullWidth margin="normal">
//         <InputLabel>End Time</InputLabel>
//         <TextField type="datetime-local" value={end_time} onChange={(e) => setEndTime(e.target.value)} />
//       </FormControl>
//       <FormControl fullWidth margin="normal">
//         <InputLabel>Duration</InputLabel>
//         <TextField type="number" value={duration} onChange={(e) => setDuration(e.target.value)} />
//       </FormControl>
//       <FormControl fullWidth margin="normal">
//         <InputLabel>Status</InputLabel>
//         <Select value={status} onChange={(e) => setStatus(e.target.value)}>
//           <MenuItem value="approved">Approved</MenuItem>
//           <MenuItem value="pending">Pending</MenuItem>
//           <MenuItem value="rejected">Rejected</MenuItem>
//         </Select>
//       </FormControl>
//       <Box m='1rem'>
//       <Button variant="contained" color="secondary" type="submit">
//         Submit
//       </Button>
//       </Box>
//       <Box>
//       <Button variant="contained" color="secondary" type="cancel">
//         Cancel
//       </Button>
//       </Box>
      
//     </form>
//     </Box>
//     </center>
//     </div>
//   );
// };

// export default PaymentPage;

import { useState } from 'react';
import { FormControl, TextField, Button, Select, MenuItem, InputLabel, Box, Typography } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';

const PaymentPage = () => {
  const [price, setPrice] = useState('');
  const [venue, setVenue] = useState('61556c6d037937a260869b0f');
  const [organizer, setOrganizer] = useState('61556c6d037937a260869b0e');
  const [start_time, setStartTime] = useState(null);
  const [end_time, setEndTime] = useState(null);
  const [duration, setDuration] = useState(0);
  const [status, setStatus] = useState('');

  const [errors, setErrors] = useState({});

  const validate = () => {
    let errors = {};

    if (!price) {
      errors.price = 'Price is required';
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
    }
    if(start_time>end_time){
      errors.end_time = 'Start time cannot be greater than end time';
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
      const response = await axios.post('/api/payments', {
        price,
        venue,
        organizer,
        start_time,
        end_time,
        duration,
        status,
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
        <Box m="2rem" width="50%" mt="3rem">
          <Typography variant="h2" sx={{ mb: '2rem' }}>
            Payment Form
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth margin="normal">
              <TextField
                label="Price $(USD)"
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
         <InputLabel>Start Time</InputLabel>
        <TextField type="datetime-local" value={start_time} onChange={(e) => setStartTime(e.target.value)} error={errors.start_time ? true : false}  helperText={errors.start_time} />
       </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>End Time</InputLabel>
         <TextField type="datetime-local" value={end_time} onChange={(e) => setEndTime(e.target.value)} error={errors.end_time ? true : false}  helperText={errors.end_time}/>
       </FormControl>
       <FormControl fullWidth margin="normal">
         <InputLabel>Duration</InputLabel>
         <TextField type="number" value={duration} onChange={(e) => setDuration(e.target.value)}error={errors.duration ? true : false}  helperText={errors.duration} />
       </FormControl>
       <FormControl fullWidth margin="normal">
         <InputLabel>Status</InputLabel>
         <Select value={status} onChange={(e) => setStatus(e.target.value)} error={errors.status ? true : false}  helperText={errors.status}>
           <MenuItem value="approved">Approved</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
           <MenuItem value="rejected">Rejected</MenuItem>
        </Select>
       </FormControl>
       <Box m='1rem'>
       <Button variant="contained" color="secondary" type="submit">
         Submit
       </Button>
       </Box>
       <Box>
       <Button variant="contained" color="secondary" type="cancel">
         Cancel
       </Button>
       </Box>
      
    </form>
     </Box>
     </center>
     </div>
  );
};

export default PaymentPage;


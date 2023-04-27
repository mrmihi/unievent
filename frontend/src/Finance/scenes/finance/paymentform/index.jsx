import { useState } from 'react';
import { FormControl, TextField, Button, Select, MenuItem, InputLabel,Box, Typography} from '@mui/material';
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import axios from 'axios';

const PaymentPage = () => {
  const [price, setPrice] = useState('');
  const [venue, setVenue] = useState('61556c6d037937a260869b0f');
  const [organizer, setOrganizer] = useState('61556c6d037937a260869b0e');
  const [start_time, setStartTime] = useState(null);
  const [end_time, setEndTime] = useState(null);
  const [duration, setDuration] = useState(0);
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/payments', {
        price,
        venue,
        organizer,
        start_time,
        end_time,
        duration,
        status
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div >
      <center>
      <Box m='2rem' width='50%' mt='3rem'>
      <Typography variant="h2" sx={{ mb: '2rem' }}>
        Payment Form
      </Typography>
    <form onSubmit={handleSubmit}>
      <FormControl fullWidth margin="normal">
        <TextField label="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField label="Venue" value={venue} onChange={(e) => setVenue(e.target.value)} />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField label="Organizer" value={organizer} onChange={(e) => setOrganizer(e.target.value)} />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>Start Time</InputLabel>
        <TextField type="datetime-local" value={start_time} onChange={(e) => setStartTime(e.target.value)} />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>End Time</InputLabel>
        <TextField type="datetime-local" value={end_time} onChange={(e) => setEndTime(e.target.value)} />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>Duration</InputLabel>
        <TextField type="number" value={duration} onChange={(e) => setDuration(e.target.value)} />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>Status</InputLabel>
        <Select value={status} onChange={(e) => setStatus(e.target.value)}>
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




// =============================================
// 
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
// import { useState } from "react";

// function PaymentPage() {
//   const [orderId, setOrderId] = useState("");

//   const createOrder = async (data, actions) => {
//     const response = await fetch("/api/payments", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         price: 10.0,
//         start_time: "2023-04-13T10:00:00.000Z",
//         end_time: "2023-04-13T11:00:00.000Z",
//         status: "approved",
//         venue: "61556c6d037937a260869b0f",
//         organizer: "61556c6d037937a260869b0e",
//         duration: 60,
//       }),
//     });

//     const order = await response.json();
//     setOrderId(order.id);

//     return order.id;
//   };

//   const onApprove = async (data, actions) => {
//     const order = await actions.order.capture();
//     console.log(order);
//     // send data to db using fetch or any other library
//   };

//   return (
//     <PayPalScriptProvider options={{ "client-id": "AbmmRlKwrnRbbNcyWQ58YMabSt6AfdfAoK7RN7rMAU111AWXn39w7_mc3A8Yo-ZQ53lX6mQARxuQ_dSQ" }}>
//       <PayPalButtons
//         createOrder={createOrder}
//         onApprove={onApprove}
//         onError={(err) => console.error("error!", err)}
//       />
//     </PayPalScriptProvider>
//   );
// }

// export default PaymentPage;

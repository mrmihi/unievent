import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Header from "../../../components/Header";
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import axios from 'axios';
import  { useState, useEffect } from 'react';

import { 
  FormControl, 
  Box,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Grid,
  Select,
  MenuItem,
  TextField,
  Button
} from "@mui/material";


const PaymentPage = () => {
  const [venue, setVenue] = useState('');
  const [organizer, setOrganizer] = useState('');
  // const [value, setValue] = React.useState(dayjs('2022-04-17T15:30'));
  const [status, setStatus] = React.useState('');
  const [start_time, setStart_time] = React.useState('');
  const [end_time, setEnd_time] = React.useState('');
  const [price, setPrice] = React.useState('');

  const handleChange = (event) => {
    setStatus(event.target.value);
    handleSubmit();
  };

  const [payment, setPayment] = useState(null);

  useEffect(() => {
    axios.get("http//:5000/api/payments").then((res) => {
      setPayment(res.data);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      start_time,
      end_time,
      price,
      status,
      venue,  
      organizer
    };

    try {
      await axios.post("http://localhost:5000/api/payments", data);
      alert("Payment submitted successfully!");
    } catch (error) {
      console.log(error);
      alert("Error submitting payment!");
    }
  

    // Create the request
    const request = new Request('http//:5000/api/payments', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Send the request
    fetch(request)
      .then(response => response.json())
      .then(data => {
        console.log('Data created:', data);
      })
      .catch(error => {
        console.log('Error creating data:', error);
      });
  };


  return (
    <div>
      <center><Box mt='5rem'mx='10rem' mb='5rem'>
      
      <Box m='2rem' width='50%' >
      <center><Header
                    title="Payment Page"
                /></center>
          <Grid fullWidth >
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                label="Price"
                onChange={(e) => setPrice(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid fullWidth >
            <FormControl fullWidth sx={{ m: 1 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateTimePicker']}>
                  <DateTimePicker label="Start_time"  onChange={(e) => setStart_time(e.target.value)}/>
                </DemoContainer>
              </LocalizationProvider>
            </FormControl>
          </Grid>
          <Grid fullWidth >
            <FormControl fullWidth sx={{ m: 1 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateTimePicker']}>
                  <DateTimePicker label="End_time"  onChange={(e) => setEnd_time(e.target.value)} />
                </DemoContainer>
              </LocalizationProvider>
            </FormControl>
          </Grid>
          <Grid fullWidth >
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={status}
                  label="Status"
                  onChange={ handleChange }
                  
                >
                  <MenuItem value={'approved'}>approved</MenuItem>
                  <MenuItem value={'pending'}>pending</MenuItem>
                  <MenuItem value={'rejected'}>rejected</MenuItem>
                </Select>
            </FormControl>
          </Grid>
          <Grid fullWidth >
            <FormControl fullWidth sx={{ m: 1 }}>
              <TextField id="outlined-basic" label="Venue" variant="outlined"onChange={(e) => setStart_time(e.target.value)} />
            </FormControl>
          </Grid>
          <Grid fullWidth >
            <FormControl fullWidth sx={{ m: 1 }}>
              <TextField id="outlined-basic" label="Organizer" variant="outlined" onChange={(e) => setOrganizer(e.target.value)} />
            </FormControl>
          </Grid>
          <Grid fullWidth >
            <FormControl fullWidth sx={{ m: 1 }}>
              
            </FormControl>
          </Grid>
          <Grid fullWidth>
            <PayPalScriptProvider options={{"client-id":"AbmmRlKwrnRbbNcyWQ58YMabSt6AfdfAoK7RN7rMAU111AWXn39w7_mc3A8Yo-ZQ53lX6mQARxuQ_dSQ"}}>
              <PayPalButtons style={{ layout: "horizontal" }} 
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: "13.99",
                        },
                      },
                    ],
                  });
                }}
                onApprove={async (data, actions) => {
                  const details = await actions.order.capture();
                  const name = details.payer.name.given_name;
                  alert("Transaction completed by " + name);
                  handleSubmit();
                }}
              />
            </PayPalScriptProvider>
        </Grid>
        <Grid fullWidth>
        <Button variant="contained">reset</Button>
        </Grid>
     
      </Box>
      </Box></center>
    </div>
  );
};

export default PaymentPage;


import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Box } from '@mui/material';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';


const PaymentOptions = () => {
  
  const { id } = useParams(); 
const navigate = useNavigate();  

  return (
    <>
      <Box  pt="2rem" width="100%" position="relative" justifyContent="center" style={{backgroundColor: "#bbdefb"}}>
        <center>
        <Typography variant='h2'>
          Payment Options
          </Typography>
          </center>
      </Box>
    <Box
      mx="5rem"
      mt="2rem"
      mb="0rem"
      display="flex"
      position="relative"
      justifyContent="center"
    >
      <Box mx="5rem">
        <Card sx={{ maxWidth: 345 }} m="1rem">
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h3" component="div">
                Pay with Cash
              </Typography>
              <Typography
                variant="h4"
                fontstyle="bold"
                color="#355FCC"
                gutterBottom
              >
                Bank Account Details
              </Typography>
              <Box
                mb="0.5rem"
                p="1.5rem"
                style={{ backgroundColor: '#FFFFF', borderRadius: '5px' , border: '2px solid #F2F5FA'}}
              >
                <Typography variant="h5" color="text.primary" gutterBottom>
                  Account Number: 045-1523-256 <br />
                  Bank Name: BOC Bank <br />
                  Branch: Malabe Branch
                </Typography>
              </Box>
              <Box
                p="1.5rem"
                style={{ backgroundColor: '#FFFFF', borderRadius: '5px' , border: '2px solid #F2F5FA'}}
              >
                <Typography variant="h5" color="text.primary" gutterBottom>
                  Account Number: 076-9564-852 <br />
                  Bank Name: Commercial Bank <br />
                  Branch: Kaduwela Branch
                </Typography>
              </Box>
              <Box
                mt="1rem"
                p="1.5rem"
                style={{ backgroundColor: '#F2F5FA', borderRadius: '5px' }}
              >
                <Typography
                  variant="h5"
                  bold
                  color="text.primary"
                  gutterBottom
                  style={{ fontStyle: 'bold' }}
                >
                  Instructions
                </Typography>
                <ol>
                  <li>1. Make the payment in cash.</li>
                  <li>
                    2. Choose one of the bank accounts above to make the
                    payment.
                  </li>
                  <li>
                    3. After making the payment, take a picture or scan the
                    receipt.
                  </li>
                  <li>
                    4. Click the "Pay" button below to submit the receipt.
                  </li>
                </ol>
              </Box>
            </CardContent>
          </CardActionArea>
          <CardActions m="1rem">
              <Button width="100%"
                variant="contained"
                type="submit"
                  
                style={{
                  marginInline: '5px',
                  width: '100%',
                  backgroundColor: '#0123F5',
                }}
                onClick={() => { navigate(`/finance/paypal/${id}`)}}
              >
                pay
              </Button>
              <Button width="100%"
                variant="contained"
                type="submit"
                  
                style={{
                  marginInline: '5px',
                  width: '100%',
                  backgroundColor: '#d32f2f',
                }}
                onClick={() => { navigate("")}}
              >
                cancel
              </Button>
          </CardActions>
        </Card>
      </Box>
      <Box mx="5rem">
        <Card sx={{ maxWidth: 345 }} m="1rem">
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h3" component="div">
                Pay with PayPal
              </Typography>
              <Typography
                variant="h4"
                fontstyle="bold"
                color="#355FCC"
                gutterBottom
              >
                15.00 USD
              </Typography>

              <Box
                mt="1rem"
                p="1.5rem"
                style={{ backgroundColor: '#F2F5FA', borderRadius: '5px' }}
              >
                <Typography
                  variant="h5"
                  bold
                  color="text.primary"
                  gutterBottom
                  style={{ fontStyle: 'bold' }}
                >
                  Instructions
                  </Typography>
                  Please review and accept the <a href="https://www.paypal.com/lk/legalhub/useragreement-full" target="_blank" rel="noopener noreferrer" style={{fontStyle: 'italic' ,}}>PayPal User Agreement</a> before proceeding.
                To make a payment using PayPal, please follow these
                instructions:
                <ol>
                  <li>1. Click the "Pay with PayPal" button below.</li>
                  <li>
                    2. You will be redirected to the PayPal website to log in to
                    your PayPal account.
                  </li>
                  <li>
                    3. Once logged in, review the payment details and confirm
                    the payment.
                  </li>
                  <li>
                    4. After completing the payment, you will be redirected back
                    to our website.
                  </li>
                </ol>
              </Box>
            </CardContent>
          </CardActionArea>
          <Box m="1rem">
            <PayPalScriptProvider
              options={{
                'client-id':
                  'AbmmRlKwrnRbbNcyWQ58YMabSt6AfdfAoK7RN7rMAU111AWXn39w7_mc3A8Yo-ZQ53lX6mQARxuQ_dSQ',
              }}
            >
              <PayPalButtons
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: '13.99',
                        },
                      },
                    ],
                  });
                }}
                onApprove={async (data, actions) => {
                  const details = await actions.order.capture();
                  const name = details.payer.name.given_name;
                  Swal.fire(
                    'Payment Successful!',
                    ' Transaction completed by ' + name,
                    'success'
                  );
                }}
              />
            </PayPalScriptProvider>
          </Box>
        </Card>
      </Box>
      </Box>
      </>
  );
};

export default PaymentOptions;

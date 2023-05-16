import { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import axios from 'axios';

const TransactionDetailsPage = ({ transactionId, startTime, endTime, venue, price, organizer, paymentStatus }) => {
  const [billingData, setBillingData] = useState({
    transaction_id: transactionId,
    start_time: startTime,
    end_time: endTime,
    venue: venue,
    price: price,
    organizer: organizer,
    payment_status: paymentStatus,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
//   const history = useHistory();

  const handleSaveClick = async () => {
    try {
      setIsSaving(true);
      const response = await axios.post('/api/billings', billingData);
      console.log(response.data);
      // Optionally, you can display a success message to the user
     // history.push('/billing'); // Redirect the user to the billing page
    } catch (error) {
      console.error(error);
      // Optionally, you can display an error message to the user
    } finally {
      setIsSaving(false);
    }
  };

  const handlePrintClick = () => {
    setIsPrinting(true);
    // Implement the printing logic here
    setIsPrinting(false);
  };

  const handleBackClick = () => {
    //history.goBack(); // Redirect the user to the previous page
  };

  return (
    <Box m="1rem">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb="1rem">
        <Typography variant="h4">Transaction Details</Typography>
        <Button variant="contained" color="secondary" onClick={handleBackClick}>
          Back
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Field</TableCell>
              <TableCell>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Transaction ID</TableCell>
              <TableCell>{transactionId}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Start Time</TableCell>
              <TableCell>{startTime.toLocaleString()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>End Time</TableCell>
              <TableCell>{endTime.toLocaleString()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Venue</TableCell>
              <TableCell>{venue}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Price</TableCell>
              <TableCell>{price}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Organizer</TableCell>
              <TableCell>{organizer}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Payment Status</TableCell>
              <TableCell>{paymentStatus}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box mt="1rem">
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSaveClick}
          disabled={isSaving}
          style={{ marginRight: '1rem' }}
        >
          {isSaving ? 'Saving...' : 'Save'}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handlePrintClick}
          disabled={isPrinting}
          style={{ marginRight: '1rem' }}
        >
          {isPrinting ? 'Printing...' : 'Print'}
        </Button>
      </Box>
    </Box>
  );
};

export default TransactionDetailsPage;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableHead, TableBody, TableRow, TableCell, Button } from '@mui/material';

const Overview = () => {
    const [payments, setPayments] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/payments")
      .then((response) => setPayments(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleViewBill = (id) => {
    axios.get(`http://localhost:5000/api/payments/${id}/bill`)
      .then((response) => {
        // code to display the bill
      })
      .catch((error) => console.error(error));
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Venue</TableCell>
          <TableCell>Organizer</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {payments.map((payment) => (
          <TableRow key={payment._id}>
            <TableCell>{payment._id}</TableCell>
            <TableCell>{payment.venue}</TableCell>
            <TableCell>{payment.organizer}</TableCell>
            <TableCell>
              <Button onClick={() => handleViewBill(payment._id)}>View Bill</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Overview;

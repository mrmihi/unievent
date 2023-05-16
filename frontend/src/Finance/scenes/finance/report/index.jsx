import React from "react";
import Header from "../../../components/Header";
import FlexBetween from "../../../components/FlexBetween";
import  { useEffect, useState } from 'react';
import { Box, Grid, Typography, Button } from '@mui/material';
import axios from 'axios';
import MaterialReactTable from 'material-react-table';

const Report = () => {
    const [payments, setPayments] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/payments')
      .then((response) => setPayments(response.data))
      .catch((error) => console.error(error));
  }, []);

  // Filter payments into income and expense arrays
  const income = payments.filter((payment) => payment.price > 0);
  const expenses = payments.filter((payment) => payment.price < 0);

  // Calculate total income and expenses
  const totalIncome = income.reduce((acc, curr) => acc + curr.price, 0);
  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.price, 0);

  const isProfit = totalIncome - totalExpenses >= 0;
  const profitLossText = isProfit ? 'Profit' : 'Loss';
  const profitLossColor = isProfit ? 'green' : 'red';

  // Define columns for the income and expenses tables
  const columns = [
    { header: 'Payment ID', accessorKey: '_id' },
    { header: 'Price', accessorKey: 'price' },
  ];

  

  return (
    <Box m="1.5rem 2.5rem">
      <Box mb="2rem">
        <Typography variant="h2">Payments and Refunds Report</Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Box mb="1rem">
            <Typography variant="h4" mb="1rem">
              Payment
            </Typography>
            <MaterialReactTable columns={columns} data={income} />
            <Box mt="1rem">
              <Typography variant="h5">Total Payments: {totalIncome}</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box mb="1rem">
            <Typography variant="h4" mb="1rem">
              Refund
            </Typography>
            <MaterialReactTable columns={columns} data={expenses} />
            <Box mt="1rem">
              <Typography variant="h5">Total Refunds: {totalExpenses}</Typography>
            </Box>
          </Box>
          <Typography variant="h4" style={{ color: profitLossColor }}>
            Balance: {totalIncome - totalExpenses}
          </Typography>
        </Grid>
      </Grid>
      
    </Box>
  );
};

export default Report;


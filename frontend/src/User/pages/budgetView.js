import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Cookie from 'js-cookie';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const DeleteButton = styled(Button)(({ theme }) => ({
  color: theme.palette.error.main,
  border: `1px solid ${theme.palette.error.main}`,
  borderRadius: theme.shape.borderRadius,
  transition: 'all 0.2s',
  '&:hover': {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.common.white,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 18,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

// function createData(description, amount, createdat) {
//   return { description, amount, createdat };
// }

// const rows = [
//   createData('donations' ,1000, '2023-04-27'),
//   createData('ticket sales' ,2000,'2023-04-27'),
//   createData('Hall rent',1000,'2023-04-27'),
// ];


export default function CustomizedTables() {

  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [totalIncomeAmount, setTotalIncomeAmount] = useState('');
  const [totalExpenseAmount, setTotalExpenseAmount] = useState('');

  
  const { event_id } = useParams();
  // const eventId = urlParams.get('event_id');
  console.log(event_id);

  useEffect(() => {
    axios.get(`/api/budgets/${event_id}`).then((response) => {
      console.log(response.data);
      setIncome(response.data[0].income);
      console.log(response.data.income);

      setExpenses(response.data[0].expenses);
      setTotalIncomeAmount(response.data.totalIncomeAmount);
      setTotalExpenseAmount(response.data.totalExpenseAmount);
    });
  },[]);

  const handleDelete=()=>{

  };

  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', fontSize: '20px' }}>
      <Box sx={{ display: 'flex', width: '50%', marginRight: '10px', marginLeft: '10px', flexDirection: 'column' }}>
        <Typography variant="h2" sx={{ marginBottom: '20px', fontWeight: 'bold' }}>Income</Typography>
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead >
              <TableRow>
                <StyledTableCell align="left">Description</StyledTableCell>
                <StyledTableCell align="left">Amount</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {income && income.map((item) => (
                <StyledTableRow key={item._id}>
                  <StyledTableCell align="left">{item.description}</StyledTableCell>
                  <StyledTableCell align="left">{item.amount}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box sx={{ display: 'flex', width: '50%', marginLeft: '10px', marginRight: '10px', flexDirection: 'column' }}>
        <Typography variant="h2" sx={{ marginBottom: '20px', fontWeight: 'bold' }}>Expenses</Typography>
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">Description</StyledTableCell>
                <StyledTableCell align="left">Amount</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {expenses && expenses.map((item) => (
                <StyledTableRow key={item._id}>
                  <StyledTableCell align="left">{item.description}</StyledTableCell>
                  <StyledTableCell align="left">{item.amount}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box>
        
        </Box>

      </Box>   
    </Box>
    
    
    
    
  );
}

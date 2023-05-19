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
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import BudgetPDF from '../pdf/BudgetPDF';
import Grid from '@mui/material/Grid';
import Swal from 'sweetalert2';
import { useCallback} from 'react';


const DeleteButton = styled(Button)(({ theme }) => ({
  color: theme.palette.error.main,
  border: `1px solid ${theme.palette.error.main}`,
  borderRadius: theme.shape.borderRadius,
  transition: 'all 0.2s',
  '&:hover': {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.common.white,
  },
  height: 40,
  width: 500,
}));

const PdfButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  borderRadius: theme.shape.borderRadius,
  transition: 'all 0.2s',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
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


export default function CustomizedTables() {



  const { event_id } = useParams();
  // const eventId = urlParams.get('event_id');
  console.log(event_id);

  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [totalIncomeAmount, setTotalIncomeAmount] = useState();
  const [totalExpenseAmount, setTotalExpenseAmount] = useState();
  const [tableData, setTableData] = useState(null);
  const [organizationName, setOrganizationName] = useState('');
  const [eventName, setEventName] = useState('');
  const [createdDate, setCreatedDate] = useState('');
  const [budgetId, setBudgetId] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/api/budgets/${event_id}`)
    .then((response) => {
      if (response.data) {
        setIncome(response.data[0].income || null);
        setExpenses(response.data[0].expenses || null);
        setTotalIncomeAmount(response.data[0].totalIncome || null);
        setTotalExpenseAmount(response.data[0].totalExpenses||null);
        setOrganizationName(response.data[0].organizationName || null);
        setEventName(response.data[0].eventName || null);
        setTableData(response.data || null);
        setCreatedDate(response.data[0].createdDate || null);
        setBudgetId(response.data[0]._id || null);
        console.log(response.data[0]._id);
        console.log(response.data);
      } else {
        console.log('Error: data not found');
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }, [event_id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}/${month < 10 ? '0' + month : month}/${day < 10 ? '0' + day : day}`;
  }

  const navigate = useNavigate()

  const handleDelete = useCallback(
    (row) => {
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
          .delete(`http://localhost:5000/api/budgets/${budgetId}`)
          .then((response) => {
            Swal.fire('Deleted!', "Deleted The budget", 'success');
            console.log(response.data);
            navigate(`/org/dashboard/events/${event_id}`)
          });
         
          
        }
      });
    },
    [tableData]
  );

  return (
    <Grid>

<Box sx={{
  display: 'grid',
  placeItems: 'center',
  textAlign: 'center',
  backgroundColor: '#DAF1F4',
  borderRadius: '10px',
  padding: '40px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
}}>
  <Typography variant="h1" sx={{
    fontSize: '4rem',
    marginBottom: '20px',
    fontWeight: 'bold',
    color: '#333',
    textShadow: '1px 1px 4px rgba(0, 0, 0, 0.2)',
  }}>Budget Report</Typography>
  <Typography variant="h2" sx={{
    fontSize: '2rem',
    marginBottom: '10px',
    fontWeight: 'bold',
    color: '#333',
  }}>Organization: {organizationName}</Typography>
  <Typography variant="h2" sx={{
    fontSize: '2rem',
    marginBottom: '10px',
    fontWeight: 'bold',
    color: '#333',
  }}>Event: {eventName}</Typography>
  <Typography variant="h4" sx={{ marginTop: '20px', fontWeight: 'bold' }}>Created Date: {createdDate ? formatDate(createdDate) : null}</Typography>
</Box>
    
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

                <StyledTableCell align="left">Amount($)</StyledTableCell>
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

            <Typography variant="h3" sx={{ marginBottom: '20px', fontWeight: 'bold',marginTop:'50px' }}>Total Income Amount:$ {totalIncomeAmount}</Typography>
            <Typography variant="h3" sx={{ marginBottom: '20px', fontWeight: 'bold' }}>Total Expense Amount:$  {totalExpenseAmount}</Typography>
            
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px', gap: '20px' }} padding={6}>

          <BudgetPDF tableData={tableData} />

          <DeleteButton variant="outlined" onClick={handleDelete}>
            Delete the Budget
          </DeleteButton>

        </Box>
        <Box>

        </Box>

      </Box>
    </Box>
    </Grid>

  );
}

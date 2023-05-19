import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
// import Alert from '@mui/material/Alert';
// import BudgetPDF from './bugetPDF';
import { useNavigate } from 'react-router-dom';
import { Cookie } from '@mui/icons-material';
import Cookies from 'js-cookie';
import {useHistory} from 'react-router-dom';
import { useParams } from 'react-router-dom';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        UniEventPro
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const currentDate = new Date().toLocaleString('en-GB', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric'
});





const theme = createTheme();




export default function BudgetForm() {

  const { eventid } = useParams();

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     incomedescription: data.get('incomedescription'),
  //     incomeamount: data.get('incomeamount'),
  //   });
  // };

  const navigate = useNavigate();

  const [incomerows, setIncomeRows] = useState([
    { description: '', amount: 0 },
  ]);

  const [expenserows, setExpenseRows] = useState([
    { description: '', amount: 0 },
  ]);

  const addIncomeRow = () => {
    //add a new row
    setIncomeRows([...incomerows, { description: '', amount: 0 }]);
    console.log(incomerows);
    const newPrice = Number(incomerows[incomerows.length - 1].amount);
    console.log(newPrice);
    setTotalIncomeAmount(totalIncomeAmount + newPrice);

  }

  const deleteIncomeRow = (index) => {
    if (index === 0) return;//don't delete the first row
    console.log(index);
    //delete the row
    const newRows = [...incomerows];
    newRows.splice(index, 1);//remove the row
    setIncomeRows(newRows);//update the state
    console.log(incomerows);
  };

  const addExpenseRow = () => {
    //add a new row
    setExpenseRows([...expenserows, { description: '', amount: 0 }]);
    console.log(expenserows);
    const newPrice = Number(expenserows[expenserows.length - 1].amount);
    console.log(newPrice);
    setTotalExpenseAmount(totalExpenseAmount + newPrice);
  }

  const deleteExpenseRow = (index) => {
    if (index === 0) return;//don't delete the first row
    console.log(index);
    //delete the row
    const newRows = [...expenserows];
    newRows.splice(index, 1);//remove the row
    setExpenseRows(newRows);//update the state
    console.log(expenserows);
  };

  // useEffect(() => {
  //     //calculate the total income here
  // },[rows]);

  const [income, setIncome] = useState([{ description: '', amount: 0 }]);
  const [expenses, setExpenses] = useState([{ description: '', amount: 0 }]);
  const [totalIncomeAmount, setTotalIncomeAmount] = useState(0);
  const [totalExpenseAmount, setTotalExpenseAmount] = useState(0);
  const [budgetId, setBudgetId] = useState(null);
  const [eventName, setEventName] = useState(null);
  const [organizationName, setOrganizationName] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault(); // prevent default form submission
  
    const Budget = {
      income: income,
      expenses: expenses,
      eventId: eventid,
      organizationName: organizationName,
      eventName: eventName,

    };
  
    try {
      console.log("budget",Budget);
  
      // Send POST request to create budget
      await axios.post('http://localhost:5000/api/budgets/create', Budget);
  
      alert('Successful'); // alert user
    } catch (error) {
      console.log(error);
      alert('Error'); // alert user
    }
  };

  


  if (!incomerows) return (<>Loading....</>)

  return (
    <ThemeProvider theme={theme}>

      <Box component="form" noValidate onSubmit={handleSubmit}>

      <Grid>
        <Typography component="h1" variant="h2" align='center' fontAmount='bold'>
          Budget Report
        </Typography>
        <Typography align='center' component="h1" variant="h6">
          <br></br>
          Organization:
          <TextField
                  required
                  id="organizationName"
                  label="organizationName"
                  name="organizationName"
                  value={organizationName}
                  onChange={(e) => setOrganizationName(e.target.value)}
                />
          <br></br>
          Event Name:
          <TextField
                  required
                  id="eventName"
                  label="eventName"
                  name="eventName"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                />
          <br></br>
          Date: {currentDate}
        </Typography>
      </Grid>





        <Grid container component="main" sx={{ height: '90vh' }}>

          {/* expenses */}
          <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square
            sx={{
              '&:hover': {
                backgroundColor: '#BADFC2'
              },
              borderRadius: 2,
            }}
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',

              }}
            >
              <Typography component="h1" variant="h5" fontAmount='bold'>
                Add Income
              </Typography>

              <Box noValidate sx={{ mt: 1}}  width ="100%">
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 800 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="left">Income Description</StyledTableCell>
                        <StyledTableCell align="right">Amount</StyledTableCell>
                        <StyledTableCell align="right">Add</StyledTableCell>
                        <StyledTableCell align="right">Cancel</StyledTableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {incomerows.map((row, index) => (

                        <TableRow key={index}>
                          <TableCell>

                            <TextField
                              id="outlined-multiline-flexible"
                              // label="Multiline"
                              placeholder='description'
                              multiline
                              value={row.description}
                              maxRows={4}
                              sx={{ width: '40ch' }}
                              onChange={(event) => {
                                const newRows = [...incomerows];
                                newRows[index].description = event.target.value;
                                setIncomeRows(newRows);
                                console.log(newRows);
                                setIncome(newRows);


                              }}
                            // value={income}
                            // onChange={(e) => setIncome(e.target.value)}

                            />

                          </TableCell>

                          <TableCell style={{ textAlign: 'right' }}>
                            <TextField
                              // label="With normal TextField"
                              type="number"

                              id="outlined-start-adornment"
                              sx={{ m: 0, width: '25ch' }}
                              InputProps={{
                                startAdornment: <InputAdornment position="start">$.</InputAdornment>,
                              }}
                              value={row.amount}
                              onChange={(event) => {
                                const newRows = [...incomerows];
                                newRows[index].amount = event.target.value;
                                setIncomeRows(newRows);
                                setIncome(newRows);
                              
                              }}
                            />

                          </TableCell>

                          <TableCell style={{ textAlign: 'right' }}>

                            <Button variant="contained" color="primary" sx={{ borderRadius: '50%', fontSize: '1.4rem' }} onClick={addIncomeRow}  >+</Button>
                          </TableCell>

                          <TableCell style={{ textAlign: 'right' }}>
                            <IconButton aria-label="delete" size="large" onClick={() => deleteIncomeRow(index)}>
                              <DeleteIcon fontSize="large" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>


                  </Table>
                </TableContainer>
                <Box > {/* pushes the content to the bottom */}
                  <Grid item mt={1} component={Paper} elevation={6} square borderRadius={2}>
                    <Box>
                      <Typography component="h1" variant="h5" fontAmount='bold'>
                        Total Income:$ {totalIncomeAmount}
                      </Typography>
                    </Box>
                  </Grid>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* expenses */}
          <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square
            sx={{
              '&:hover': {
                backgroundColor: '#E399A7'
              },
              borderRadius: 2,
            }}
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography component="h1" variant="h5" fontAmount='bold'>
                Add Expenses
              </Typography>
              <Box component="form" noValidate sx={{ mt: 1 }} width ="100%">

                {/* form in here  */}

                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 800 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="left">Income Description</StyledTableCell>
                        <StyledTableCell align="right">Amount</StyledTableCell>
                        <StyledTableCell align="right">Add</StyledTableCell>
                        <StyledTableCell align="right">Cancel</StyledTableCell>
                      </TableRow>
                    </TableHead>



                    <TableBody>
                      {expenserows.map((row, index) => (

                        <TableRow key={index}>
                          <TableCell>

                            <TextField
                              id="outlined-multiline-flexible"
                              // label="Multiline"
                              placeholder='description'
                              multiline
                              value={row.description}
                              maxRows={4}
                              sx={{ width: '40ch' }}
                              onChange={(event) => {
                                const newRows = [...expenserows];

                                newRows[index].description = event.target.value;
                                console.log(newRows)
                                setExpenseRows(newRows);
                                setExpenses(newRows);
                              }}
                            />

                          </TableCell>

                          <TableCell style={{ textAlign: 'right' }}>
                            <TextField
                              // label="With normal TextField"
                              type='number'
                              id="outlined-start-adornment"
                              sx={{ m: 0, width: '25ch' }}
                              InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                              }}
                              value={row.amount}
                              onChange={(event) => {
                                const newRows = [...expenserows];
                                newRows[index].amount = event.target.value;
                                setExpenseRows(newRows);
                                setExpenses(newRows);
                              }}
                            />

                          </TableCell>

                          <TableCell style={{ textAlign: 'right' }}>

                            <Button variant="contained" color="primary" sx={{ borderRadius: '50%', fontSize: '1.4rem' }} onClick={addExpenseRow} >+</Button>
                          </TableCell>

                          <TableCell style={{ textAlign: 'right' }}>
                            <IconButton aria-label="delete" size="large" onClick={() => deleteExpenseRow(index)}>
                              <DeleteIcon fontSize="large" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <Box> {/* pushes the content to the bottom */}
                  <Grid item mt={1} component={Paper} elevation={6} square borderRadius={2}>
                    <Box >
                      <Typography component="h1" variant="h5" fontAmount='bold'>
                        Total Expenses:$ {totalExpenseAmount}
                      </Typography>
                    </Box>
                  </Grid>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ mt: 1 }} textAlign="right">
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2, fontSize: 20, mr: 2 }}
            onClick={()=>{
                navigate(`/org/dashboard/events/${eventid}`)

            }}
          >
            Back
          </Button>
          {/* <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2, fontSize: 20, mr: 2 }}
            onClick={()=>{
              navigate("/admin/event/budget/view")
          }}
          >
            View Report
          </Button> */}
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2, fontSize: 20 }}
          >
            Create
          </Button>
        </Box>       
      </Box>
      {/* <BudgetPDF expenses={expenses} income={income}/> */}
      <Copyright sx={{ mt: 4, mr: 9 }} />
    </ThemeProvider>
  );
}
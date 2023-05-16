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

function createData(description, amount, createdat) {
  return { description, amount, createdat };
}

const rows = [
  createData('donations' ,1000, '2023-04-27'),
  createData('ticket sales' ,2000,'2023-04-27'),
  createData('Hall rent',1000,'2023-04-27'),
];

export default function CustomizedTables() {

  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', fontSize: '20px' }}>
  <Box sx={{ display: 'flex', width: '50%', marginRight: '10px', marginLeft: '10px', flexDirection: 'column' }}>
    <Typography variant="h2" sx={{ marginBottom: '20px',fontWeight:'bold' }}>Income</Typography>
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead >
          <TableRow>
            <StyledTableCell align="left">Description</StyledTableCell>
            <StyledTableCell align="left">Amount</StyledTableCell>
            <StyledTableCell align="left">Created At</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.type}>
              <StyledTableCell align="left">{row.description}</StyledTableCell>
              <StyledTableCell align="left">{row.amount}</StyledTableCell>
              <StyledTableCell align="left">{row.createdat}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    
  </Box>

  <Box sx={{ display: 'flex', width: '50%', marginLeft: '10px', marginRight: '10px', flexDirection: 'column' }}>
    <Typography variant="h2" sx={{ marginBottom: '20px',fontWeight:'bold'  }}>Expenses</Typography>
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              
              <StyledTableCell align="left">Description</StyledTableCell>
              <StyledTableCell align="left">Amount</StyledTableCell>
              <StyledTableCell align="left">Created At</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.type}>
                <StyledTableCell align="left">{row.description}</StyledTableCell>
                <StyledTableCell align="left">{row.amount}</StyledTableCell>
                  <StyledTableCell align="left">{row.createdat}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
      </Table>
    </TableContainer>
    
  </Box>
</Box>

    
  );
}
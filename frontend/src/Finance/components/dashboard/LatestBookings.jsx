import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, Table, TableBody, TableRow, TableCell } from "@mui/material";

const LatestBookings = () => {
  const [latestTransactions, setLatestTransactions] = useState([]);

  useEffect(() => {
    const fetchLatestTransactions = async () => {
      try {
        const response = await axios.get("/api/payments?limit=5");
        setLatestTransactions(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLatestTransactions();
  }, []);

  return (
    <Box ml={2}>
      <Typography variant="h5" gutterBottom mb={2}>
        Latest Transactions
      </Typography>
      <Table>
        <TableBody>
          {latestTransactions.map((transaction, index) => (
            <TableRow key={index}>
              <TableCell>
                <Typography variant="subtitle1">
                  {transaction._id}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Price: ${transaction.price}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default LatestBookings;
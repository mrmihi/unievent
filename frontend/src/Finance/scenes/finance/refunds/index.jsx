import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Box, Button, Grid } from "@mui/material";
import FlexBetween from "../../../components/FlexBetween";
import Header from "../../../components/Header";
import MaterialReactTable from "material-react-table";

const Refunds = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/payments")
      .then((response) => setReviews(response.data.filter(review => review.price < 0)))
      .catch((error) => console.error(error));
  }, []);

  function handleEdit() {}

  function handleDelete() {}

  const columns = useMemo(
    () => [
      { accessorKey: null, header: "ID", Cell: ({ row }) => row.index + 1 },
      { accessorKey: "_id", header: "Payment_ID" },
      { accessorKey: "start_time", header: "start_time" },
      { accessorKey: "end_time", header: "end_time" },
      { accessorKey: "status", header: "status" },
      { accessorKey: "price", header: "price" },
      { accessorKey: "organizer", header: "Organizer" },
      { accessorKey: "venue", header: "Venue" },
      
    ],
    []
  );

  const totalIncome = reviews.reduce((acc, cur) => acc + cur.price, 0);
  const isProfit = totalIncome > 0;

  return (
    <Box m="0.5">
      <Box>
        <FlexBetween>
          <Header title="All Refunds" />
          {isProfit ? (
            <p style={{ color: "green" }}>Profit: {totalIncome}</p>
          ) : (
            <p style={{ color: "red" }}>Loss: {totalIncome}</p>
          )}
        </FlexBetween>
        <Grid sx={{ margin: "0.5rem" }}>
          <MaterialReactTable columns={columns} data={reviews}
          initialState={{
            columnVisibility: { _id: false, venue: false , organizer:false},
            density: 'compact',
          }} />
        </Grid>
      </Box>
    </Box>
  );
};

export default Refunds;
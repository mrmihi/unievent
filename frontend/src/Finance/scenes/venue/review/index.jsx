import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
  Grid
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import MaterialReactTable from "material-react-table";

const Review = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/payments")
      .then((response) => setReviews(response.data.filter(review => review.price > 0)))
      .catch((error) => console.error(error));
  }, []);

  // function handleEdit() {}

  // function handleDelete() {}

  // function setEditingRow(){}

  function handleDeleteRow(){

  }

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
      // {
      //   header: "Edit",
      //   Cell: ({ row }) => (
      //     <Button variant="contained" color="warning" onClick={() => handleEdit(row._id)}>
      //       Edit
      //     </Button>
      //   ),
      // },
      // {
      //   header: "Delete",
      //   Cell: ({ row }) => (
      //     <Button variant="contained" color="error" onClick={() => handleDelete(row._id)}>
      //       Delete
      //     </Button>
      //   ),
      // },
    ],
    []
  );

  const totalIncome = reviews.reduce((acc, cur) => acc + cur.price, 0);
  const isProfit = totalIncome > 0;

  return (
    <Box m="1.5rem 2.5rem">
      <Box>
        <FlexBetween>
          <Header title="All Payments" />
          {isProfit ? (
            <p style={{ color: "green" }}>Profit: {totalIncome}</p>
          ) : (
            <p style={{ color: "red" }}>Loss: {totalIncome}</p>
          )}
        </FlexBetween>
        <Grid sx={{ margin: "5px" }}>
          <MaterialReactTable 
          displayColumnDefOptions={{
            "mrt-row-actions": {
              muiTableHeadCellProps: {
                align: "center",
              },
              size: 120,
            },
          }}
          columns={columns} data={reviews} 
          renderRowActions={({ row, table }) => (
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <Tooltip arrow placement="left" title="Edit">
                <IconButton onClick={() => table.setEditingRow(row)}>
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip arrow placement="right" title="Delete">
                <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                  <Delete />
                </IconButton>
              </Tooltip>
            </Box>
          )}
          />
        </Grid>
      </Box>
    </Box>
  );
};

export default Review;


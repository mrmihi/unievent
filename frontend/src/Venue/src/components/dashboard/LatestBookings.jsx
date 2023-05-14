import React, { useState } from "react";
import { Box, Typography, Table, TableBody, TableRow, TableCell } from "@mui/material";
import { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const LatestBookings = () => {
    const [latestBookings, setLatestBookings] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/dashboard/bookings", {
            headers: {
                Authorization: `Bearer ${Cookies.get("accessToken")}`,
            },
        }).then((response) => {
            setLatestBookings(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <Box ml={2}>
            <Typography variant="h5" gutterBottom mb={2}>
                Latest Bookings
            </Typography>
            <Table>
                <TableBody>
                    {latestBookings.map((booking, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <Typography variant="subtitle1">
                                    Event - {booking.event.name}
                                </Typography>
                                <Typography variant="body1" color="textSecondary">
                                    Price: ${booking.price} | Hall: {booking.venue.name}
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="body2" color="textSecondary">
                                    {booking.created_at}
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
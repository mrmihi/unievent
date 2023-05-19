import React, { useState, useEffect } from "react";
import { Box, Typography, Table, TableBody, TableRow, TableCell } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import moment from "moment";

const LatestBookings = ({ heading }) => {
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
            <Typography variant="h5" gutterBottom mb={2} sx={{ fontWeight: 'bold' }}>
                {heading}
            </Typography>
            {latestBookings.length === 0 ? (
                <Typography variant="body1" color="textSecondary" mb={2}>
                    No Latest Bookings
                </Typography>
            ) : (
                <Table>
                    <TableBody>
                        {latestBookings.map((booking, index) => (
                            <TableRow
                                key={index}
                                sx={{
                                    "&:hover": {
                                        backgroundColor: "#F7FAFC",
                                        cursor: "pointer",
                                    },
                                    borderRadius: "2rem"
                                }}
                            >
                                <TableCell>
                                    <Typography variant="subtitle1">
                                        Event - {booking.event.name}
                                    </Typography>
                                    <Typography variant="body1" color="textSecondary">
                                        Price: ${booking.price.toFixed(2)} | Hall: {booking.venue.name}
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="body2" color="textSecondary">
                                        {moment(booking.date).format("DD MMM YYYY")}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </Box>
    );
};

export default LatestBookings;

import React, { useState } from "react";
import { Box, Typography, Table, TableBody, TableRow, TableCell } from "@mui/material";

const LatestBookings = () => {
    const [latestBookings, setLatestBookings] = useState([
        {
            venueName: "Venue A",
            eventName: "Event 1",
            price: 200,
            hall: "Hall 1",
            time: "2023-04-21",
        },
        {
            venueName: "Venue B",
            eventName: "Event 2",
            price: 350,
            hall: "Hall 2",
            time: "2023-03-29",
        },
        {
            venueName: "Venue C",
            eventName: "Event 3",
            price: 500,
            hall: "Hall 3",
            time: "2023-03-27",
        },
        {
            venueName: "Venue D",
            eventName: "Event 4",
            price: 150,
            hall: "Hall 4",
            time: "2023/03/11",
        },
        {
            venueName: "Venue D",
            eventName: "Event 4",
            price: 150,
            hall: "Hall 4",
            time: "2023/03/11",
        },
    ]);
    
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
                                    {booking.venueName} - {booking.eventName}
                                </Typography>
                                <Typography variant="body1" color="textSecondary">
                                    Price: ${booking.price} | Hall: {booking.hall}
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="body2" color="textSecondary">
                                    {booking.time}
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
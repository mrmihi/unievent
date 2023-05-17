import { Box, Typography, Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import DoorSlidingIcon from '@mui/icons-material/DoorSliding';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import ReviewsIcon from '@mui/icons-material/Reviews';
import SellIcon from '@mui/icons-material/Sell';

const FourAnalytics = () => {
    const [venuesCount, setVenuesCount] = useState(0);
    const [totalBookings, setTotalBookings] = useState(0);
    const [avgReview, setAvgReview] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);

    useEffect(() => {
        // fetch data from backend
        axios.get("http://localhost:5000/api/dashboard/venues").then((res) => {
            setVenuesCount(res.data.venueCount);
            setTotalBookings(res.data.bookingCount);
            setAvgReview(res.data.reviewCount);
            setTotalIncome(res.data.revenue);
            console.log(venuesCount);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    return (

        <Box display="flex" justifyContent="space-between" sx={{ marginTop: "2rem", }}>
            <Box
                sx={{
                    backgroundColor: "#F7FAFC",
                    width: "20%",
                    padding: "1rem",
                    borderRadius: "0.5rem",
                    transition: "box-shadow 0.2s ease",
                    "&:hover": {
                        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                    },
                }}
            >
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="h5">Venues Count</Typography>
                            <Typography variant="h4" mt={2} ml={3}>{venuesCount}</Typography>
                        </Box>
                    </Grid>
                    <Grid item ml={10}>
                        <DoorSlidingIcon sx={{ fontSize: 50, float: 'right', color: '#AED9FF' }} />
                    </Grid>
                </Grid>
            </Box>

            <Box
                sx={{
                    backgroundColor: "#F7FAFC",
                    width: "20%",
                    padding: "1rem",
                    borderRadius: "0.5rem",
                    transition: "box-shadow 0.2s ease",
                    "&:hover": {
                        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                    },
                }}
            >
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="h5">Total Bookings</Typography>
                            <Typography variant="h4" mt={2} ml={3}>{totalBookings}</Typography>
                        </Box>
                    </Grid>
                    <Grid item ml={10}>
                        <BookmarkAddedIcon sx={{ fontSize: 50, float: 'right', color: '#AED9FF' }} />
                    </Grid>
                </Grid>
            </Box>

            <Box
                sx={{
                    backgroundColor: "#F7FAFC",
                    width: "20%",
                    padding: "1rem",
                    borderRadius: "0.5rem",
                    transition: "box-shadow 0.2s ease",
                    "&:hover": {
                        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                    },
                }}
            >
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="h5">Total Reviews</Typography>
                            <Typography variant="h4" mt={2} ml={3}>{avgReview}</Typography>
                        </Box>
                    </Grid>
                    <Grid item ml={10}>
                        <ReviewsIcon sx={{ fontSize: 50, float: 'right', color: '#AED9FF' }} />
                    </Grid>
                </Grid>
            </Box>

            <Box
                sx={{
                    backgroundColor: "#F7FAFC",
                    width: "20%",
                    padding: "1rem",
                    borderRadius: "0.5rem",
                    transition: "box-shadow 0.2s ease",
                    "&:hover": {
                        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                    },
                }}
            >
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="h5">Total Income</Typography>
                            <Typography variant="h4" mt={2} ml={3}>{totalIncome.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</Typography>
                        </Box>
                    </Grid>
                    <Grid item ml={10}>
                        <SellIcon sx={{ fontSize: 50, float: 'right', color: '#AED9FF' }} />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default FourAnalytics;
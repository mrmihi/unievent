import { Box, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const FourAnalytics = () => {
    const [venuesCount, setVenuesCount] = useState(0);
    const [totalBookings, setTotalBookings] = useState(0);
    const [avgReview, setAvgReview] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);

    useEffect(() => {
        // fetch data from backend
        axios.get("http://localhost:5000/api/dashboard/venues").then((res) => {
            console.log(res.data);
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
                <Typography variant="h5">Venues Count</Typography>
                <Typography variant="h4" mt={2} sx={{textAlign: "center"}}>
                    {venuesCount}
                </Typography>
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
                <Typography variant="h5">Total Bookings</Typography>
                <Typography variant="h4" mt={2} sx={{textAlign: "center"}}>
                    {totalBookings}
                </Typography>
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
                <Typography variant="h5">Total Reviews</Typography>
                <Typography variant="h4" mt={2} sx={{textAlign: "center"}}>
                    {avgReview}
                </Typography>
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
                <Typography variant="h5">Total Income</Typography>
                    <Typography variant="h4" mt={2} sx={{ textAlign: "center" }}>
                        {totalIncome.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                    </Typography>
            </Box>
        </Box>
    )
}

export default FourAnalytics;
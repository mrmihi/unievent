import { Box, Typography } from "@mui/material";

const FourAnalytics = () => {
    const venuesCount = 25;
    const totalBookings = 189;
    const avgReview = 4.2;
    const totalIncome = "$25,000";

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
                <Typography variant="h4" mt={2}>
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
                <Typography variant="h4" mt={2}>
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
                <Typography variant="h5">Avg. Review</Typography>
                <Typography variant="h4" mt={2}>
                    {avgReview.toFixed(1)}
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
                <Typography variant="h4" mt={2}>
                    {totalIncome}
                </Typography>
            </Box>
        </Box>
    )
}

export default FourAnalytics;
import { Box, Typography } from "@mui/material";
import { useEffect,useState } from "react";

const FourAnalytics = () => {
    const [totalPayments, setTotalPayments] = useState(0);
    const [totalRefunds, setTotalRefunds] = useState(0);
    const [refundPercentage, setRefundPercentage] = useState(0);
    const [countTransactions, setCountTransactions] = useState(0);
    
    useEffect(() => {
    fetch("http://localhost:5000/api/payments")
    .then((response) => response.json())
    .then((data) => {
    let payments = 0;
    let refunds = 0;

    data.forEach((payment) => {
        if (payment.price > 0) {
          payments += payment.price;
        } else {
          refunds += Math.abs(payment.price);
        }
      });
  
      setTotalPayments(payments);
      setTotalRefunds(refunds);
      setRefundPercentage(((refunds / payments) * 100).toFixed(2));
      setCountTransactions(data.length);
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
                <Typography variant="h5">Payments Count</Typography>
                <Typography variant="h4" mt={2}>
                    {countTransactions}
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
                <Typography variant="h5">Total Payments</Typography>
                <Typography variant="h4" mt={2}>
                    ${totalPayments}
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
                <Typography variant="h5">Total Refunds</Typography>
                <Typography variant="h4" mt={2}>
                    ${totalRefunds}
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
                <Typography variant="h5">Refund Percentage</Typography>
                <Typography variant="h4" mt={2}>
                    {refundPercentage} %
                </Typography>
            </Box>
        </Box>
    )
}

export default FourAnalytics;
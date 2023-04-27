import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Chart from "chart.js/auto";


const PaymentChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Fetch payment data from an API or backend server
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/payments");
        const paymentData = await response.json();

        // Format the payment data into Chart.js format
        const chartLabels = ["Total Payments", "Total Refund"];
        //const chartDataPoints = [paymentData.totalPayments, paymentData.totalRefund];

        setChartData({
          labels: chartLabels,
          datasets: [
            {
              label: "Payments",
              data: [paymentData.totalPayments],
              backgroundColor: "#2E8B57",
            },
            {
              label: "Refund",
              data: [paymentData.totalRefund],
              backgroundColor: "#FF5733",
            },
          ],
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Create the chart instance when chartData is updated
    // if (chartData) {
      const chartConfig = {
        type: "bar",
        data: chartData,
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function (value, index, values) {
                  return "$" + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                },
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      };

      
    // }
     const chartCanvas = document.getElementById("payment-chart");
      new Chart(chartCanvas, chartConfig);
    return () => {
      chartCanvas.destroy()
        
    }

 
  }, [chartData]);

  return (
    <Box display="flex" flexDirection="column" alignItems="left" maxHeight={400}>
      <Typography variant="h5" gutterBottom>Total Payments and Refunds</Typography>
      <canvas id="payment-chart"></canvas>
    </Box>
  );
};

export default PaymentChart;

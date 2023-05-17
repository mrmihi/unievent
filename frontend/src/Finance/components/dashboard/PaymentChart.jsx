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

        // Calculate total positive payments and total negative payments
        let totalPositivePayments = 0;
        let totalNegativePayments = 0;
        paymentData.forEach((payment) => {
          if (payment.price >= 0) {
            totalPositivePayments += payment.price;
          } else {
            totalNegativePayments += payment.price;
          }
        });

        setChartData({
          labels: ["Total Payments and Refunds"],
          datasets: [
            {
              label: "Total Payments",
              data: [totalPositivePayments],
              backgroundColor: "#2E8B57",
            },
            {
              label: "Total Refunds",
              data: [totalNegativePayments],
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
    if (chartData) {
      const chartConfig = {
        type: "bar",
        data: chartData,
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function (value, index, values) {
                  return  "$ " + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                },
              },
            },
          },
          plugins: {
            legend: {
              display: true,
            },
          },
        },
      };

      const chartCanvas = document.getElementById("payment-chart");
      new Chart(chartCanvas, chartConfig);
      // return () => {
      //   chartCanvas.destroy();
      // };
    }
  }, [chartData]);

  return (
    <Box display="flex" flexDirection="column" alignItems="left" maxHeight={400}>
      <Typography variant="h" gutterBottom>Total Payments and Refunds</Typography>
      <canvas id="payment-chart"></canvas>
    </Box>
  );
};

export default PaymentChart;
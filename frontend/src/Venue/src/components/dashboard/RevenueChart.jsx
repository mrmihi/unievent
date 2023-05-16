import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Chart from "chart.js/auto";
import axios from "axios";
import Cookies from "js-cookie";

const RevenueChart = () => {
    const [chartData, setChartData] = useState(null);
    const [revenue, setRevenue] = useState(0);

    useEffect(() => {
        // Fetch revenue data from an API or backend server
        axios.get("http://localhost:5000/api/dashboard/revenue", {
            headers: {
                Authorization: `Bearer ${Cookies.get("accessToken")}`,
            },
        }).then((res) => {
            setRevenue(res.data);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    useEffect(() => {
        // Fetch revenue data from an API or backend server
        const revenueData = revenue;
    
        // Format the revenue data into Chart.js format
        if (revenueData && revenueData.length > 0) {
            const chartLabels = revenueData.map((data) => `${data.year} ${data.month}`);
            const chartDataPoints = revenueData.map((data) => data.revenue);
    
            setChartData({
                labels: chartLabels,
                datasets: [
                    {
                        label: "Revenue",
                        data: chartDataPoints,
                        fill: false,
                        borderColor: "#1DA1F2",
                    },
                ],
            });
        }
    }, [revenue]);
    

    useEffect(() => {
        // Create the chart instance when chartData is updated
        if (chartData) {
            const chartConfig = {
                type: "line",
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

            const chartCanvas = document.getElementById("revenue-chart");
            new Chart(chartCanvas, chartConfig);
        }
    }, [chartData]);

    return (
        <Box display="flex" flexDirection="column" alignItems="left" maxHeight={400}>
            <Typography variant="h5" gutterBottom>Revenue Generated</Typography>
            <canvas id="revenue-chart"></canvas>
        </Box>
    );
};

export default RevenueChart;

import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Chart from "chart.js/auto";

const RevenueChart = () => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        // Fetch revenue data from an API or backend server
        const revenueData = [
            { year: 2017, revenue: 50000 },
            { year: 2018, revenue: 70000 },
            { year: 2019, revenue: 90000 },
            { year: 2020, revenue: 120000 },
            { year: 2021, revenue: 150000 },
        ];

        // Format the revenue data into Chart.js format
        const chartLabels = revenueData.map((data) => data.year);
        const chartDataPoints = revenueData.map((data) => data.revenue);

        setChartData({
            labels: chartLabels,
            datasets: [
                {
                    label: "Revenue",
                    data: chartDataPoints,
                    fill: false,
                    borderColor: "#2E8B57",
                },
            ],
        });
    }, []);

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
            <Typography variant="h5" gutterBottom>Payments Generated</Typography>
            <Typography variant="h3" color="error">$59,342.32</Typography>
            <canvas id="revenue-chart"></canvas>
        </Box>
    );
};

export default RevenueChart;

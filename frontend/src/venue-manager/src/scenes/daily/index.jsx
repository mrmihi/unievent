import React from "react";
import { Box } from "@mui/material";
import Header from "components/Header";
import FlexBetween from "components/FlexBetween";

const Daily = () => {
    return (
        <Box m="1.5rem 2.5rem">
            <div>
                <FlexBetween>
                    <Header
                        title="ATTENDEES DAILY ANALYSIS CHART"
                        subtitle="Welcome to your dashboard"
                    />
                </FlexBetween>
            </div>
        </Box>
    );
};

export default Daily;

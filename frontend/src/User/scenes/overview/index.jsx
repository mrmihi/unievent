import React from "react";
import { Box } from "@mui/material";
import Header from "components/Header";
import FlexBetween from "components/FlexBetween";

const Overview = () => {
    return (
        <Box m="1.5rem 2.5rem">
            <div>
                <FlexBetween>
                    <Header
                        title="ATTENDEES OVERVIEW"
                        subtitle="Welcome to your dashboard"
                    />
                </FlexBetween>
            </div>
        </Box>
    );
};

export default Overview;

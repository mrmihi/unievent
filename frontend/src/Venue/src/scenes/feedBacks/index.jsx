import React from "react";
import { Box } from "@mui/material";
import Header from "Venue/src/components/Header";
import FlexBetween from "Venue/src/components/FlexBetween";

const VFeedBakcs = () => {
    return (
        <Box m="1.5rem 2.5rem">
            <div>
                <FlexBetween>
                    <Header
                        title="ATTENDEES FEEDBACKS Monitoring"
                        subtitle="Welcome to your dashboard"
                    />
                </FlexBetween>
            </div>
        </Box>
    );
};

export default VFeedBakcs;

import React from "react";
import { Box } from "@mui/material";
import Header from "Venue/src/components/Header";
import FlexBetween from "Venue/src/components/FlexBetween";

const VAppointments = () => {
    return (
        <Box m="1.5rem 2.5rem">
            <div>
                <FlexBetween>
                    <Header
                        title="All Appointments"
                        subtitle="Welcome to the appointments page"
                    />
                </FlexBetween>
            </div>
        </Box>
    );
};

export default VAppointments;

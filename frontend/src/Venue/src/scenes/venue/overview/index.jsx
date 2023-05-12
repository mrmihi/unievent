import React from "react";
import { Box } from "@mui/material";
import Header from "../../../components/Header"
import FlexBetween from "Venue/src/components/FlexBetween";

const VOverview = () => {
    return (
        <Box m="1.5rem 2.5rem">
            <div>
                <FlexBetween>
                    <Header
                        title="Venues Overview" subtitle="Welcome to the venues"/>
                </FlexBetween>
            </div>
        </Box>
    );
};

export default VOverview;

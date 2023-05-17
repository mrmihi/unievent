import React from "react";
import { Typography, Box } from "@mui/material";
import warning from "../assets/warning.png";

const WarningComponent = ({ message }) => {
    return (
        <Box mt={3} bgcolor="#ffffcc" p={2} borderRadius={4} display="flex" alignItems="center">
            <img src={warning} alt="Warning" style={{ marginRight: "10px", height: "20px" }} />
            <Typography variant="h3" color="error" style={{ fontSize: "16px" }}>
                {message}
            </Typography>
        </Box>
    );
};

export default WarningComponent;

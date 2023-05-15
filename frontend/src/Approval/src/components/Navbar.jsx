import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
    AppBar,
    Button,
    Box,
    Typography,
    IconButton,
    InputBase,
    Toolbar,
    Menu,
    MenuItem,
    useTheme,
} from "@mui/material";
import Logout from "../scenes/logout";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
    const dispatch = useDispatch();
    const theme = useTheme();

    return (
        <AppBar position="static" sx={{ background: 'none', boxShadow: 'none' }}>
            <Toolbar>
                <div style={{ flexGrow: 1 }} />
                <Button color="error" onClick={Logout} sx={{ float: 'right' }}>Logout</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;

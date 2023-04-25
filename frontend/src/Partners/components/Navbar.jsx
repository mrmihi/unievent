import React, { useState } from "react";
import {
    Menu as MenuIcon,
    Search,

    ArrowDropDownOutlined,
} from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
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
import Logout from "scenes/logout";

const Navbar = ({ attendee, isSidebarOpen, setIsSidebarOpen }) => {
    const dispatch = useDispatch();
    const theme = useTheme();

    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
        <AppBar position="static" sx={{ background: 'none', boxShadow: 'none' }}>
            <Toolbar>
                <div style={{ flexGrow: 1 }} />
                <Button color="inherit" onClick={Logout} sx={{ float: 'right' }}>Logout</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;

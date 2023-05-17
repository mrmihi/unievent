import React, { useState } from "react";
import {
    Menu as MenuIcon,
    Search,
    ArrowDropDownOutlined,
} from "@mui/icons-material";
import FlexBetween from "./FlexBetween";
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

const Navbar = ({ attendee, isSidebarOpen, setIsSidebarOpen }) => {
    const dispatch = useDispatch();
    const theme = useTheme();

    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
        <AppBar
            sx={{
                position: "static",
                background: "none",
                boxShadow: "none",
            }}
        >
            <Toolbar sx={{ justifyContent: "space-between" }}>
                {/* LEFT SIDE */}
                <FlexBetween>
                    <IconButton
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        <MenuIcon />
                    </IconButton>
                </FlexBetween>

                {/* RIGHT SIDE */}
                <FlexBetween gap="1.5rem">
                    <FlexBetween>
                        <Button
                            onClick={handleClick}
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                textTransform: "none",
                                gap: "1rem",
                            }}
                        >
                            <Box textAlign="left">
                                <Typography
                                    fontWeight="bold"
                                    fontSize="0.85rem"
                                    sx={{ color: theme.palette.secondary[100] }}
                                >
                                    {/* {attendees.name} */}
                                </Typography>
                                <Typography
                                    fontSize="0.75rem"
                                    sx={{ color: theme.palette.secondary[200] }}
                                >
                                    {/* {attendees.occupation} */}
                                </Typography>
                            </Box>
                            <ArrowDropDownOutlined
                                sx={{
                                    color: theme.palette.secondary[300],
                                    fontSize: "25px",
                                }}
                            />
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={isOpen}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "center",
                            }}
                        >
                            <MenuItem onClick={handleClose}>Log Out</MenuItem>
                        </Menu>
                    </FlexBetween>
                </FlexBetween>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;

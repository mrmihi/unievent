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
import {
  Menu as MenuIcon,
  Search,
  ArrowDropDownOutlined,
} from '@mui/icons-material';
import FlexBetween from './FlexBetween';
import Logout from "../scenes/logout";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <AppBar position="static" sx={{ background: "none", boxShadow: "none" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT SIDE */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
        </FlexBetween>
        <div style={{ flexGrow: 1 }} />
        <Toolbar>
          <div style={{ flexGrow: 1 }} />
          <Button color="error" onClick={Logout} sx={{ float: "right" }}>
            Logout
          </Button>
        </Toolbar>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

import React from "react";
import {
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme,
} from "@mui/material";
import {
    ChevronLeft,
    ChevronRightOutlined,
    HomeOutlined,
    Groups2Outlined,
    ReceiptLongOutlined,
    PointOfSaleOutlined,
    TodayOutlined,
    CalendarMonthOutlined,
    AdminPanelSettingsOutlined,
} from "@mui/icons-material";
import FeedbackIcon from "@mui/icons-material/Feedback";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";

const navItems = [
    {
        text: "Dashboard",
        icon: <HomeOutlined />,
        location: "/admin/venue/dashboard",
    },
    {
        text: "Booking Management",
        icon: null,
        location: "/admin/venue/booking",
    },
    {
        text: "Bookings",
        icon: <FeedbackIcon />,
        location: "/admin/venue/bookings",
    },
    {
        text: "Booking Requests",
        icon: <Groups2Outlined />,
        location: "/admin/venue/requests",
    },
    {
        text: "Appointments",
        icon: <ReceiptLongOutlined />,
        location: "/admin/venue/appointments",
    },

    {
        text: "Venue Management",
        icon: null,
        location: "/admin/venue/venue",
    },
    {
        text: "Venues",
        icon: <TodayOutlined />,
        location: "/admin/venue/venues",
    },
    {
        text: "Add Venue",
        icon: <CalendarMonthOutlined />,
        location: "/admin/venue/add",
    },
    {
        text: "Venue Quotation",
        icon: <PointOfSaleOutlined />,
        location: "/admin/venue/report",
    },
    {
        text: "Review Management",
        icon: null,
        location: "/admin/venue/review",
    },
    {
        text: "Reviews",
        icon: <AdminPanelSettingsOutlined />,
        location: "/admin/venue/reviews",
    },
];

const Sidebar = ({
    drawerWidth,
    isSidebarOpen,
    setIsSidebarOpen,
    isNonMobile,
}) => {
    const { pathname } = useLocation();
    const [active, setActive] = useState("");
    const navigate = useNavigate();
    const theme = useTheme();

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);

    return (
        <Box component="nav">
            {isSidebarOpen && (
                <Drawer
                    open={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    variant="persistent"
                    anchor="left"
                    sx={{
                        width: drawerWidth,
                        "& .MuiDrawer-paper": {
                            color: theme.palette.secondary[200],
                            backgroundColor: theme.palette.background.alt,
                            boxSixing: "border-box",
                            borderWidth: isNonMobile ? 0 : "2px",
                            width: drawerWidth,
                        },
                    }}
                >
                    <Box width="100%">
                        <Box m="1.5rem 2rem 2rem 3rem">
                            <FlexBetween color={theme.palette.secondary.main}>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    gap="0.5rem"
                                >
                                    <Typography variant="h4" fontWeight="bold">
                                        UniEventPro
                                    </Typography>
                                </Box>
                                {!isNonMobile && (
                                    <IconButton
                                        onClick={() =>
                                            setIsSidebarOpen(!isSidebarOpen)
                                        }
                                    >
                                        <ChevronLeft />
                                    </IconButton>
                                )}
                            </FlexBetween>
                        </Box>
                        <List>
                            {navItems.map(({ text, icon, location }) => {
                                if (!icon) {
                                    return (
                                        <Typography
                                            key={text}
                                            sx={{ m: "2.25rem 0 1rem 3rem" }}
                                        >
                                            {text}
                                        </Typography>
                                    );
                                }
                                const lcText = location.toLowerCase();

                                return (
                                    <ListItem key={text} disablePadding>
                                        <ListItemButton
                                            onClick={() => {
                                                navigate(`${lcText}`);
                                                setActive(lcText);
                                            }}
                                            sx={{
                                                backgroundColor:
                                                    active === lcText
                                                        ? theme.palette
                                                            .secondary[300]
                                                        : "transparent",
                                                color:
                                                    active === lcText
                                                        ? theme.palette
                                                            .primary[600]
                                                        : theme.palette
                                                            .secondary[100],
                                            }}
                                        >
                                            <ListItemIcon
                                                sx={{
                                                    ml: "2rem",
                                                    color:
                                                        active === lcText
                                                            ? theme.palette
                                                                .primary[600]
                                                            : theme.palette
                                                                .secondary[200],
                                                }}
                                            >
                                                {icon}
                                            </ListItemIcon>
                                            <ListItemText primary={text} />
                                            {active === lcText && (
                                                <ChevronRightOutlined
                                                    sx={{ ml: "auto" }}
                                                />
                                            )}
                                        </ListItemButton>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Box>

                    <Box position="absolute">
                        <Divider />
                        <FlexBetween
                            textTransform="none"
                            gap="1rem"
                            m="1.5rem 2rem 0 3rem"
                        ></FlexBetween>
                    </Box>
                </Drawer>
            )}
        </Box>
    );
};

export default Sidebar;

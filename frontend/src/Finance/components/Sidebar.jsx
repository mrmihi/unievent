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
    PublicOutlined,
    PointOfSaleOutlined,
    TodayOutlined,
    CalendarMonthOutlined,
    AdminPanelSettingsOutlined,
    TrendingUpOutlined,
    PieChartOutlined,
    AssignmentIndOutlined,
    BarChart,
    Payments,
    IndeterminateCheckBox,
    Summarize,
    Receipt,
    AssignmentTurnedIn
} from "@mui/icons-material";
//import FeedbackIcon from "@mui/icons-material/Feedback";
import EmailIcon from "@mui/icons-material/Email";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import Chart from "chart.js/auto";
import type { ChartConfiguration } from "chart.js";

const navItems = [
    {
        text: "Dashboard",
        icon: <HomeOutlined />,
        location: "/admin/finance/dashboard",
    },
    {
        text: "Payment Management",
        icon: null,
        location: "/admin/finance/booking",
    },
    {
        text: "Overview",
        icon: <BarChart />,
        location: "/admin/finance/table",
    },
    {
        text: "Payments",
        icon: <Payments />,
        location: "/admin/finance/payments",
    },
    {
        text: "Refunds",
        icon: <IndeterminateCheckBox />,
        location: "/admin/finance/refunds",
    },
    {
        text: "Reports",
        icon: <Summarize />,
        location: "/admin/finance/report",
    },

    {
        text: "Billing Management",
        icon: null,
        location: "/admin/finance/bills",
    },
    {
        text: "Bills",
        icon: <Receipt />,
        location: "/admin/finance/bills",
    },
    
    {
        text: "Event Approval Requests",
        icon: <AssignmentTurnedIn/>,
        location: "/admin/venue/review",
    }
    
];

const Sidebar = ({
    attendee,
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
                                        UniEventPro<br />
                                    </Typography>
                                    <Typography variant="h4" fontWeight="bold" color="orange">
                                        Fin
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

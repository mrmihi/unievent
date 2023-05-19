import React from 'react';
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
} from '@mui/material';
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
  People,
} from '@mui/icons-material';
import FeedbackIcon from '@mui/icons-material/Feedback';
import EmailIcon from '@mui/icons-material/Email';
import CampaignIcon from '@mui/icons-material/Campaign';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FlexBetween from './FlexBetween';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TodayIcon from '@mui/icons-material/Today';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PeopleIcon from '@mui/icons-material/People';

const navItems = [
  {
    text: 'Dashboard',
    icon: <HomeOutlined />,
  },
  {
    text: 'Event Management',
    icon: null,
  },
  {
    text: 'Events',
    icon: <EmojiEventsIcon />,
  },
  {
    text: 'Public Events',
    icon: <TheaterComedyIcon />,
  },
  {
    text: 'Event Form',
    icon: <InsertDriveFileIcon />,
  },
  {
    text: 'Event Calendar',
    icon: <TodayIcon />,
  },
  {
    text: 'Partner Management',
    icon: null,
  },
  {
    text: 'All Speakers',
    icon: <CampaignIcon />,
  },
  {
    text: 'All Sponsors',
    icon: <CardGiftcardIcon />,
  },
  {
    text: 'All Volunteers',
    icon: <VolunteerActivismIcon />,
  },
  {
    text: 'Review Management',
    icon: null,
  },
  {
    text: 'Venues',
    icon: <AssignmentIndOutlined />,
  },
];

const Sidebar = ({
  attendee,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState('');
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
            '& .MuiDrawer-paper': {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSixing: 'border-box',
              borderWidth: isNonMobile ? 0 : '2px',
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h4" fontWeight="bold">
                    UniEventPro
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" color="orange">
                    Org
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: '2.25rem 0 1rem 3rem' }}>
                      {text}
                    </Typography>
                  );
                }
                let lcText = text.toLowerCase();

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        if (lcText === 'venues') {
                          lcText = 'venues/reviews';
                        }
                        navigate(`/org/dashboard/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.secondary[300]
                            : 'transparent',
                        color:
                          active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: '2rem',
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: 'auto' }} />
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

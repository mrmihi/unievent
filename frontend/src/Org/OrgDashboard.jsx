import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import Header from './components/Header';
import FlexBetween from './components/FlexBetween';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { People } from '@mui/icons-material';

const Dashboard = () => {
  const theme = useTheme();
  const getGreeting = () => {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 5 && hour < 12) {
      return 'Good Morning!';
    } else if (hour >= 12 && hour < 18) {
      return 'Good Afternoon!';
    } else {
      return 'Good Evening!';
    }
  };

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header
          title={getGreeting()}
          subtitle="Welcome to the Organization Dashboard"
        />
      </FlexBetween>
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{ marginTop: '2rem' }}
      >
        <Box
          sx={{
            backgroundColor: '#F7FAFC',
            width: '24%',
            padding: '1rem',
            borderRadius: '0.5rem',
            transition: 'box-shadow 0.2s ease',
            '&:hover': {
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
            },
          }}
        >
          <div className="flex justify-between">
            <Typography
              variant="h4"
              fontWeight="bold"
              color={theme.palette.secondary.main}
            >
              Event Count
            </Typography>
            <EmojiEventsIcon
              color="#F0F0F0"
              sx={{ fontSize: '60px', color: 'orange' }}
              mt={0.25}
            />
          </div>
          <Typography
            variant="h4"
            color={theme.palette.secondary.main}
            mt={0.25}
            sx={{ textAlign: 'left' }}
          >
            23
          </Typography>
        </Box>

        <Box
          sx={{
            backgroundColor: '#F7FAFC',
            width: '24%',
            padding: '1rem',
            borderRadius: '0.5rem',
            transition: 'box-shadow 0.2s ease',
            '&:hover': {
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
            },
          }}
        >
          <div className="flex justify-between">
            <Typography
              variant="h4"
              fontWeight="bold"
              color={theme.palette.secondary.main}
            >
              Total Partners
            </Typography>
            <People
              color="#F0F0F0"
              sx={{ fontSize: '60px', color: 'orange' }}
              mt={0.25}
            />
          </div>
          <Typography
            variant="h4"
            color={theme.palette.secondary.main}
            mt={0.25}
            sx={{ textAlign: 'left' }}
          >
            23
          </Typography>
        </Box>

        <Box
          sx={{
            backgroundColor: '#F7FAFC',
            width: '24%',
            padding: '1rem',
            borderRadius: '0.5rem',
            transition: 'box-shadow 0.2s ease',
            '&:hover': {
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
            },
          }}
        >
          <div className="flex justify-between">
            <Typography
              variant="h4"
              fontWeight="bold"
              color={theme.palette.secondary.main}
            >
              Total Organizations
            </Typography>
            <Diversity3Icon
              color="#F0F0F0"
              sx={{ fontSize: '60px', color: 'orange' }}
              mt={0.25}
            />
          </div>
          <Typography
            variant="h4"
            color={theme.palette.secondary.main}
            mt={0.25}
            sx={{ textAlign: 'left' }}
          >
            23
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: '#F7FAFC',
            width: '24%',
            padding: '1rem',
            borderRadius: '0.5rem',
            transition: 'box-shadow 0.2s ease',
            '&:hover': {
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
            },
          }}
        >
          <div className="flex justify-between">
            <Typography
              variant="h4"
              fontWeight="bold"
              color={theme.palette.secondary.main}
            >
              Total Organizations
            </Typography>
            <MonetizationOnIcon
              color="#F0F0F0"
              sx={{ fontSize: '60px', color: 'orange' }}
              mt={0.25}
            />
          </div>
          <Typography
            variant="h4"
            color={theme.palette.secondary.main}
            mt={0.25}
            sx={{ textAlign: 'left' }}
          >
            $89,000
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;

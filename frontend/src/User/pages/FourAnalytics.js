import { Box, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PeopleIcon from '@mui/icons-material/People';
import PointOfSaleOutlinedIcon from '@mui/icons-material/PointOfSaleOutlined';

const FourAnalytics = () => {
  const theme = useTheme();
  const [totalUser, setTotalUser] = useState(0);
  const [totalEvents, setTotalEvents] = useState(0);
  const [totalOrganizations, setTotalOrganizations] = useState(0);

  useEffect(() => {
    fetch('http://localhost:5000/api/users')
      .then((response) => response.json())
      .then((data) => {
        setTotalUser(data.length);
      });

    fetch('http://localhost:5000/api/events')
      .then((response) => response.json())
      .then((data) => {
        setTotalEvents(data.length);
      });

    fetch('http://localhost:5000/api/org')
      .then((response) => response.json())
      .then((data) => {
        setTotalOrganizations(data.length);
      });
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      sx={{
        marginTop: '2rem',
      }}
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
            color={theme.palette.secondary[200]}
          >
            Total Organizations
          </Typography>
          <Diversity3Icon
            color="#F0F0F0"
            sx={{ fontSize: '60px', color: '#355FCC' }}
            mt={0.25}
          />
        </div>
        <Typography
          variant="h4"
          color={theme.palette.secondary[200]}
          mt={0.25}
          sx={{ textAlign: 'left' }}
        >
          {totalOrganizations}
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
            color={theme.palette.secondary[200]}
          >
            Total Users
          </Typography>
          <PeopleIcon
            color="#F0F0F0"
            sx={{ fontSize: '60px', color: '#355FCC' }}
            mt={0.25}
          />
        </div>
        <Typography
          variant="h4"
          color={theme.palette.secondary[200]}
          mt={0.25}
          sx={{ textAlign: 'left' }}
        >
          {totalUser}
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
            color={theme.palette.secondary[200]}
          >
            Total Events
          </Typography>
          <PointOfSaleOutlinedIcon
            color="#F0F0F0"
            sx={{ fontSize: '60px', color: '#355FCC' }}
            mt={0.25}
          />
        </div>
        <Typography
          variant="h4"
          color={theme.palette.secondary[200]}
          mt={0.25}
          sx={{ textAlign: 'left' }}
        >
          {totalEvents}
        </Typography>
      </Box>
    </Box>
  );
};

export default FourAnalytics;
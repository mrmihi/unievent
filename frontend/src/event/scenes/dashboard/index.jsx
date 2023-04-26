import React from 'react';
import { Box } from '@mui/material';
import Header from 'event/components/Header';
import FlexBetween from 'event/components/FlexBetween';

const Dashboard = () => {
  return (
    <Box m="1.5rem 2.5rem">
      <div>
        <FlexBetween>
          <Header title="Venue Manger" subtitle="Welcome to your dashboard" />
        </FlexBetween>
      </div>
    </Box>
  );
};

export default Dashboard;

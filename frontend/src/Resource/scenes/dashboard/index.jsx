import React from 'react';
import { Box } from '@mui/material';
import Header from 'Org/components/Header';
import FlexBetween from 'Org/components/FlexBetween';
import ResourceAnalytics from '../../components/ResourceAnalytics';

const getGreeting = () => {
  const now = new Date();
  const hour = now.getHours();

  if (hour >= 5 && hour < 12) {
      return "Good morning!";
  } else if (hour >= 12 && hour < 18) {
      return "Good afternoon!";
  } else {
      return "Good evening!";
  }
} 

const Dashboard = () => {
  return (
    <Box m="1.5rem 2.5rem">
      <div>
        <FlexBetween>
          <Header
            title={getGreeting()}
            subtitle="Welcome to your dashboard"
          />
        </FlexBetween>
        <ResourceAnalytics />
      </div>
    </Box>
  );
};

export default Dashboard;

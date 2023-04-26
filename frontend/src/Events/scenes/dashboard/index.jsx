import React from 'react';
import { Box } from '@mui/material';
<<<<<<< HEAD:frontend/src/Events/scenes/dashboard/index.jsx
import Header from 'Events/components/Header';
import FlexBetween from 'Events/components/FlexBetween';
=======
import Header from 'event/components/Header';
import FlexBetween from 'event/components/FlexBetween';
>>>>>>> 33a81a58692926137a42b790b2ab37ba9b5c0e9b:frontend/src/event/scenes/dashboard/index.jsx

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

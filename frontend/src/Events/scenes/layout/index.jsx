import React, { useState } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
<<<<<<< HEAD:frontend/src/Events/scenes/layout/index.jsx
import Navbar from 'Events/components/Navbar';
import Sidebar from 'Events/components/Sidebar';
=======
import Navbar from 'event/components/Navbar';
import Sidebar from 'event/components/Sidebar';
>>>>>>> 33a81a58692926137a42b790b2ab37ba9b5c0e9b:frontend/src/event/scenes/layout/index.jsx
import { useGetAttendeeQuery } from '../../../Attendee/state/api';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Layout = () => {
  const isNonMobile = useMediaQuery('(min-width: 600px)');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const attendeeId = useSelector((state) => state.global.attendeeId);
  const { data } = useGetAttendeeQuery(attendeeId);

  // if (!Cookies.get("token") && Cookies.get("role") !== "venue") {
  //     return <Navigate to="/admin/venue" />;
  // }

  return (
    <Box display={isNonMobile ? 'flex' : 'block'} width="100%" height="100%">
      <Sidebar
        attendee={data || {}}
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box flexGrow={1}>
        <Navbar
          attendee={data || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;

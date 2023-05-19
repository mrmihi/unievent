import React, { useState } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from 'Approval/src/components/Navbar';
import Sidebar from 'Approval/src/components/Sidebar';
// import { useGetAttendeeQuery } from "../../state/api";
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Layout = () => {
  const isNonMobile = useMediaQuery('(min-width: 600px)');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const attendeeId = useSelector((state) => state.global.attendeeId);
  // const { data } = useGetAttendeeQuery(attendeeId);

  if (!Cookies.get('accessToken')) {
    if (Cookies.get('role') !== 'staff') {
      return <Navigate to="/" />;
    }
  }

  return (
    <Box display={isNonMobile ? 'flex' : 'block'} width="100%" height="100%">
      <Sidebar
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box flexGrow={1}>
        <Navbar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;

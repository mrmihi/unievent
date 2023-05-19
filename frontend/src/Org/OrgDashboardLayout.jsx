import React, { useState } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Layout = () => {
  const isNonMobile = useMediaQuery('(min-width: 600px)');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  if (!Cookies.get("token") && Cookies.get("org_role") !== "org") {
      return <Navigate to="/org/login" />;
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

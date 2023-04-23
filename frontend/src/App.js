import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { themeSettings } from 'theme';
import Layout from './Attendee/scenes/layout';
import Dashboard from './Attendee/scenes/dashboard';
import FeedBacks from './Attendee/scenes/feedBacks';
import Attendees from './Attendee/scenes/attendees';
import DataFinalists from './Attendee/scenes/dataFinalists';
import Overview from './Attendee/scenes/overview';
import Daily from './Attendee/scenes/daily';
import Monthly from './Attendee/scenes/monthly';
import Breakdown from './Attendee/scenes/breakdown';
import RSVPEMAIL from './Attendee/scenes/revpemail';
import Administrator from './Attendee/scenes/administrator';
import AttendeeStatus from './Attendee/scenes/attendeeStatus';
import ELayout from './event/scenes/layout';
import EDashboard from './event/scenes/dashboard';
import LoginPage from './event/scenes/login';
import AllEvents from './event/eventOrg';
import AllEventView from './event/AllEventView';

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {/* Event Routes */}
          <Routes>
            <Route path="/events" element={<AllEventView />}>
              <Route path=":id" element={<AllEventView />} />
            </Route>
            <Route path="*" element={<h1>Page not found!</h1>} />
            <Route path="/org" element={<LoginPage />} />
            <Route element={<ELayout />}>
              <Route
                path="/org/dashboard/*"
                element={<Navigate to="/org/dashboard" replace />}
              />
              <Route path="/org/dashboard" element={<EDashboard />} />
              <Route path="/org/dashboard/events" element={<AllEvents />} />
            </Route>
            {/* Attendee Routes */}
            <Route element={<Layout />}>
              <Route
                path="/"
                element={<Navigate to="/administrator/dashboard" replace />}
              />
              <Route path="/administrator/dashboard" element={<Dashboard />} />
              <Route path="/administrator/feedBacks" element={<FeedBacks />} />
              <Route path="/administrator/attendees" element={<Attendees />} />
              <Route
                path="/administrator/dataFinalists"
                element={<DataFinalists />}
              />
              <Route path="/administrator/overview" element={<Overview />} />
              <Route path="/administrator/daily" element={<Daily />} />
              <Route path="/administrator/monthly" element={<Monthly />} />
              <Route path="/administrator/breakdown" element={<Breakdown />} />
              <Route path="/administrator/rsvpemail" element={<RSVPEMAIL />} />
              <Route
                path="/administrator/administrator"
                element={<Administrator />}
              />
              <Route
                path="/administrator/attendeeStatus"
                element={<AttendeeStatus />}
              />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
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
import ELayout from './Event/scenes/layout';
import EDashboard from './Event/scenes/dashboard';
import LoginPage from './Event/scenes/login';
import AllEvents from './Event/eventOrg';
import SingleEvent from './Event/SingleEvent';
import AllEventView from './Event/AllEventView';
import EventCreationForm from 'Event/components/registrationForm';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import RLayout from './Resource/scenes/layout';
import RDashboard from './Resource/scenes/dashboard';
import ResourcesTable from './Resource/tables/allResources';
import PageNotFound from './Event/pages/PageNotFound.jsx';
import AllResourcesView from 'Resource/pages/AllResourcesView';

function App() {
  // const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(
    () => createTheme(themeSettings('light'))
    // , [mode]
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="app">
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {/* Event Routes */}
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/events" element={<AllEventView />} />
              <Route path="/events/:id" element={<SingleEvent />} />
              <Route
                path="/events/:id/register"
                element={<EventCreationForm />}
              />
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
                  path="/administrator/dashboard"
                  element={<Dashboard />}
                />
                <Route
                  path="/administrator/feedBacks"
                  element={<FeedBacks />}
                />
                <Route
                  path="/administrator/attendees"
                  element={<Attendees />}
                />
                <Route
                  path="/administrator/dataFinalists"
                  element={<DataFinalists />}
                />
                <Route path="/administrator/overview" element={<Overview />} />
                <Route path="/administrator/daily" element={<Daily />} />
                <Route path="/administrator/monthly" element={<Monthly />} />
                <Route
                  path="/administrator/breakdown"
                  element={<Breakdown />}
                />
                <Route
                  path="/administrator/rsvpemail"
                  element={<RSVPEMAIL />}
                />
                <Route
                  path="/administrator/administrator"
                  element={<Administrator />}
                />
                <Route
                  path="/administrator/attendeeStatus"
                  element={<AttendeeStatus />}
                />
              </Route>
              {/* Resource Routes */}
              <Route path="/admin/resources" element={<AllResourcesView />} />
              <Route element={<RLayout />}>
                <Route
                  path="/admin/resources/dashboard/*"
                  element={<Navigate to="/admin/resources/dashboard" replace />}
                />
                <Route
                  path="/admin/resources/dashboard"
                  element={<RDashboard />}
                />
                <Route
                  path="/admin/resources/dashboard/resources"
                  element={<ResourcesTable />}
                />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
      </div>
    </LocalizationProvider>
  );
}

export default App;

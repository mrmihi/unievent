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
import AllEventsTable from './event/tables/AllEventsTable';
import SingleEvent from './event/SingleEvent';
// import AllEventView from './event/tables/AllEventView';
import AllEvents from './event/AllEvents';
import EventCreationForm from 'event/components/registrationForm';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import RLayout from './Resource/scenes/layout';
import RDashboard from './Resource/scenes/dashboard';
import ResourcesTable from './Resource/tables/allResources';
import PageNotFound from './event/pages/PageNotFound.jsx';
import AllResourcesView from 'Resource/pages/AllResourcesView';
import Speaker from 'Partners/organizer/speakers';
import Sponsors from 'Partners/organizer/sponsors';
import Volunteers from 'Partners/organizer/volunteers';
import Opportunities from 'Partners/organizer/opportunities';
import OpportunitiesList from 'Partners/user/volunteer/OpportunitiesList';
import AppliedOpportunitiesList from 'Partners/user/volunteer/AppliedOpportunitiesList';
import UpdateVolunteerApplication from 'Partners/user/volunteer/UpdateVolunteerApplication';
import OpportunityDetails from 'Partners/user/volunteer/OpportunityDetails';
import OpportunityRegister from 'Partners/user/volunteer/OpportunityRegister';

// import OpportunityRegister from 'Partners/user/volunteer/OpportunityRegister';

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
              <Route path="/events" element={<AllEvents />} />
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
                <Route
                  path="/org/dashboard/events"
                  element={<AllEventsTable />}
                />
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
              {/*Partner Routes */}
              <Route element={<Layout />}>
                {/* <Route path="/admin/venue/dashboard/*" element={<Navigate to="/admin/venue/dashboard" replace />} /> */}
                <Route
                  path="/admin/event/speakers/:eventID"
                  element={<Speaker />}
                />
                <Route
                  path="/admin/event/sponsors/:eventID"
                  element={<Sponsors />}
                />
                <Route
                  path="/admin/event/volunteers/"
                  element={<Volunteers />}
                />
                <Route
                  path="/admin/event/opportunities/:eventID"
                  element={<Opportunities />}
                />
              </Route>

              <Route
                path="/users/event/opportunities/"
                element={<OpportunitiesList />}
              />
              <Route
                path="/users/event/opportunity/:opportunityID"
                element={<OpportunityDetails />}
              />
              <Route
                path="/applyAsAVolunteer/:opportunityID"
                element={<OpportunityRegister />}
              />
              <Route
                path="/users/event/appliedOpportunities/:userID"
                element={<AppliedOpportunitiesList />}
              />
              <Route
                path="/users/event/updateVolunteerApplication/:volunteerID"
                element={<UpdateVolunteerApplication />}
              />
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
      </div>
    </LocalizationProvider>
  );
}

export default App;

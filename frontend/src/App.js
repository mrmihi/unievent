import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useMemo } from 'react';
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

import ELayout from './Events/scenes/layout';
import EDashboard from './Events/scenes/dashboard';
import OLoginPage from './Org/OrgLogin';
import AllEventsTable from './Events/tables/AllEventsTable';
import SingleEvent from './Events/SingleEvent';
import AllEventView from './Events/AllEventView';
import AllEvents from './Events/AllEvents';
import EventCreationForm from 'Events/components/registrationForm';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import RLayout from './Resource/scenes/layout';
import RDashboard from './Resource/scenes/dashboard';
import ResourcesTable from './Resource/tables/allResources';
import PageNotFound from './Events/pages/PageNotFound.jsx';
import AllResourcesView from 'Resource/pages/AllResourcesView';

import Speaker from 'Partners/organizer/speakers';
import Sponsors from 'Partners/organizer/sponsors';
import Volunteers from 'Partners/organizer/volunteers';
import Opportunities from 'Partners/organizer/opportunities';
import OpportunitiesList from 'Partners/user/volunteer/OpportunitiesList';
import AppliedOpportunitiesList from 'Partners/user/volunteer/AppliedOpportunitiesList';
import UpdateVolunteerApplication from 'Partners/user/volunteer/UpdateVolunteerApplication';
import OpportunityDetails from 'Partners/user/volunteer/OpportunityDetails';

// import OpportunityRegister from "Resource/components/registrationForm";

import OpportunityRegister from "Partners/user/volunteer/OpportunityRegister";

import VLayout from "Venue/src/scenes/layout";
import VDashboard from "Venue/src/scenes/dashboard";
import VFeedBacks from "Venue/src/scenes/feedBacks";
import VAttendees from "Venue/src/scenes/attendees";
import VDataFinalists from "Venue/src/scenes/dataFinalists";
import VLoginPage from "Venue/src/scenes/login";
import VReview from "Venue/src/scenes/venue/review";
import VVenue from "Venue/src/scenes/venue/venue";
import VVenueQuotation from "Venue/src/scenes/venue/venue-report";
import VAddVenue from "Venue/src/scenes/venue/add-venue";
import VVenuePage from "Venue/src/scenes/venue/edit-venue-page";
import VVenueProfile from "Venue/src/scenes/venue/venue-profile";

import EventDraft from "Approval/pages/EventDraft";
import EventManagerView from "Approval/pages/EventManagerView"
import ApprovalMain from "Approval/pages/ApprovalMain";
import Staffs from "Approval/pages/Staffs"
import Admins from "Approval/pages/Admins"
import ApprovalRequestMain from "Approval/pages/ApprovalRequestMain.jsx";
import ApprovalEdit from "Approval/pages/ApprovalEdit.jsx";
import RequestAppointment from "Approval/pages/RequestAppointment.jsx";
import ApprovalCreate from "Approval/pages/ApprovalCreate";
import PrintAll from "Approval/pages/PrintAll";

import VAppointments from 'Venue/src/scenes/venue/appointments';
import VAllBookings from 'Venue/src/scenes/venue/all-bookings';
import VBookings from 'Venue/src/scenes/venue/booking';
import VVenueListPage from 'Venue/AddVenue/pages/VVenueListPage';
import VVenueBook from 'Venue/AddVenue/pages/VVenueBook';
import VViewVenueProfile from 'Venue/AddVenue/pages/VViewVenueProfile';

import FLayout from "./Finance/scenes/layout";
import FDashboard from "Finance/scenes/dashboard";
import FOverview from "Finance/scenes/finance/overview";
import FLoginPage from "Finance/scenes/login";
import FRefunds from "Finance/scenes/finance/refunds";
import FTable from "./Finance/scenes/finance/table";
import FBills from "./Finance/scenes/finance/bills";
import FPayments from "./Finance/scenes/finance/payments";
import FReport from "./Finance/scenes/finance/report";
import FPayPal from "Finance/scenes/finance/paymentform";
import FPaymentOptions from "Finance/scenes/finance/paymentpage";

function App() {
  // const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(
    () => createTheme(themeSettings("light"))
    // , [mode]
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="app">
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />

            <Routes>
              {/* Approval Routes */}
              <Route element={<ELayout />}>
                <Route path="event/:id" element={<EventManagerView />} />
                <Route path="events-draft" element={<EventDraft />} />
                <Route path="approval/:id" element={<ApprovalMain />} />
                <Route path="staff/list/:id" element={<Staffs />} />
                <Route path="admin/list/:id" element={<Admins />} />
                <Route path="approval/create/:id" element={<ApprovalCreate />} />
                <Route path="approval/edit/:id" element={<ApprovalEdit />} />
                <Route path="approval/request/:id" element={<ApprovalRequestMain />} />
                <Route path="approval/print/:id" element={<PrintAll />} />
                <Route path="approval/r/appointment/:id" element={<RequestAppointment />} />
                <Route path="appointment/:id" element={<RequestAppointment />} />
              </Route>

              {/* Event Routes */}
              <Route path="/login" element={<OLoginPage />} />
              <Route path="/events" element={<AllEvents />} />
              <Route path="/events/:id" element={<SingleEvent />} />
              <Route
                path="/events/:id/register"
                element={<EventCreationForm />}
              />

              <Route path="/org/login" element={<OLoginPage />} />

              <Route element={<ELayout />}>
                <Route
                  path="/org/dashboard/*"
                  element={<Navigate to="/org/dashboard" replace />}
                />

                <Route path="/org/dashboard" element={<EDashboard />} />
                <Route path="/org/dashboard/events" element={<EventDraft />} />
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
              <Route element={<ELayout />}>
                {/* <Route path="/admin/venue/dashboard/*" element={<Navigate to="/admin/venue/dashboard" replace />} /> */}
                <Route path="/org/dashboard/speakers/" element={<Speaker />} />
                <Route path="/org/dashboard/sponsors/" element={<Sponsors />} />
                <Route
                  path="/org/dashboard/volunteers/"
                  element={<Volunteers />}
                />
                <Route
                  path="/org/dashboard/opportunities/"
                  element={<Opportunities />}
                />
              </Route>
              <Route
                path="/event/opportunities/"
                element={<OpportunitiesList />}
              />
              <Route
                path="/event/opportunity/:opportunityID"
                element={<OpportunityDetails />}
              />
              <Route
                path="/applyAsAVolunteer/:opportunityID"
                element={<OpportunityRegister />}
              />
              <Route
                path="/event/appliedOpportunities/:userID"
                element={<AppliedOpportunitiesList />}
              />
              <Route
                path="/event/updateVolunteerApplication/:volunteerID"
                element={<UpdateVolunteerApplication />}
              />
          
              {/* venue routes */}
              <Route>
                <Route path="/admin/venue" element={<VLoginPage />} />
                <Route element={<VLayout />}>
                  <Route path="/admin/venue/dashboard/*" element={<Navigate to="/admin/venue/dashboard" replace />} />
                  <Route path="/admin/venue/dashboard" element={<VDashboard />} />
                  <Route path="/admin/venue/feedBacks" element={<h1>FeedBacks</h1>} />
                  <Route path="/admin/venue/attendees" element={<h1>Attendees</h1>} />
                  <Route path="/admin/venue/dataFinalists" element={<VDataFinalists />} />
                  <Route path="/admin/venue/venues" element={<VVenue />} />
                  <Route path="/admin/venue/venues/edit/:id" element={<VVenuePage />} />
                  <Route path="/admin/venue/venues/:id" element={<VVenueProfile />} />
                  <Route path="/admin/venue/report" element={<VVenueQuotation />} />
                  <Route path="/admin/venue/add" element={<VAddVenue />} />
                  <Route path="/admin/venue/breakdown" element={<Breakdown />} />
                  <Route path="/admin/venue/reviews" element={<VReview />} />

                  <Route path="/admin/venue/appointments" element={<VAppointments/>} />
                  <Route path="/admin/venue/bookings" element={<VAllBookings/>} />
                  <Route path="/admin/venue/requests" element={<VBookings/>} />
                </Route>
              </Route>

                {/* Finance Routes */}
                        <Route path="/finance/paypal" element={<FPayPal />} />
                        <Route path="/finance/paymentpage" element={<FPaymentOptions />} />
                        <Route path="*" element={<h1>Page not found!</h1>} />
                        <Route path="/admin/finance" element={<FLoginPage />} />
                        <Route element={<FLayout />}>
                            <Route path="/admin/finance/dashboard/*" element={<Navigate to="/admin/finance/dashboard" replace />} />
                            <Route path="/admin/finance/dashboard" element={<FDashboard />} />
                            <Route path="/admin/finance/overview" element={<FOverview />} />
                            <Route path="/admin/finance/refunds" element={<FRefunds />} />
                            <Route path="/admin/finance/table" element={<FTable />} />
                            <Route path="/admin/finance/bills" element={<FBills />} />
                            <Route path="/admin/finance/payments" element={<FPayments />} />
                            <Route path="/admin/finance/report" element={<FReport />} />
                            
                        </Route>
              {/* venue add to an event */}
              <Route>
                <Route path="/venue" element={<h1>Browse Venue Page</h1>} />
                <Route>
                  <Route path="/venue/:vid/list" element={<VVenueListPage />} />
                  <Route path="/venue/:vid/list/:id" element={<VViewVenueProfile />} />
                  <Route path="/venue/:vid/book/:id" element={<VVenueBook/>} />
                  <Route path="/venue/payment" element={<h1>payment page</h1>} />
                </Route>
              </Route>
        
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
      </div>
    </LocalizationProvider>
  );
}

export default App;

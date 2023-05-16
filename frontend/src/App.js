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

import OLayout from './Org/OrgDashboardLayout';
import ODashboard from './Org/OrgDashboard';
import OLoginPage from './Org/OrgLogin';
import AllEventsTable from './Events/tables/AllEventsTable';
import SingleEvent from './Events/SingleEvent';
import AllEvents from './Events/AllEvents';
import EventCreationForm from 'Events/components/registrationForm';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import RLayout from './Resource/scenes/layout';
import RDashboard from './Resource/scenes/dashboard';
import ResourcesTable from './Resource/tables/allResources';
import PageNotFound from './Events/pages/PageNotFound.jsx';
import AllResourcesView from 'Resource/pages/AllResourcesView';
import AddReservation from 'Resource/views/AddReservation';

import Speaker from 'Partners/organizer/speakers';
import Sponsors from 'Partners/organizer/sponsors';
import Volunteers from 'Partners/organizer/volunteers';
import Opportunities from 'Partners/organizer/opportunities';
import OpportunitiesList from 'Partners/user/volunteer/OpportunitiesList';
import AppliedOpportunitiesList from 'Partners/user/volunteer/AppliedOpportunitiesList';
import UpdateVolunteerApplication from 'Partners/user/volunteer/UpdateVolunteerApplication';
import OpportunityDetails from 'Partners/user/volunteer/OpportunityDetails';

// import OpportunityRegister from "Resource/components/registrationForm";

import OpportunityRegister from 'Partners/user/volunteer/OpportunityRegister';

import VLayout from 'Venue/src/scenes/layout';
import VDashboard from 'Venue/src/scenes/dashboard';
import VFeedBacks from 'Venue/src/scenes/feedBacks';
import VAttendees from 'Venue/src/scenes/attendees';
import VDataFinalists from 'Venue/src/scenes/dataFinalists';
import VLoginPage from 'Venue/src/scenes/login';
import VReview from 'Venue/src/scenes/venue/review';
import VVenue from 'Venue/src/scenes/venue/venue';
import VVenueQuotation from 'Venue/src/scenes/venue/venue-report';
import VAddVenue from 'Venue/src/scenes/venue/add-venue';
import VVenuePage from 'Venue/src/scenes/venue/edit-venue-page';
import VVenueProfile from 'Venue/src/scenes/venue/venue-profile';

import ALayout from 'Approval/src/scenes/layout';
import ADashboard from 'Approval/src/scenes/dashboard';
import ALoginPage from 'Approval/src/scenes/login';
import AApproval from 'Approval/src/scenes/approvalRequests'
import AApprovalRequests from 'Approval/src/scenes/allApprovalRequests'
import AAppointmentRequests from 'Approval/src/scenes/appointmentRequests'
import AAppointments from 'Approval/src/scenes/upcomingAppointments'

import EventManagerView from 'Approval/pages/EventManagerView';
import ApprovalMain from 'Approval/pages/ApprovalMain';
import Staffs from 'Approval/pages/Staffs';
import Admins from 'Approval/pages/Admins';
import RequestAppointment from 'Approval/pages/RequestAppointment.jsx';
import PrintAll from 'Approval/pages/PrintAll';
import ApprovalRequestMain from 'Approval/pages/Old/ApprovalRequestMain.jsx';
import ApprovalCreate from 'Approval/pages/Old/ApprovalCreate';
import ApprovalEdit from 'Approval/pages/Old/ApprovalEdit.jsx';

import VAppointments from 'Venue/src/scenes/venue/appointments';
import VAllBookings from 'Venue/src/scenes/venue/all-bookings';
import VBookings from 'Venue/src/scenes/venue/booking';
import VVenueListPage from 'Venue/AddVenue/pages/VVenueListPage';
import VVenueBook from 'Venue/AddVenue/pages/VVenueBook';
import VViewVenueProfile from 'Venue/AddVenue/pages/VViewVenueProfile';
import PublicVenueTable from 'Venue/PublicVenueTable';
import { EventForm } from 'Events/scenes/EventForm';

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

import ULayout from "./User/scenes/layout/Layout";
import UDashboard from "./User/scenes/dashboard";
import UAllEventView from "./User/pages/AllEventView";
import UProfilePage from "./User/pages/profilePage";
import ULogin from "./User/pages/login";
import UAllusers from "./User/pages/allUsers";
import USignUp from "./User/pages/signUp";
import UBudgetForm from "./User/pages/budgetForm";
import UBudgetView from "./User/pages/budgetView";
import UserProfileEdit from "./User/pages/UserProfileEdit";



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

            <Routes>
              {/* Approval Routes */}
              {/* Org Dashbaord  */}
              <Route element={<OLayout />}>
                <Route path="/org/dashboard/events/:id" element={<EventManagerView />} />
                <Route path="/org/dashboard/events/approval/:id" element={<ApprovalMain />} />
                <Route path="/org/dashboard/staff/list/:id" element={<Staffs />} />
                <Route path="/org/dashboard/admin/list/:id" element={<Admins />} />
                <Route path="/org/dashboard/approval/appointment/:id" element={<RequestAppointment />} />
                <Route path="events-draft" element={<AllEventsTable />} />
                <Route path="/org/dashboard/events/approval/print/:id" element={<PrintAll />} />
                {/* <Route path="approval/create/:id" element={<ApprovalCreate />} />
                <Route path="approval/request/:id" element={<ApprovalRequestMain />} /> 
                <Route path="/org/dashboard/events/approval/print/:id" element={<PrintAll />} />
                <Route path="approval/r/appointment/:id" element={<RequestAppointment />} /> */}
              </Route>
              {/* Staff Dashbaord */}
              <Route path="/admin" element={<ALoginPage />} />
              <Route element={<ALayout />}>
                <Route path="/admin/dashboard/*" element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="/admin/dashboard" element={<ADashboard />} />
                <Route path="/admin/appointment/requests" element={<AAppointmentRequests />} />
                <Route path="/admin/appointments" element={<AAppointments />} />
                <Route path="/admin/approvals" element={<AApprovalRequests />} />
                <Route path="/admin/approval/requests" element={<AApproval />} />
              </Route>


              {/* Event Routes */}
              <Route path="/events" element={<AllEvents />} />
              <Route path="/events/:id" element={<SingleEvent />} />
              <Route path="/events/:id/register" element={<EventCreationForm />} />

              <Route path="/org/login" element={<OLoginPage />} />

              <Route element={<OLayout />}>
                <Route path="/org/dashboard/*" element={<Navigate to="/org/dashboard" replace />}/>
                <Route path="/org/dashboard" element={<ODashboard />} />
                <Route path="/org/dashboard/events" element={<AllEventsTable />} />
                <Route path="/org/dashboard/event form" element={<EventForm />} />
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
              <Route
                path="/resources/:eid/reservation"
                element={<AllResourcesView />}
              />
              <Route
                path="/resource/:rid/reservation/:eid"
                element={<AddReservation />}
              />
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

              {/*Partner Routes */}
              <Route element={<OLayout />}>
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

              {/* Finance Routes */}
              <Route path="/finance/paypal" element={<FPayPal />} />
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


              {/* venue routes */}
              <Route>
                <Route path="/admin/venue" element={<VLoginPage />} />
                <Route element={<VLayout />}>
                  <Route path="/admin/venue/dashboard/*" element={<Navigate to="/admin/venue/dashboard" replace />} />
                  <Route path="/admin/venue/dashboard"  element={<VDashboard />}/>
                  <Route path="/admin/venue/feedBacks"element={<h1>FeedBacks</h1>}/>
                  <Route path="/admin/venue/attendees" element={<h1>Attendees</h1>} />
                  <Route path="/admin/venue/dataFinalists" element={<VDataFinalists />} />
                  <Route path="/admin/venue/venues" element={<VVenue />} />
                  <Route path="/admin/venue/venues/edit/:id" element={<VVenuePage />} />
                  <Route path="/admin/venue/venues/:id" element={<VVenueProfile />} />
                  <Route path="/admin/venue/report" element={<VVenueQuotation />}  />
                  <Route path="/admin/venue/add" element={<VAddVenue />} />
                  <Route path="/admin/venue/breakdown" element={<Breakdown />} />
                  <Route path="/admin/venue/reviews" element={<VReview />} />
                </Route>
              </Route>

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
                  <Route path="/admin/venue/appointments" element={<VAppointments />} />
                  <Route path="/admin/venue/bookings" element={<VAllBookings />} />
                  <Route path="/admin/venue/requests" element={<VBookings />} />
                </Route>
              </Route>

              {/* venue add to an event */}
              <Route>
                <Route path="/venue" element={<h1>Browse Venue Page</h1>} />
                <Route>
                  <Route path="/venue/:vid/list" element={<VVenueListPage />} />
                  <Route path="/venue/:vid/list/:id" element={<VViewVenueProfile />} />
                  <Route path="/venue/:vid/book/:id" element={<VVenueBook />} />
                  <Route path="/venue/payment" element={<h1>payment page</h1>} />
                </Route>
              </Route>

              {/* public venue time table page */}
              <Route path="/venue/timetable/:id" element={<PublicVenueTable />} />


              {/*User Routes */}
            
              <Route path="/" element={<ULogin />}/>

              <Route element={<ULayout />}>
              <Route
                path="/admin/dashboard"
                element={<UDashboard />}
              />
              <Route
                path="/admin/event"
                element={<UAllEventView />}
              />
              <Route
                path="/admin/allUsers"
                element={<UAllusers />}
              />
              <Route
                path="/admin/register"
                element={<USignUp />}
              />
              <Route
                path="/admin/event/budget"
                element={<UBudgetForm />}
              />
              <Route
                path="/admin/profile"
                element={<UProfilePage />}
              />
              <Route
                path="/admin/event/budget/view"
                element={<UBudgetView />}
              />
              <Route
                path="/admin/profile/edit"
                element={<UserProfileEdit />}
              />
            </Route>
            </Routes>
            
          </ThemeProvider>
        </BrowserRouter>
      </div>
    </LocalizationProvider>
  );
}

export default App;

import { Routes, Route, useLocation } from 'react-router-dom';
// import EventView from '../pages/EventView';
import GetAllEvents from '../views/AllEventView';
import Home from '../pages/Home';
import EventView from '../views/EventView';

const EventRoutes = () => {
  const location = useLocation();

  return (
    <Routes location={location}>
      <Route path="/" element={<Home />} />
      {/* <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} /> */}
      <Route path="/events" element={<GetAllEvents />} />
      <Route path="/events/:id" element={<EventView />} />
      {/* <Route path="/questions/:id/submissions" element={<Submissions />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:code" element={<ResetPassword />} />
      <Route path="/change-password" element={<ChangePassword />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};

export default EventRoutes;

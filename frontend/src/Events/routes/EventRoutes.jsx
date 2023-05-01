// import React, { useState, useEffect } from 'react';
// import { Link, Routes, useParams } from 'react-router-dom';
// import eventService from '../event.service';
// import AllEvents from '../AllEvents';
// import SingleEvent from '../SingleEvent';
// import { Route } from 'react-router-dom';
// import AllEventView from '../AllEventView';

// function EventRoutes() {
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     eventService.getAll().then((response) => setEvents(response));
//   }, []);

//   return (
//     <>
//       <Routes>
//         <Route path="/" element={<AllEvents events={events} />}>
//           <Route path="/:id" element={<SingleEvent events={events} />} />
//         </Route>
//       </Routes>
//     </>
//   );
// }

// export default EventRoutes;

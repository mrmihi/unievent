import AllEvents from './AllEvents';
import { useEffect, useState } from 'react';
import eventService from './event.service';

function AllEventView() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    eventService.getAll().then((response) => setEvents(response));
  }, []);

  return (
    <>
      <AllEvents events={events} />
    </>
  );
}

export default AllEventView;

import AllEvents from './pages/AllEvents';
import { useEffect, useState } from 'react';
import eventService from './services/event';

function App() {
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

export default App;

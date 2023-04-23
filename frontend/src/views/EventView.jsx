import { useMatch } from 'react-router-dom';

export default function EventView({ event }) {
  return (
    <>
      <h1>{event.name}</h1>
      <p>{event.description}</p>
      <p>{event.venue}</p>
      <p>{event.startTime}</p>
      <p>{event.endTime}</p>
      <p>{event.status}</p>
    </>
  );
}

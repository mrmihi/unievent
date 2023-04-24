import { useParams } from 'react-router-dom';
import eventService from './event.service';
import { useEffect, useState } from 'react';

function SingleEvent() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    eventService.getOne(id).then((res) => {
      console.log('I the useeffect ran');
      setEvent(res.data);
    });
  }, []);

  if (!event) return <h1>Loading...</h1>;
  return (
    <div>
      <h1>Single Event</h1>
      <h2>{id}</h2>
      <h2>{event.name}</h2>
    </div>
  );
}

export default SingleEvent;

import { useParams } from 'react-router-dom';
import eventService from './event.service';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function SingleEvent() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    eventService.getOne(id).then((res) => {
      console.log('I the useeffect ran');
      setEvent(res.data);
    });
  }, []);

  const navigate = useNavigate();

  if (!event) return <h1>Loading...</h1>;
  return (
    <div>
      <h1>Single Event</h1>
      <h2>{id}</h2>
      <h2>{event.name}</h2>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          navigate(`/events/${id}/register`);
        }}
      >
        Register
      </Button>
    </div>
  );
}

export default SingleEvent;

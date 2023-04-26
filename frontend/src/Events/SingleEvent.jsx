import { useParams } from 'react-router-dom';
import eventService from './event.service';
import { useEffect, useState } from 'react';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { WidthNormal } from '@mui/icons-material';

function SingleEvent() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    eventService.getOne(id).then((res) => {
      setEvent(res.data);
    });
  }, []);

  const navigate = useNavigate();

  if (!event) return <h1>Loading...</h1>;
  return (
    <>
      <div className="flex flex-col justify-center  items-center ">
        <img src={event.headerImage} alt={event.name} className="mx-auto" />

        <div className="  mt-8">
          <div>
            <Typography variant="h2">{event.name}</Typography>
            <Typography variant="h3">{event.description}</Typography>
            <Typography variant="h4">{event.category}</Typography>
            <Typography variant="h4">Capacity : {event.capacity}</Typography>
            <Typography variant="h4">Start Time : {event.startTime}</Typography>
            <Typography variant="h4">End Time : {event.endTime}</Typography>
          </div>
        </div>
        <div className="mt-8 text-center ml-12 mr-12 mb-6">
          <Button
            sx={{ width: 300 }}
            variant="contained"
            color="primary"
            onClick={() => {
              navigate(`/events/${id}/register`);
            }}
          >
            Register
          </Button>
        </div>
      </div>
    </>
  );
}

export default SingleEvent;

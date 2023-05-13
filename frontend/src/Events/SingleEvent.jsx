import { useParams } from 'react-router-dom';
import eventService from './event.service';
import { useEffect, useState } from 'react';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { WidthNormal } from '@mui/icons-material';

function SingleEvent() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const { id : eventID } = useParams()

  useEffect(() => {
    eventService.getOneShab(id).then((res) => {
      setEvent(res.data);
    });
  }, [id]);

  const navigate = useNavigate();

  if (!event) return <h1>Loading...</h1>;
  return (
    <>
      <div className="flex flex-col justify-center  items-center ">
        <img src={event.headerImage} alt={event.name} className="mx-auto" />

        <div className="flex bg-white shadow-lg rounded-lg mx-4 md:mx-auto my-56 max-w-md md:max-w-2xl mt-8">
          <div>
            {/* add a typography tag that says Details and make it bold */}
            <Typography variant="h2">Details</Typography>
            <Typography variant="h4" color="red">
              {event.startTime} - {event.endTime}{' '}
            </Typography>
            <Typography variant="h2">{event.name}</Typography>
            <Typography variant="h3">{event.description}</Typography>
            <Typography variant="h4">{event.category}</Typography>
            <Typography variant="h4">Capacity : {event.capacity}</Typography>

            <Typography variant="h4">
              Attendee Count : {event.attendeeCount}
            </Typography>
            <Typography variant="h4">Capacity : {event.capacity}</Typography>
          </div>
        </div>
        <div className="mt-8 text-center ml-12 mr-12 mb-6">
          <Button
            sx={{ width: 300 }}
            variant="contained"
            color="primary"
            {...(event.attendeeCount < event.capacity
              ? {}
              : { disabled: true })}
            onClick={() => {
              navigate(`/events/${id}/register`);
            }}
          >
            {event.attendeeCount < event.capacity
              ? 'Register'
              : 'Registrations Exceeded'}
          </Button>
          <Button
            sx={{ width: 300, marginLeft: '5px' }}
            variant="contained"
            color="primary"
            onClick={() => {
              navigate(`/event/opportunities/`);
            }}
          >
            Opportunities
          </Button>
          <Button
            sx={{ width: 300, marginLeft: '5px' }}
            variant="contained"
            color="primary"
            onClick={() => {
              navigate(`/approval/${eventID}`);
            }}
          >
            Approval Request
          </Button>
        </div>
      </div>
    </>
  );
}

export default SingleEvent;

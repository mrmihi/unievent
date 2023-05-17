import { useParams } from 'react-router-dom';
import eventService from './event.service';
import { useEffect, useState } from 'react';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CalendarEvent from './scenes/CalendarEvent';
import Landing from './components/Landing';
import Header from './components/Header';
import moment from 'moment';
import { IoLocationSharp } from 'react-icons/io5';
import Description from './components/Description';
import React from 'react';
import './styles/singleEvent.css';
import Loading from './components/Loading';
import Title from './components/Title';
import Actions from './components/Actions';

function SingleEvent() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [eventDay, setEventDay] = useState(null);

  useEffect(() => {
    eventService.getOne(id).then((res) => {
      setEvent(res.data);
    });
  }, [id]);

  const navigate = useNavigate();

  if (!event)
    return (
      <>
        <Loading />
      </>
    );
  return (
    <>
      <Header id={id} />
      <Landing
        image={event.headerImage}
        name={event.name}
        eventDay={moment(event.startTime).format('DD')}
      />
      <div className="flex flex-col justify-center  items-center ">
        <img src={event.headerImage} alt={event.name} className="mx-auto" />

        {/* <div className="flex bg-white shadow-lg rounded-lg mx-4 md:mx-auto my-56 max-w-md md:max-w-2xl mt-8">
          <div>
          add a typography tag that says Details and make it bold
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
        </div> */}
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
              navigate(`/events/${id}/frame`);
            }}
          >
            Create a Badge
          </Button>
          <CalendarEvent {...event} />
        </div>
      </div>

      <div className="mx-5 mt-8 pt-[80px]">
        <Title title="When and Where" aos="fade-left" />
        <div className="flex justify-center mt-[60px]">
          <span className="relative flex items-center">
            <img
              src="/assets/Calendar.svg"
              className="w-28 h-28"
              alt="Calendar"
            />
            <span className="absolute inset-0 flex items-center justify-center text-black  text-3xl font-extrabold z-40">
              {moment(event.startTime).format('DD')}
            </span>
          </span>
          <span className="text-1xl font-extrabold text-red-600 items-center justify-center mx-8 mt-8">
            Date & Time
            <br></br>
            <br></br>
            {moment(event.startTime).format('DD MMM [AT] HH:mm')}{' '}
            &nbsp;-&nbsp;&nbsp;
            {moment(event.endTime).format('DD MMM [AT] HH:mm')}
          </span>
          |<br></br>|
          <span className="text-1xl font-extrabold text-blue-600 items-center justify-center mx-8">
            <IoLocationSharp style={{ fontSize: '6rem' }} />
          </span>
          <span className="text-1xl font-extrabold text-blue-600 items-center justify-center  mt-8">
            Venue
            <br></br>
            {event.venue}
          </span>
        </div>

        <Description
          description={event.description}
          categories={event.categories}
        />
        <Actions />
      </div>
    </>
  );
}

export default SingleEvent;

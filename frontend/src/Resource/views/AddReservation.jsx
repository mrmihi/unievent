import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Box, Container, Typography } from '@mui/material';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import { TextField, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import resourcesService from '../resources.service';

const localizer = momentLocalizer(moment);

const AddReservation = () => {
  const { rid } = useParams();
  const { eid } = useParams();

  console.log('rid', rid);
  console.log('eid', eid);

  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [resource, setResource] = useState({});
  const [reservationCount, setReservationCount] = useState();
  const [availableQty, setAvailableQty] = useState();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };
  const handleBookingSubmit = () => {
    const start = new Date(startDate).toISOString();
    const end = new Date(endDate).toISOString();

    if (moment(end).diff(moment(start), 'hours') < 1) {
      toast.error('Booking duration should be atleast 1 hour!', {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    axios
      .post('http://localhost:5000/api/reservations', {
        start_time: moment(start).format("YYYY-MM-DD"),
        end_time: end,
        duration: moment(end).diff(moment(start), 'hours'),
        resource: rid,
        organizer: '6448be13969607971f3761a3',
        event: eid,
        //price: venue.price * moment(end).diff(moment(start), 'hours'),
      })
      .then((res) => {
        toast.success('Reservatoin saved successfully', {
          position: toast.POSITION.TOP_CENTER,
        });
        setTimeout(() => {
          navigate("/org/dashboard/events");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        toast.error('Error saving booking!', {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  useEffect(() => {
    // Fetch the venue booking
    axios
      .get(`http://localhost:5000/api/reservations/resource/${rid}`)
      .then((res) => {
        const modifiedData = res.data.map((resource) => {
          return {
            id: resource._id,
            title: 'Private',
            start: new Date(moment(resource.start_time)),
            end: new Date(moment(resource.end_time)),
            status: resource.booking_status,
          };
        });
        //
        setReservationCount(modifiedData.length);
        //
        setEvents(modifiedData);
      })
      .catch((err) => {
        console.log(err);
      });
    //fetch resource
  }, [rid]);

  useEffect(() => {
    resourcesService.getOne(rid).then((res) => {
      setResource(res.data);
    });
  }, [rid]);

  console.log('reservationCount', reservationCount);
  // console.log('availableQty', availableQty);

  // console.log('Resources.name', resource.name);

  // const getAvailableQty = (date) => {
  //   const givenDate = moment(date).format('YYYY-MM-DD');

  //   const filteredData = events.filter((data) => {
  //     const dataDate = moment(data.start).format('YYYY-MM-DD'); // Extract the date from the start property of each data item
  //     // const givenDate1 = givenDate.getDate(); // Extract the date from the givenDate
  //     console.log('dataDate', dataDate);
  //     console.log('givenDate', givenDate);
  //     return dataDate === givenDate; // Return true if the dataDate is the same as the givenDate
  //   });

  //   const count = filteredData.length;
  //   console.log('Count:', count);
  // };

  const handleStartDateChange = (date) => {
    // getAvailableQty(date);
    setStartDate(date);
  };
  return (
    <Container>
      <Typography variant="h1" align="left" gutterBottom>
        Resource Reservation Calendar
      </Typography>

      <Box mt={10}>
        <Calendar
          localizer={localizer}
          events={events}
          eventPropGetter={(event, start, end, isSelected) => {
            let backgroundColor = '#3174ad';

            if (event.status === 'approved') {
              backgroundColor = '#4caf50';
            } else if (event.status === 'pending') {
              backgroundColor = '#ff9800';
            } else if (event.status === 'rejected') {
              backgroundColor = '#f44336';
            }

            return {
              style: {
                backgroundColor,
                borderRadius: '0px',
                opacity: 0.8,
                color: 'white',
                border: '0px',
                display: 'block',
              },
            };
          }}
          selectable
          onSelectEvent={handleSelectEvent}
          startAccessor="start"
          endAccessor="end"
          defaultView="week"
          views={['week']}
          step={60}
          showMultiDayTimes
          style={{ height: 500 }}
        />
        {selectedEvent && (
          <Box mt={3}>
            <Typography variant="h3">{selectedEvent.title}</Typography>
            <Typography variant="body1">
              Start: {moment(selectedEvent.start).format('YYYY-MM-DD hh:mm A')}
            </Typography>
            <Typography variant="body1">
              End: {moment(selectedEvent.end).format('YYYY-MM-DD hh:mm A')}
            </Typography>
            <Typography variant="body1">
              Status: {selectedEvent.status}
            </Typography>
            <Typography variant="body1">
              Available Quantity: {resource.quantity - reservationCount}
            </Typography>
          </Box>
        )}
      </Box>

      <Box mt={10}>
        <Typography variant="h1" align="left" gutterBottom>
          Reserve Resource : {resource.name} <br/>
          Available Quantity:{resource.quantity - reservationCount}
        </Typography>
        <Container maxWidth="sm" style={{ paddingBottom: '200px' }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-end"
            mt={3}
          >
            <MobileDateTimePicker
              label="Date & Time"
              onChange={handleStartDateChange}
              inputFormat="dd/MM/yyyy hh:mm a"
              renderInput={(props) => <TextField {...props} />}
              ampm
              style={{ marginRight: '10px' }}
              disablePast
            />
            <MobileDateTimePicker
              label="End Date & Time"
              onChange={handleEndDateChange}
              inputFormat="dd/MM/yyyy hh:mm a"
              renderInput={(props) => <TextField {...props} />}
              ampm
              disablePast
            />
          </Box>
          <Box display="flex" justifyContent="center" mt={2}>
            {/* <Button onClick={handleBookingSubmit} variant="contained">
              Submit
            </Button> */}
            <Button
              onClick={handleBookingSubmit}
              variant="contained"
              disabled={resource.quantity - reservationCount === 0}
            >
              Submit
            </Button>
          </Box>
        </Container>
      </Box>
      <ToastContainer />
    </Container>
  );
};

export default AddReservation;

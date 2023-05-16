import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Box, Button, InputLabel, MenuItem, Select } from '@mui/material';
import Header from 'Venue/src/components/Header';
import FlexBetween from 'Venue/src/components/FlexBetween';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

const ReservationRequests = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('');

  const localizer = momentLocalizer(moment);

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/reservation/manager/
        )}/pending`
      )
      .then((res) => {
        if (res.data) {
          setBookings(res.data);
        }
      })
      .catch((err) => {
        toast.error('Something went wrong with server!');
        console.log(err);
      });
  }, []);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  const handleUpdateStatus = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to update the status of this reservation!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ff9800',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(`http://localhost:5000/api/reservations/${selectedEvent._id}`, {
            booking_status: selectedStatus,
          })
          .then((res) => {
            if (res.data) {
              if (selectedStatus === 'approved') {
                toast.success('Reservation approved!');
              } else {
                toast.success('Reservation rejected!');
              }
              setSelectedEvent(null);
              setSelectedStatus('');

              setTimeout(() => {
                window.location.reload();
              }, 2000);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Box>
        <FlexBetween>
          <Header title="All Reservation" />
        </FlexBetween>
        <Box mt={10}>
          <Calendar
            localizer={localizer}
            events={bookings.map((booking) => ({
              _id: booking._id,
              start: new Date(booking.start_time),
              end: new Date(booking.end_time),
              title: `Booking ${booking.event.name}`,
              status: booking.booking_status,
              price: booking.price,
              venue: booking.venue,
              organizer: booking.organizer,
              event: booking.event,
            }))}
            eventPropGetter={(event, start, end, isSelected) => {
              return {
                style: {
                  backgroundColor: '#ff9800',
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
            onSelectSlot={() => setSelectedEvent(null)}
            startAccessor="start"
            endAccessor="end"
            defaultView="week"
            views={['week']}
            step={60}
            showMultiDayTimes
            style={{ height: 500 }}
          />
        </Box>
        {selectedEvent && (
          <div className="p-4 bg-gray-100">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-4">
                {selectedEvent.event.name}
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">
                    Start Time:{' '}
                    {moment(selectedEvent.start).format('YYYY-MM-DD hh:mm A')}
                  </p>
                  <p className="text-gray-600">
                    End Time:{' '}
                    {moment(selectedEvent.end).format('YYYY-MM-DD hh:mm A')}
                  </p>
                  <p className="text-gray-600">
                    Reservation Approval Status: {selectedEvent.status}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">
                    Price:{' '}
                    {selectedEvent.price.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })}
                  </p>
                  <p className="text-gray-600">
                    Venue: {selectedEvent.venue.name}
                  </p>
                  <p className="text-gray-600">
                    Organizer: {selectedEvent.organizer.name}
                  </p>
                </div>
              </div>
              <Box mt={4}>
                <InputLabel id="status-label">Booking Status</InputLabel>
                <Select
                  labelId="status-label"
                  id="status-select"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  sx={{ width: 200 }}
                >
                  <MenuItem disabled value="">
                    Select Status
                  </MenuItem>
                  <MenuItem value="approved">Approved</MenuItem>
                  <MenuItem value="rejected">Rejected</MenuItem>
                </Select>
                {selectedStatus === '' && (
                  <p className="text-gray-500 text-sm mt-2">
                    Please select a status to update.
                  </p>
                )}
              </Box>
              <div className="mt-4 flex justify-end">
                <Button
                  variant="contained"
                  onClick={handleUpdateStatus}
                  disabled={selectedStatus === ''}
                >
                  Update Status
                </Button>
              </div>
            </div>
          </div>
        )}
      </Box>
      <Box>
        <FlexBetween></FlexBetween>
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default ReservationRequests;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Box, Typography } from '@mui/material';

const PublicVenueTable = () => {
    const { id } = useParams();
    const [bookings, setBookings] = useState([]);
    const localizer = momentLocalizer(moment);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/venues/timetable/${id}`)
            .then(res => {
                setBookings(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const handleSelectEvent = (event) => {
        setSelectedEvent(event);
    };

    return (
        <Box m="1.5rem 2.5rem">
            {bookings.length > 0 && (
                <Box mt={5}>
                    <Typography variant="h5" component="h2" gutterBottom>
                        Venue: {bookings[0].venue.name}
                    </Typography>
                    <Box mt={10}>
                        <Calendar
                            localizer={localizer}
                            events={bookings.map((booking) => ({
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
                                let backgroundColor = "#4caf50";

                                return {
                                    style: {
                                        backgroundColor,
                                        borderRadius: "0px",
                                        opacity: 0.8,
                                        color: "white",
                                        border: "0px",
                                        display: "block",
                                    },
                                };
                            }}
                            selectable
                            onSelectEvent={handleSelectEvent}
                            onSelectSlot={() => setSelectedEvent(null)}
                            startAccessor="start"
                            endAccessor="end"
                            defaultView="week"
                            views={["week"]}
                            step={60}
                            showMultiDayTimes
                            style={{ height: 500 }}
                        />
                    </Box>
                </Box>
            )}
            {selectedEvent && (
                <div className="p-4 bg-gray-100">
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold mb-4">{selectedEvent.event.name}</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-gray-600">Start Time: {moment(selectedEvent.start).format("YYYY-MM-DD hh:mm A")}</p>
                                <p className="text-gray-600">End Time: {moment(selectedEvent.end).format("YYYY-MM-DD hh:mm A")}</p>
                            </div>
                            <div>
                                <p className="text-gray-600">Venue: {selectedEvent.venue.name}</p>
                                <p className="text-gray-600">Organizer: {selectedEvent.organizer.name}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Box >
    )
};

export default PublicVenueTable;

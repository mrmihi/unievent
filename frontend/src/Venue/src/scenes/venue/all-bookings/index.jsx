import React, { useState, useEffect } from "react";
import axios from "axios";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { Box } from "@mui/material";
import Header from "Venue/src/components/Header";
import FlexBetween from "Venue/src/components/FlexBetween";
import Cookies from "js-cookie";

const VAllBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const localizer = momentLocalizer(moment);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/bookings/manager/${Cookies.get("id")}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("accessToken")}`,
                },
            })
            .then((res) => {
                if (res.data) {
                    setBookings(res.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleSelectEvent = (event) => {
        setSelectedEvent(event);
    };

    return (
        <Box m="1.5rem 2.5rem">
            <Box>
                <FlexBetween>
                    <Header title="All Bookings" subtitle="Welcome to bookings page" />
                </FlexBetween>
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
                            let backgroundColor = "#3174ad";

                            if (event.status === "approved") {
                                backgroundColor = "#4caf50";
                            } else if (event.status === "pending") {
                                backgroundColor = "#ff9800";
                            } else if (event.status === "rejected") {
                                backgroundColor = "#f44336";
                            }

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
                {selectedEvent && (
                    <Box mt={10} style={{ marginBottom: "2rem" }}>
                        <h2>{selectedEvent.event.name}</h2>
                        <p>Start Time: {moment(selectedEvent.start).format("YYYY-MM-DD hh:mm A")}</p>
                        <p>End Time: {moment(selectedEvent.end).format("YYYY-MM-DD hh:mm A")}</p>
                        <p>Status: {selectedEvent.status}</p>
                        <p>Price: {selectedEvent.price}</p>
                        <p>Venue: {selectedEvent.venue.name}</p>
                        <p>Organizer: {selectedEvent.organizer.name}</p>
                    </Box>
                )}
            </Box>
            <Box><FlexBetween></FlexBetween></Box>
        </Box>
    );
};

export default VAllBookings;

import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Box, Container, Typography } from "@mui/material";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const localizer = momentLocalizer(moment);

const events = [
    {
        id: 1,
        title: "Event 1",
        start: new Date("2023-05-09T08:00:00"),
        end: new Date("2023-05-09T13:00:00"),
    },
    {
        id: 2,
        title: "Event 2",
        start: new Date("2023-05-09T10:00:00"),
        end: new Date("2023-05-09T11:00:00"),
    },
    {
        id: 3,
        title: "Event 3",
        start: new Date("2023-05-09T12:00:00"),
        end: new Date("2023-05-09T13:00:00"),
    },
    {
        id: 4,
        title: "Event 4",
        start: new Date("2023-05-10T14:00:00"),
        end: new Date("2023-05-10T23:00:00"),
    },
    {
        id: 5,
        title: "Event 5",
        start: new Date("2023-05-11T16:00:00"),
        end: new Date("2023-05-11T24:00:00"),
    },
];

const VVenueBook = () => {
    const navigate = useNavigate();

    const [selectedEvent, setSelectedEvent] = useState(null);
    const handleSelectEvent = (event) => {
        setSelectedEvent(event);
    };


    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };
    const handleEndDateChange = (date) => {
        setEndDate(date);
    };
    const handleBookingSubmit = () => {
        console.log(`Start Date & Time: ${startDate}`);
        console.log(`End Date & Time: ${endDate}`);
        navigate("/venue/payment");
    };

    return (
        <Container>
            <Typography variant="h1" align="left" gutterBottom>
                Venue Booking Calendar
            </Typography>

            <Box mt={10}>
                <Calendar
                    localizer={localizer}
                    events={events}
                    selectable
                    onSelectEvent={handleSelectEvent}
                    startAccessor="start"
                    endAccessor="end"
                    defaultView="week"
                    views={["week"]}
                    step={60}
                    showMultiDayTimes
                    style={{ height: 500 }}
                />
                {selectedEvent && (
                    <Box mt={3}>
                        <Typography variant="h3">{selectedEvent.title}</Typography>
                        <Typography variant="body1">
                            Start: {moment(selectedEvent.start).format("YYYY-MM-DD hh:mm A")}
                        </Typography>
                        <Typography variant="body1">
                            End: {moment(selectedEvent.end).format("YYYY-MM-DD hh:mm A")}
                        </Typography>
                    </Box>
                )}
            </Box>

            <Box mt={10}>
                <Typography variant="h1" align="left" gutterBottom>
                    Book Venue
                </Typography>
                <Container maxWidth="sm" style={{ paddingBottom: "200px" }}>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-end" mt={3}>
                        <MobileDateTimePicker
                            label="Start Date & Time"
                            onChange={handleStartDateChange}
                            inputFormat="dd/MM/yyyy hh:mm a"
                            renderInput={(props) => <TextField {...props} />}
                            ampm
                            style={{ marginRight: "10px" }}
                        />
                        <MobileDateTimePicker
                            label="End Date & Time"
                            onChange={handleEndDateChange}
                            inputFormat="dd/MM/yyyy hh:mm a"
                            renderInput={(props) => <TextField {...props} />}
                            ampm
                        />
                    </Box>
                    <Box display="flex" justifyContent="center" mt={2}>
                        <Button onClick={handleBookingSubmit} variant="contained">
                            Submit
                        </Button>
                    </Box>
                </Container>
            </Box>
        </Container>
    );

};

export default VVenueBook;

import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Box, Container, Typography } from "@mui/material";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import { TextField, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import WarningComponent from "../components/WarningComponent";

const localizer = momentLocalizer(moment);

const VVenueBook = () => {
    const { id } = useParams();
    const { vid } = useParams();

    const organizerId = Cookies.get('org_id');

    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [venue, setVenue] = useState({});

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
        const start = new Date(startDate).toISOString();
        const end = new Date(endDate).toISOString();

        if (moment(end).diff(moment(start), 'hours') < 1) {
            toast.error('Booking duration should be atleast 1 hour!', {
                position: toast.POSITION.TOP_CENTER,
            });
            return;
        }
        
        axios.post('http://localhost:5000/api/bookings', {
            start_time: start,
            end_time: end,
            duration: moment(end).diff(moment(start), 'hours'),
            venue: id,
            organizer: organizerId,
            event: vid,
            price: venue.price * moment(end).diff(moment(start), 'hours')
        }).then((res) => {
            toast.success("Booking saved successfully", {
                position: toast.POSITION.TOP_CENTER,
            });
            setTimeout(() => {
                navigate(`/org/dashboard/events/${vid}`);
            }, 2000);
        }).catch((err) => {
            console.log(err);
            toast.error('Error saving booking!', {
                position: toast.POSITION.TOP_CENTER,
            })
        });
    };

    useEffect(() => {
        // Fetch the venue booking
        axios
            .get(`http://localhost:5000/api/bookings/venue/${id}`)
            .then((res) => {
                const modifiedData = res.data.map((venue) => {
                    return {
                        id: venue._id,
                        title: "Private",
                        start: new Date(moment(venue.start_time)),
                        end: new Date(moment(venue.end_time)),
                        status: venue.booking_status
                    };
                });
                setEvents(modifiedData);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    useEffect(() => {
        // Fetch venue details
        axios.get(`http://localhost:5000/api/venues/${id}`).then((res) => {
            console.log(res.data);
            setVenue(res.data);
        }).catch((err) => {
            console.log(err);
        });
    }, [id]);

    return (
        <Container>
            <Typography variant="h1" align="left" gutterBottom>
                Venue Booking Calendar
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
                                display: 'block'
                            }
                        };
                    }}
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
                        <Typography variant="body1">Status: {selectedEvent.status}</Typography>
                    </Box>
                )}
            </Box>

            <Box mt={10}>
                <Typography variant="h1" align="left" gutterBottom>
                    Book Venue
                </Typography>
                <Container maxWidth="sm" style={{ paddingBottom: "20px" }}>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-end" mt={3}>
                        <MobileDateTimePicker
                            label="Start Date & Time"
                            onChange={handleStartDateChange}
                            inputFormat="dd/MM/yyyy hh:mm a"
                            renderInput={(props) => <TextField {...props} />}
                            ampm
                            style={{ marginRight: "10px" }}
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
                        <Button onClick={handleBookingSubmit} variant="contained">
                            Submit
                        </Button>
                    </Box>
                </Container>
            </Box>
            <Box  style={{ paddingBottom: "50px" }} pl={20} pr={20}>
            <WarningComponent message="Please note that once a manager approves an event during pending times, they become unavailable for booking. Choose a venue without any pending events for better availability." />
            </Box>
            <ToastContainer />
        </Container>
    );
}

export default VVenueBook;

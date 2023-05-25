import React, { useState, useEffect } from "react";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Box, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { TimePicker } from "@mui/x-date-pickers";
import { TextField, Button, MenuItem } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie"

const RequestAppointment = () => {
  const orgId = Cookies.get("org_id")
  const {id : requestID } = useParams()
  const navigate = useNavigate() 
  const [approvalRequest, setApprovalRequest] = useState({})
  const [requestTo, setRequestTo] = useState("")

  const fetchRequest = async () => {
    axios.
      get(`http://localhost:5000/api/approval/request/${requestID}`, 
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.data)
        setApprovalRequest(res.data.data)
        setRequestTo(res.data.data.requested_to.firstname + " " + res.data.data.requested_to.lastname)
        // setRequestTo(res.data.data.requested_to.name)
      })
      .catch((error) => {
        console.log(error.response.data)
        toast.error(error.response.data.message, { position: "top-right" })

      })
  }

  useEffect( () => {
    fetchRequest()
  }, [requestID])

  const sendAppointmentRequest = async (data) => {
    axios.
      post("http://localhost:5000/api/approval/appointment/", 
      data,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res)
        toast.success("Successfully Requested an Appointment", { position: "top-right" })

        setTimeout(() => {
          navigate(`/org/dashboard/events/approval/${approvalRequest.approval_id.event_id}`)
        }, 2000);
      })
      .catch((error) => {
        console.log(error.response.data)
        toast.error(error.response.data.message, { position: "top-right" })

      })
  }

  const [date, setDate] = useState(null);
  const [dateError, setDateError] = useState(null);

  const sixAM = moment("06:00", "HH:mm");
  const eightPM = moment("20:00", "HH:mm");
  const [startTime, setStartTime] = useState(null);
  const [startTimeError, setStartTimeError] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [endTimeError, setEndTimeError] = useState(null);

  const [mode, setMode] = useState(null);
  const [modeError, setModeError] = useState(null);

  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);

  const [meetinglink, setMeetingLink] = useState(null);
  const [meetinglinkError, setMeetingLinkError] = useState(null);

  const [appointmentNote, setAppointmentNote] = useState(null);
  const [appointmentNoteError, setAppointmentNoteError] = useState(null);

  const APPOINTMENT_MODE = {
    VIRTUAL: "Virtual",
    PHYSICAL: "Physical",
    EITHER: "Either",
  };

  const handleStartTimeChange = (value) => {
    console.log(value);

    switch (String(value)) {
      case "maxTime":
        setStartTimeError("Must be after 6 AM");
        break;
      case "minTime":
        setStartTimeError("Must be before 8 PM");
        break;
      default:
        setStartTimeError(null);
    }
    console.log(startTimeError);
  };

  const handleEndTimeChange = (value) => {
    switch (String(value)) {
      case "maxTime":
        setEndTimeError("Must be after 6 AM");
        break;

      case "minTime":
        setEndTimeError("Must be before 8 PM");
        break;

      case "greater":
        setEndTimeError("Start time cannot be after the end time ");
        break;

      case "equal":
        setEndTimeError("Start and end time cannot be same");
        break;

      default:
        setEndTimeError(null);
    }
  };

  const handleLinkChange = (value) => {
    setMeetingLink(value);
    setMeetingLinkError(null);
    if (meetinglink == "" || meetinglink === null)
      setMeetingLinkError("Required");
    else
      try {
        new URL(value);
      } catch (error) {
        setMeetingLinkError("Invalid URL");
      }
  };

  const handleSubmitBtn = () => {
    if (date === null) setDateError("Required");
    if (startTime === null) setStartTimeError("Required");
    if (endTime === null) setEndTimeError("Required");

    if (mode === null) setModeError("Required");
    else {
      if (mode == "Virtual") {
        if (meetinglink === null) {
          setMeetingLinkError("Required");
          setLocationError(null);
        } else handleLinkChange(meetinglink);
      } else if (mode == "Physical") {
        if (location === null) {
          setMeetingLinkError(null);
          setLocationError("Required");
        }
      } else if (mode == "Either") {
        if (location === null || location == "") setLocationError("Required");
        if (meetinglink === null || meetinglink == "")
          setMeetingLinkError("Required");
        else handleLinkChange(meetinglink);
      }
    }

    if (appointmentNote === null) setAppointmentNoteError("Required");

    if (dateError === null && date !== null)
      if (startTimeError === null && startTime !== null)
        if (endTimeError === null && endTime !== null)
          if (modeError === null && mode !== null)
            if (locationError === null && meetinglinkError === null)
              if (appointmentNoteError === null && appointmentNote !== null) {
                const appointment = {
                  approval_request_id : requestID,
                  date: date.toString(),
                  start_time: startTime.toLocaleString(),
                  end_time: endTime.toString(),
                  mode: mode,
                  location: location,
                  status: "Sent",
                  meetinglink: meetinglink,
                  appointment_note: appointmentNote,
                  requested_by : orgId
                };
                console.log(appointment)
                console.log("--")
                sendAppointmentRequest(appointment)
              }
  };

  return (
    <Box className="flex flex-col items-center h-full">
      <ToastContainer />
      <Typography variant="h2" gutterBottom>
        Request an Appointment
      </Typography>

      <Typography variant="h4" gutterBottom>
        Appointment with: {requestTo}
      </Typography>

      <Box width="50%" className="h-3/4">
        <div className="flex flex-col align-middle h-full justify-between">
          <DatePicker
            id="date"
            name="date"
            label="Date"
            disablePast
            value={date}
            onError={(newError) => setDateError(newError)}
            slotProps={{
              textField: {
                helperText: dateError,
                error: Boolean(dateError),
              },
            }}
            onChange={(value) => {
              setDate(value);
              setDateError(null);
            }}
          ></DatePicker>

          <TimePicker
            id="start_time"
            name="start_time"
            label="Start Time"
            value={startTime}
            minTime={sixAM}
            maxTime={eightPM}
            onError={handleStartTimeChange}
            slotProps={{
              textField: {
                helperText: startTimeError,
                error: Boolean(startTimeError),
              },
            }}
            onChange={(value) => {
              setStartTime(value);
              setStartTimeError(null);
            }}
          ></TimePicker>

          <TimePicker
            id="end_time"
            name="end_time"
            label="End Time"
            value={endTime}
            minTime={sixAM}
            maxTime={eightPM}
            onError={handleEndTimeChange}
            slotProps={{
              textField: {
                helperText: endTimeError,
                error: Boolean(endTimeError),
              },
            }}
            onChange={(value) => {
              setEndTime(value);
              const date1 = Date.parse(startTime);
              const date2 = Date.parse(value);
              if (date1 == date2)
                setEndTimeError("Start and end time cannot be same");
              else if (date1 > date2)
                setEndTimeError("End time cannot be before the end time ");
              else setEndTimeError(null);
            }}
          ></TimePicker>

          <TextField
            id="mode"
            name="mode"
            label="Mode"
            select
            value={mode}
            onChange={(event) => {
              setMode(event.target.value);
              setModeError(null);
              if (event.target.value == "Physical") {
                setMeetingLinkError(null);
                if (location === null || location == "")
                  setLocationError("Required");
              }

              if (event.target.value == "Either") {
                handleLinkChange(meetinglink);
                if (location === null || location == "")
                  setLocationError("Required");
              }

              if (event.target.value == "Virtual") {
                handleLinkChange(meetinglink);
                setLocationError(null);
              }
            }}
            onError={(err) => setModeError(err)}
            helperText={modeError}
            error={Boolean(modeError)}
            slotProps={{
              textField: {
                helperText: modeError,
                error: Boolean(modeError),
              },
            }}
          >
            {Object.keys(APPOINTMENT_MODE).map((x) => (
              <MenuItem key={x} value={APPOINTMENT_MODE[x]}>
                {APPOINTMENT_MODE[x]}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            id="location"
            name="location"
            label="Location"
            value={location}
            onChange={(event) => {
              setLocation(event.target.value);
              setLocationError(null);
              if (event.target.value == "") setLocationError("Required");
            }}
            onError={(err) => setLocationError(err)}
            helperText={locationError}
            error={Boolean(locationError)}
          />

          <TextField
            id="meetinglink"
            name="meetinglink"
            label="Meeting Link"
            value={meetinglink}
            onChange={(event) => handleLinkChange(event.target.value)}
            onError={(err) => setMeetingLinkError(err)}
            helperText={meetinglinkError}
            error={Boolean(meetinglinkError)}
          />

          <TextField
            id="appointment_note"
            name="appointment_note"
            label="Appointment Note"
            multiline
            rows={4}
            onChange={(event) => {
              setAppointmentNote(event.target.value);
              setAppointmentNoteError(null);
              if (event.target.value == "") setAppointmentNoteError("Required");
            }}
            onError={(err) => setAppointmentNoteError(err)}
            helperText={appointmentNoteError}
            error={Boolean(appointmentNoteError)}
          />
          <Button variant="contained" size="large" onClick={handleSubmitBtn}>
            Submit
          </Button>
        </div>
      </Box>
    </Box>
  );
};

export default RequestAppointment;

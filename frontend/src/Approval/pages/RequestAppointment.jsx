import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Box, Container, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { TimePicker } from "@mui/x-date-pickers";
import { TextField, Button, Select, MenuItem } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";

const RequestAppointment = () => {
  const APPOINTMENT_MODE = {
    VIRTUAL: "Virtual",
    PHYSICAL: "Physical",
    EITHER: "Either",
  };

  const appointmentSchema = Yup.object().shape({
    meetinglink: Yup.string().url("Meeting Link must be a valid URL"),
  });

  const formik = useFormik({
    initialValues: {
      meetinglink: "",
    },
    validationSchema: appointmentSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const [date, setDate] = useState(null);
  const [dateError, setDateError] = useState(null);
  const [startTime, setStarTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const [mode, setMode] = useState("");
  const [location, setLocation] = useState("");
  const [meetinglink, setMeetingLink] = useState("");
  const [appointmentNote, setAppointmentNote] = useState("");

  // useEffect ( () => {
  //   if (date == null) {
  //     setDateError("Required");
  //   } else {
  //     setDateError("");
  //   }

  //   console.log(`${dateError}`)
  //   toast.error(`Error :  ${Boolean(dateError)}`, {position: "top-right"})
  // }, [date])

  const handleDateBlur = () => {
    toast.info(`OnBlur `, {position:"top-center"})
    if (!validateDate(date)) {
      setDateError("Invalid date");
    } else {
      setDateError(null);
    }
  };

  const handleDateChange = (value) => {
    toast.error(`value :  ${value}`, { position: "top-right" });
    setDate(value);
    if (!validateDate(value)) {
      setDateError("Invalid date");
    } else {
      setDateError(null);
    }
  };

  const validateDate = (value) => {
    return value !== null;
  };

  const handleSubmitBtn = () => {
    if (!validateDate(date)) {
      toast.error(`validation failed :  ${date}`, { position: "top-right" });
      setDateError("Invalid date");
    } else {
      setDateError(null);
    }
  };
  const handleFocus = () => {
    toast.info(`OnBlur `, {position:"top-center"})
  }

  return (
    <Box className="flex flex-col items-center h-full">
      <ToastContainer />
      <Typography variant="h4" gutterBottom>
        Request an Appointment
      </Typography>

      <Typography variant="h6" gutterBottom>
        Appointment with: [Person's Name]
      </Typography>

      <Box width="50%" mt={3} className="h-3/4">
        <div className="flex flex-col align-middle h-full justify-between">
          <DatePicker
            id="date"
            name="date"
            label="Date"
            disablePast="true"
            value={date}
            onError={(newError) => setDateError(newError)}
            slotProps={{
              textField: {
                helperText: dateError,
                error: Boolean(dateError),
              },
            }}
            onBlur={handleDateBlur}
            onChange={handleDateChange}
            onFocus={handleFocus}
          ></DatePicker>

          <TimePicker
            id="start_time"
            name="start_time"
            label="Start Time"
            value={startTime}
          ></TimePicker>

          <TimePicker
            id="end_time"
            name="end_time"
            label="End Time"
            value={endTime}
          ></TimePicker>
          <TextField id="mode" name="mode" label="Mode" select value={mode}>
            {Object.keys(APPOINTMENT_MODE).map((mode) => (
              <MenuItem key={mode} value={APPOINTMENT_MODE[mode]}>
                {APPOINTMENT_MODE[mode]}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            id="location"
            name="location"
            label="Location"
            value={location}
          />

          <TextField
            id="meetinglink"
            name="meetinglink"
            label="Meeting Link"
            value={meetinglink}
            onBlur={handleDateBlur}
            onChange={handleDateChange}
            onFocus={handleFocus}
          />

          <TextField
            id="appointment_note"
            name="appointment_note"
            label="Appointment Note"
            multiline
            rows={4}
            value={appointmentNote}
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

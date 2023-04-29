import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "react-datepicker/dist/react-datepicker.css";
import { DatePicker } from '@mui/x-date-pickers';
import { TimePicker } from '@mui/x-date-pickers';
import {
  Button,
  Card,
  CardContent,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import API from "../../components/Approval/api.approval";
import { toast, ToastContainer } from "react-toastify";
import DateFnsUtils from "@date-io/date-fns";
import { useNavigate } from "react-router";

const APPOINTMENT_MODE = {
  VIRTUAL: "Virtual",
  PHYSICAL: "Physical",
  EITHER: "Either",
};

const RequestAppointment = () => {
  const { id: approvalRequestID } = useParams();
  const [sendingTo, setSendingTo] = useState(null);
  const [sendingFrom, setSendingFrom] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [EndTime, setEndTime] = useState(new Date());
  const [note, setNote] = useState("");
  const navigate = useNavigate();

  const getApprovalRequest = async () => {
    await API.get(`request/${approvalRequestID}`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    })
      .then((res) => {
        console.log(res.data.data.requested_to);
        setSendingTo(res.data.data.requested_to);
        setSendingFrom(res.data.data.requested_by);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmitBtn = async (values) => {
    if(values.mode != "" && values.location != "" && values.meetinglink != "" && values.appointment_note != ""){
    if (startTime > EndTime) {
      toast.error("Start Time cannot be after End Time", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
    } else if (startTime === EndTime) {
      console.log("Start Time cannot be same as End Time");
      toast.error("Start Time cannot be same as End Time", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
    }

    const data = {
      approval_request_id: approvalRequestID,
      date: selectedDate.toISOString(),
      start_time: startTime.toISOString(),
      end_time: EndTime.toISOString(),
      mode: values.mode,
      location: values.location,
      status: "Sent",
      meetinglink: values.meetinglink,
      appointment_note: values.appointment_note,
    };

    await API.post("/appointment", data, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);
        toast.success("Appointment Request Sent", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        });
      })
      .catch((err) => {
        console.log(err.response.data);
      });

    // refresh
      navigate(0);
    }
    else{
      toast.error("Please fill all the fields", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
    }
  };

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  useEffect(() => {
    if (startTime > EndTime) {
      toast.error("Start Time cannot be after End Time", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
    }
  }, [EndTime]);

  return (
    <div>
      <Formik
        initialValues={{
          mode: APPOINTMENT_MODE.EITHER,
          location: "",
          meetinglink: "",
          appointment_note: "",
        }}
        validationSchema={Yup.object().shape({
          location: Yup.string(),
          meetinglink: Yup.string().url("Meeting Link must be a valid URL"),
          appointment_note: Yup.string()
            .matches(
              /^[a-zA-Z0-9@\s]+$/,
              "Only alphanumeric characters and @ are allowed"
            ),
        })}
        onSubmit={(values) => {
          handleSubmitBtn(values);
        }}
        onChange={(values) => {
          values.appointment_note = note;
          values.mode = document.getElementById("demo-simple-select").value;
        }}
      >
        {({ values, touched, errors, handleSubmit, handleChange }) => (
          <Form className="w-full flex flex-col justify-center align-middle items-center ">
            <div className="w-1/2 m-4 p-4 flex flex-col justify-center items-center rounded-lg">
              <ToastContainer />

              <Typography variant="h4" className="m-4">
                Request Appointment
              </Typography>

                <div className="w-full p-2 flex flex-col justify-center align-middle items-center">
                  <div className="m-4 w-3/4">
                    <div className="mb-8">
                      <Typography variant="h6" className="m-2">
                        Appointment With
                      </Typography>
                      <Typography variant="h6" className="m-2">
                        {sendingTo != null ? sendingTo.name : ""}
                      </Typography>
                    </div>

                    <div className="mb-8">
                      <Typography variant="h6" className="m-2">
                        Date
                      </Typography>
                      <DatePicker
                        onChange={(date) => setSelectedDate(date)}
                        error={touched.date && !!errors.date}
                        helperText={touched.date && errors.date}
                      />
                    </div>

                    <Typography variant="h6" className="m-2">
                      Time
                    </Typography>

                    <div className="py-2 w-full flex flex-row justify-between">
                      <TimePicker
                        label="Start Time"
                        onChange={(time) => setStartTime(time)}
                        
                      />

                      <TimePicker
                        label="End Time"
                        onChange={(time) => setEndTime(time)}
                      />
                    </div>
                  </div>

                  <div className="m-4 w-3/4">
                    <div className="mb-4 w-full">
                    <InputLabel id="demo-simple-select-label">Appointment Mode</InputLabel>
                      <Select
                      className="w-1/2"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Appointment Mode"
                      onChange={(value) => {values.mode = value.target.value}}
                      value={values.mode}
                      error={touched.mode && !!errors.mode}
                      helperText={touched.mode && errors.mode}
                      >
                        {Object.values(APPOINTMENT_MODE).map((mode) => (
                          <MenuItem value={values.mode}>{mode}</MenuItem>
                        ))}
                      </Select>
                    </div>

                    <div className="mt-4 w-full mb-4">
                      {values.mode === APPOINTMENT_MODE.PHYSICAL ||
                      values.mode === APPOINTMENT_MODE.EITHER ? (
                        <Field
                          as={TextField}
                          name="location"
                          label="Location"
                          fullWidth
                          value={values.location}
                          error={touched.location && !!errors.location}
                          helperText={touched.location && errors.location}
                        />
                      ) : null}

                      {values.mode === APPOINTMENT_MODE.VIRTUAL ||
                      values.mode === APPOINTMENT_MODE.EITHER ? (
                        <div className="mt-2 mb-2">
                          <Field
                          as={TextField}
                          name="meetinglink"
                          label="Meeting Link"
                          fullWidth
                          value={values.meetinglink}
                          error={touched.meetinglink && !!errors.meetinglink}
                          helperText={touched.meetinglink && errors.meetinglink}
                        />
                          </div>
                      ) : null}
                    </div>
                    <Field
                      as={TextField}
                      name="appointment_note"
                      label="Note"
                      fullWidth
                      onChange={handleChange}
                      value={values.appointment_note}
                      error={
                        touched.appointment_note && !!errors.appointment_note
                      }
                      helperText={
                        touched.appointment_note && errors.appointment_note
                      }
                    />

                    <div className="m-2 w-full flex justify-center align-middle">
                      <Button
                        typeof="submit"
                        variant="contained"
                        color="primary"
                        type="submit"
                        style={{ width: "50%", fontSize: "1rem" }}
                      >
                        Submit
                      </Button>
                    </div>
                  </div>
                </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RequestAppointment;

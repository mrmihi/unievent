import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router";

const APPOINTMENT_MODE = {
  VIRTUAL: "Virtual",
  PHYSICAL: "Physical",
  EITHER: "Either",
};

const RequestAppointment = () => {
  return (<h1>Request Appointment</h1>)
}

export default RequestAppointment
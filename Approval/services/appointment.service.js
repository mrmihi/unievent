const { Appointment } = require("../models/approval.model");

const createAppointment = async ({
    approval_request_id,
    date,
    start_time,
    end_time,
    mode,
    location,
    status,
    sent_on,
    responded_on,
    meetinglink,
    appointment_note,
}) => {
  const appointment = new Appointment({
    approval_request_id,
    date,
    start_time,
    end_time,
    mode,
    location,
    status,
    sent_on,
    responded_on,
    meetinglink,
    appointment_note,
  });
  return appointment.save();
};

const getAllAppointments = async () => {};
const getAppointment = async () => {};
const updateAppointment = async () => {};
const deleteAppointment = async () => {};

module.exports = {
    createAppointment,
    getAllAppointments,
    getAppointment,
    updateAppointment,
    deleteAppointment,
};

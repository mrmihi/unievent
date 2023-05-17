const { Appointment, Approval_Request } = require("../models/approval.model");

const getAppointmentsOfUser = async (userID) => {
  const allAppointments = await Appointment.find({})
  .populate("requested_by")
    .populate("approval_request_id")
  const filteredAppointments = allAppointments.filter(
    (response) => response.approval_request_id.requested_to == userID
  );
  return filteredAppointments;
};

const getPendingAppoinmentsOfUser = async (userID) => {
  const allAppointments = await Appointment.find({})
    .populate("approval_request_id")
    .populate("requested_by");
  const filteredAppointments = allAppointments.filter((response) => response.approval_request_id.requested_to == userID  && response.status == "Sent"
  );
  return filteredAppointments;
};

const getAppointmentByRequestID = async (requestId) => {
  const approvalRequests = await Appointment.find({
    approval_request_id: requestId,
  });
  return approvalRequests;
};

const getAllAppointments = async () => {
  const appointments = await Appointment.find({}).populate(
    "approval_request_id"
  );

  return appointments;
};

const getAppointment = async (id) => {
  const appointment = await Appointment.findById(id).populate(
    "approval_request_id"
  );

  return appointment;
};

const createAppointment = async (appointment) => {
  const newAppointment = await Appointment.create(appointment);
  return newAppointment;
};

const updateAppointment = async (id, appointment) => {
  const updatedAppointment = await Appointment.findByIdAndUpdate(
    id,
    appointment,
    {
      new: true,
      runValidators: true,
    }
  );
  return updatedAppointment;
};

const deleteAppointment = async (id) => {
  const deletedAppointment = await Appointment.findByIdAndDelete(id);
  return deletedAppointment;
};

module.exports = {
  createAppointment,
  getAppointment,
  getAllAppointments,
  updateAppointment,
  deleteAppointment,
  getAppointmentsOfUser,
  getAppointmentByRequestID,
  getPendingAppoinmentsOfUser,
};

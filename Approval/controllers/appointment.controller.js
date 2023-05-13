const AppointmentService = require("../services/appointment.service");
const { HTTP_STATUS } = require("../utils/http_status");
const { makeResponse } = require("../utils/response");
const { Appointment } = require("../models/approval.model");

const getAllAppointment = async (req, res) => {
  const result = await AppointmentService.getAllAppointments();
  return makeResponse({
    res,
    message: result.message,
    data: result.data,
    success: result.success,
  });
}

const createAppointment = async (req, res) => {
    const appointmentData = req.body;
    const result = await AppointmentService.createAppointment(appointmentData);
    
    return makeResponse({
        res,
        success: result.success,
        message: result.message,
        data: result.data,
    });
}

const getAppointment = async (req, res) => {
    const { id: appointmentID } = req.params;
    const result = await AppointmentService.getAppointment(appointmentID);
    return makeResponse({
        res,
        message: result.message,
        data: result.data,
        success: result.success,
    });
}

const updateAppointment = async (req, res) => {
    const { id: appointmentID } = req.params;
    const appointmentData = req.body;
    const result = await AppointmentService.updateAppointment(appointmentID, appointmentData);
    return makeResponse({
        res,
        success: result.success,
        message: result.message,
        data: result.data,
    });
}

const deleteAppointment = async (req, res) => {
    const { id: appointmentID } = req.params;
    const result = await AppointmentService.deleteAppointment(appointmentID);
    return makeResponse({
        res,
        success: result.success,
        message: result.message,
        data: result.data,
    });
};

const getAppoinmentsOfUser = async (req, res) => {

    // const { id: userID } = req.params;
    // const result = await AppointmentService.getAppoinmentsOfUser(userID);
    // return makeResponse({
    //     res,
    //     message: result.message,
    //     data: result.data,
    //     success: result.success,
    // });
}

module.exports = {
  getAllAppointment,
  createAppointment,
  getAppointment,
  updateAppointment,
  deleteAppointment,
  getAppoinmentsOfUser,
};


module.exports = {
  getAllAppointment,
  createAppointment,
  getAppointment,
  updateAppointment,
  deleteAppointment,
  getAppoinmentsOfUser,
};

const AppointmentService = require('../services/appointment.service');
const { HTTP_STATUS } = require('../utils/http_status');
const { makeResponse } = require('../utils/response');
const { Appointment } = require('../models/approval.model');

const getAllAppointment = async (req, res) => {}
const createAppointment = async (req, res) => {}
const getAppointment = async (req, res) => {}
const updateAppointment = async (req, res) => {}
const deleteAppointment = async (req, res) => {}

module.exports = {
    getAllAppointment,
    createAppointment,
    getAppointment,
    updateAppointment,
    deleteAppointment
};
const { Appointment, Approval_Request } = require("../models/approval.model");

const getAppointmentsOfUser = async (userID) => {
    const approvalRequests = await Approval_Request.find({ requested_to: userID })
    
    approvalRequests.forEach(async (approvalRequest) => {
        const appointment = await Appointment.find({ approval_request_id: approvalRequest._id })
                                .populate("approval_request_id")
        return appointment;
    })
};

const getAllAppointments = async () => {
    const appointments = await Appointment.find({})
            .populate("approval_request_id")

    return appointments;
};

const getAppointment = async (id) => {
    const appointment = await Appointment.findById(id)
            .populate("approval_request_id")

    return appointment;
}

const createAppointment = async (appointment) => {
    const newAppointment = await Appointment.create(appointment)
    return newAppointment;
};

const updateAppointment = async (id, appointment) => {
    const updatedAppointment = await Appointment.findByIdAndUpdate(id, appointment, {
        new: true,
        runValidators: true,
    })
    return updatedAppointment;
}

const deleteAppointment = async (id) => {
    const deletedAppointment = await Appointment.findByIdAndDelete(id)
    return deletedAppointment;
}

module.exports = {
    createAppointment,
    getAppointment,
    getAllAppointments,
    updateAppointment,
    deleteAppointment,
    getAppointmentsOfUser
};
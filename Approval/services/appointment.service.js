const { Appointment } = require("../models/approval.model");
const appointmentRepository = require("../repositories/appointment.repository.js");

const getAppoinmentsOfUser = async (userID) => {
  try {
    const appointments = await appointmentRepository.getAppointmentsOfUser(userID);

    if (appointments.length == 0) {
      return {
        success: false,
        message: "No Appointments found",
      };
    }

    return {
      message: "Appointments fetched successfully",
      data: appointments,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

const getPendingAppoinmentsOfUser = async (userID) => {
  try {
    const appointments = await appointmentRepository.getPendingAppoinmentsOfUser(userID);

    if (appointments.length == 0) {
      return {
        success: false,
        message: "No Appointments found",
      };
    }

    return {
      message: "Appointments fetched successfully",
      data: appointments,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

const getAppointmentByRequestID = async (requestId) => {
  try {
    const appointments = await appointmentRepository.getAppointmentByRequestID(requestId);

    if (appointments.length == 0) {
      return {
        success: false,
        message: "No Appointments found",
      };
    }

    return {
      message: "Appointments fetched successfully",
      data: appointments,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

const createAppointment = async (appointmentData) => {
  try {
    const appointment = await appointmentRepository.createAppointment(appointmentData);
    
    if (!appointment) {
      return {
        success: false,
        message: "Appointment not created",
      };
    }

    return {
      message: "Appointment created successfully",
      data: appointment,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};


const getAllAppointments = async (req, res) => {
  try {
    const appointments = await appointmentRepository.getAllAppointments();

    if (appointments.length == 0) {
      return {
        success: false,
        message: "No Appointments found",
      };
    }

    return {
      message: "Appointments fetched successfully",
      data: appointments,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

const getAppointment = async (id) => {
    try {
      const appointment = await appointmentRepository.getAppointment(id);
    
      if(!appointment) {
        return {
          success: false,
          message: `No Appointment with id: ${id}`
        }
      }

      return {
        message: "Appointment fetched successfully",
        data: appointment,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
};

const updateAppointment = async (id, appointmentData) => {
  try{
    const appointment = await appointmentRepository.updateAppointment(id, appointmentData);

    if(!appointment) {
      return {
        success: false,
        message: `No Appointment with id: ${id}`
      }
    }

    return {
      message: "Appointment updated successfully",
      data: appointment,
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

const deleteAppointment = async (id) => {
  try {
    const appointment = await appointmentRepository.deleteAppointment(id);

    if(!appointment) {
      return {
        success: false,
        message: `No Appointment with id: ${id}`
      }
    }

    return {
      message: "Appointment deleted successfully",
      data: appointment,
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

module.exports = {
    createAppointment,
    getAllAppointments,
    getAppointment,
    updateAppointment,
    deleteAppointment,
    getAppoinmentsOfUser,
    getPendingAppoinmentsOfUser,
    getAppointmentByRequestID
};

const eventApprovalServices = require("../repositories/approval.event.repository.js");

const createEventApproval = async (eventApprovalData) => {
  try {
    const eventApproval = await eventApprovalServices.createEventApproval(
      eventApprovalData
    );

    if (!eventApproval) {
      return {
        success: false,
        message: "Event Approval not created",
      };
    }

    return {
      message: "Event Approval created successfully",
      data: eventApproval,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

const getAllEventApprovals = async (req, res) => {
  try {
    const eventApprovals = await eventApprovalServices.getAllEventApprovals();

    if (eventApprovals.length == 0) {
      return {
        success: false,
        message: "No Event Approvals found",
      };
    }

    return {
      message: "Event Approvals fetched successfully",
      data: eventApprovals,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

const getEventApproval = async (id) => {
    try {
      const eventApproval = await eventApprovalServices.getEventApproval(id);
    
      if(!eventApproval) {
        return {
          success: false,
          message: `No Event Approval with id: ${id}`
        }
      }

      return {
        message: "Event Approval fetched successfully",
        data: eventApproval,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
};
const updateEventApproval = async (id, eventApprovalData) => {
  try{
    const eventApproval = await eventApprovalServices.updateEventApproval(id, eventApprovalData);

    if(!eventApproval) {
      return {
        success: false,
        message: `No Event Approval with id: ${id}`
      }
    }

    return {
      message: "Event Approval updated successfully",
      data: eventApproval,
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};
const deleteEventApproval = async (id) => {
  try {
    const eventApproval = await eventApprovalServices.deleteEventApproval(id);

    if(!eventApproval) {
      return {
        success: false,
        message: `No Event Approval with id: ${id}`
      }
    }

    return {
      message: "Event Approval deleted successfully",
      data: eventApproval,
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

module.exports = {
  createEventApproval,
  getAllEventApprovals,
  getEventApproval,
  updateEventApproval,
  deleteEventApproval,
};

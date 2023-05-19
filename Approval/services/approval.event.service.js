const eventApprovalRepository = require("../repositories/approval.event.repository.js");
const { HTTP_STATUS } = require("../utils/http_status");

const createEventApproval = async (eventApprovalData) => {
  try {
    const eventApproval = await eventApprovalRepository.createEventApproval(
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
    const eventApprovals = await eventApprovalRepository.getAllEventApprovals();

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
    const eventApproval = await eventApprovalRepository.getEventApproval(id);

    if (!eventApproval) {
      return {
        success: false,
        message: `No Event Approval with id: ${id}`,
      };
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
  try {
    const eventApproval = await eventApprovalRepository.updateEventApproval(
      id,
      eventApprovalData
    );

    if (!eventApproval) {
      return {
        success: false,
        message: `No Event Approval with id: ${id}`,
      };
    }

    return {
      message: "Event Approval updated successfully",
      data: eventApproval,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};
const deleteEventApproval = async (id) => {
  try {
    const eventApproval = await eventApprovalRepository.deleteEventApproval(id);

    if (!eventApproval) {
      return {
        success: false,
        message: `No Event Approval with id: ${id}`,
      };
    }

    return {
      message: "Event Approval deleted successfully",
      data: eventApproval,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

const getEventApprovalsByOrgId = async (orgID) => {
  try {
    const eventApprovals = await eventApprovalRepository.getAllEventApprovalsByOrgID(orgID);

    if (eventApprovals.length == 0) {
      return {
        success: false,
        message: "No Event Approval found",
        data: req.body,
      };
    }

    const filteredEventApprovals = [];
    eventApprovals.forEach((eventApproval) => {
      const eventDetails = eventApproval.event_id;
      if (eventDetails.orgId == orgID)
        filteredEventApprovals.push(eventApproval);
    });

    return {
      message: `Approval details of organization id ${orgID} fetched successfully`,
      data: eventApprovals,
    };

  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

const getEventApprovalsByEventId = async (eventID) => {
  try {
    const eventApprovals = await eventApprovalRepository.getAllEventApprovalsByEventID(eventID);

    if (eventApprovals.length == 0) {
      return {
        success: false,
        message: `No Event Approval for the event id: ${eventID}`,
        data: eventApprovals,
      };
    }

    return {
      message: `Approval details of event id ${eventID} fetched successfully`,
      data: eventApprovals,
    };
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
  getEventApprovalsByEventId,
  getEventApprovalsByOrgId,
};

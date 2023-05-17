const { Approval_Request } = require("../models/approval.model");
const approvalRequestRepository = require("../repositories/approval.request.repository.js");

const getPendingApprovalRequestsOfUser = async (userID) => {
  try {
    const approvalRequests = await approvalRequestRepository.getPendingApprovalRequestsOfUser(userID);

    if (approvalRequests.length == 0) {
      return {
        success: false,
        message: "No Approval Requests found",
      };
    }

    return {
      message: "Approval Requests fetched successfully",
      data: approvalRequests,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

const getApprovalRequestsOfUser = async (userID) => {
  try {
    const approvalRequests = await approvalRequestRepository.getApprovalRequestsOfUser(userID);

    if (approvalRequests.length == 0) {
      return {
        success: false,
        message: "No Approval Requests found",
      };
    }

    return {
      message: "Approval Requests fetched successfully",
      data: approvalRequests,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

const createApprovalRequest = async (approvalRequestData) => {
  try {
    const approvalRequest = await approvalRequestRepository.createApprovalRequest(approvalRequestData);
    
    if (!approvalRequest) {
      return {
        success: false,
        message: "Approval Request not created",
      };
    }

    return {
      message: "Approval Request created successfully",
      data: approvalRequest,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

const getAllApprovalRequests = async (req, res) => {
  try {
    const approvalRequests = await approvalRequestRepository.getAllApprovalRequests();

    if (approvalRequests.length == 0) {
      return {
        success: false,
        message: "No Approval Requests found",
      };
    }

    return {
      message: "Approval Requests fetched successfully",
      data: approvalRequests,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

const getApprovalRequest = async (id) => {
    try {
      const approvalRequest = await approvalRequestRepository.getApprovalRequest(id);
    
      if(!approvalRequest) {
        return {
          success: false,
          message: `No Approval Request with id: ${id}`
        }
      }

      return {
        message: "Approval Request fetched successfully",
        data: approvalRequest,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
};
const updateApprovalRequest = async (id, approvalRequestData) => {
  try{
    const approvalRequest = await approvalRequestRepository.updateApprovalRequest(id, approvalRequestData);

    if(!approvalRequest) {
      return {
        success: false,
        message: `No Approval Request with id: ${id}`
      }
    }

    return {
      message: "Approval Request updated successfully",
      data: approvalRequest,
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};
const deleteApprovalRequest = async (id) => {
  try {
    const approvalRequest = await approvalRequestRepository.deleteApprovalRequest(id);

    if(!approvalRequest) {
      return {
        success: false,
        message: `No Approval Request with id: ${id}`
      }
    }

    return {
      message: "Approval Request deleted successfully",
      data: approvalRequest,
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

const deleteRequestsByEventApprovalID = async (eventApprovalID) => {
  try {
    const approvalRequests = await approvalRequestRepository.deleteRequestsByEventApprovalID(eventApprovalID);

    if(!approvalRequests) {
      return {
        success: false,
        message: `No Approval Requests with eventApprovalID: ${eventApprovalID}`
      }
    }
    
    return {
      message: "Approval Requests deleted successfully",
      data: approvalRequests,
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

module.exports = {
    createApprovalRequest,
    getAllApprovalRequests,
    getApprovalRequest,
    updateApprovalRequest,
    deleteApprovalRequest,
    getApprovalRequestsOfUser,
    getPendingApprovalRequestsOfUser,
    deleteRequestsByEventApprovalID,
};

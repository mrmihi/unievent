const { Approval_Request } = require("../models/approval.model");

const createApprovalRequest = async ({
    approval_id,
    type,
    requested_at,
    requested_to,
    requested_by,
    viewed_at,
    status,
    request_note,
    responded_at,
}) => {
  const approvalRequest = new Approval_Request({
    approval_id,
    type,
    requested_at,
    requested_to,
    requested_by,
    viewed_at,
    status,
    request_note,
    responded_at,
  });
  return approvalRequest.save();
};

const getAllApprovalRequests = async () => {};
const getApprovalRequest = async () => {};
const updateApprovalRequest = async () => {};
const deleteApprovalRequest = async () => {};

module.exports = {
    createApprovalRequest,
    getAllApprovalRequests,
    getApprovalRequest,
    updateApprovalRequest,
    deleteApprovalRequest,
};

const ApprovalRequestService = require("../services/approval.request.service");
const { HTTP_STATUS } = require("../utils/http_status");
const { makeResponse } = require("../utils/response");



//Retrives all the approval requests for a particular 
const getPendingApprovalRequestsOfUser = async (req, res) => {
  const { id : userID } = req.params; 
  const result = await ApprovalRequestService.getPendingApprovalRequestsOfUser(userID);
  return makeResponse({
    res,
    message: result.message,
    data: result.data,
    success: result.success,
  });
};

//Retrives all the approval requests for a particular 
const getApprovalRequestsOfUser = async (req, res) => {
  const { id : userID } = req.params; 
  const result = await ApprovalRequestService.getApprovalRequestsOfUser(userID);
  return makeResponse({
    res,
    message: result.message,
    data: result.data,
    success: result.success,
  });
};

//Retrives all the approval requests
const getAllApprovalRequests = async (req, res) => {
  const result = await ApprovalRequestService.getAllApprovalRequests();
  return makeResponse({
    res,
    message: result.message,
    data: result.data,
    success: result.success,
  });
};

//Retrive an Approval Request by id
const getApprovalRequest = async (req, res) => {
  const { id : approvalRequestID } = req.params; 
  const result = await ApprovalRequestService.getApprovalRequest(approvalRequestID);
  return makeResponse({
    res,
    message: result.message,
    data: result.data,
    success: result.success,
  });
};

//Create Approval Request
const createApprovalRequest = async (req, res) => {
  const eventApprovalData = req.body;
  const result = await ApprovalRequestService.createApprovalRequest(eventApprovalData);

  return makeResponse({
    res,
    success: result.success,
    message: result.message,
    data: result.data,
  });
};

//Update Approval Request
const updateApprovalRequest = async (req, res) => {
  const { id : approvalRequestID } = req.params;
  const eventApprovalData = req.body;
  const result = await ApprovalRequestService.updateApprovalRequest(approvalRequestID, eventApprovalData);
  return makeResponse({
    res,
    success: result.success,
    message: result.message,
    data: result.data,
  });
};

//Delete Approval Request
const deleteApprovalRequest = async (req, res) => {
  const { id : approvalRequestID } = req.params;
  const result = await ApprovalRequestService.deleteApprovalRequest(approvalRequestID);
  return makeResponse({
    res,
    success: result.success,
    message: result.message,
    data: result.data,
  });
};

const deleteRequestsByEventApprovalID = async (req, res) => {
  const { id : eventApprovalID } = req.params;
  const result = await ApprovalRequestService.deleteRequestsByEventApprovalID(eventApprovalID);
  return makeResponse({
    res,
    success: result.success,
    message: result.message,
    data: result.data,
  });
};

module.exports = {
  createApprovalRequest,
  getApprovalRequest,
  getAllApprovalRequests,
  updateApprovalRequest,
  deleteApprovalRequest,
  getApprovalRequestsOfUser,
  getPendingApprovalRequestsOfUser,
  deleteRequestsByEventApprovalID
};

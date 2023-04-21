const EventApprovalService = require("../services/approval.event.service");
const { HTTP_STATUS } = require("../utils/http_status");
const { makeResponse } = require("../utils/response");
const { Event_Approval } = require("../models/approval.model");

//Retrives all the event approvals
const getAllEventApprovals = async (req, res) => {
  const result = await EventApprovalService.getAllEventApprovals();
  return makeResponse({
    res,
    message: result.message,
    data: result.data,
    success: result.success,
  });
};

//Retrive an Event Approval by id
const getEventApproval = async (req, res) => {
  const { id: eventApprovalID } = req.params;
  const result = await EventApprovalService.getEventApproval(eventApprovalID);
  return makeResponse({
    res,
    message: result.message,
    data: result.data,
    success: result.success,
  });
};

//Create an Event Approval Record
const createEventApproval = async (req, res) => {
  const eventApprovalData = req.body;
  const result = await EventApprovalService.createEventApproval(
    eventApprovalData
  );
  return makeResponse({
    res,
    success: result.success,
    message: result.message,
    data: result.data,
  });
};

const updateEventApproval = async (req, res) => {
  const eventApprovalData = req.body;
  const { id: eventApprovalID } = req.params;

  const result = await EventApprovalService.updateEventApproval(
    eventApprovalID,
    eventApprovalData
  );
  return makeResponse({
    res,
    success: result.success,
    message: result.message,
    data: result.data,
  });
};

const deleteEventApproval = async (req, res) => {
  const { id: eventApprovalID } = req.params;
  const result = await EventApprovalService.deleteEventApproval(
    eventApprovalID
  );
  return makeResponse({
    res,
    success: result.success,
    message: result.message,
    data: result.data,
  });
};

//Endpoints For Event Component @Dinal
const getEventApprovalByEventID = async (req, res) => {
  const { id: eventID } = req.params;
  const results = await EventApprovalService.getEventApprovalsByEventId(eventID);

  return makeResponse({
    res,
    success: results.success,
    message: results.message,
    data: results.data,
  });
};

const getEventApprovalByOrgID = async (req, res) => {
  const { id: orgID } = req.params;
  const results = await EventApprovalService.getEventApprovalsByOrgId(orgID);

  return makeResponse({
    res,
    success: results.success,
    message: results.message,
    data: results.data,
  });
};

module.exports = {
  getAllEventApprovals,
  createEventApproval,
  getEventApproval,
  updateEventApproval,
  deleteEventApproval,
  getEventApprovalByEventID,
  getEventApprovalByOrgID,
};

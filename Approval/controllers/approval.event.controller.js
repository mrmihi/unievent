const EventApprovalService = require("../services/approval.event.service");
const { HTTP_STATUS } = require("../utils/http_status");
const { makeResponse } = require("../utils/response");
const { Event_Approval } = require("../models/approval.model");

const getAllEventApprovals = async (req, res) => {
    const result = await EventApprovalService.getAllEventApprovals();
    return makeResponse({
        res,
        message: result.message,
        data: result.data,
        success: result.success,
    });
};

const createEventApproval = async (req, res) => {
  try {
    const eventApproval = await EventApprovalService.createEventApproval(
      req.body
    );
    return makeResponse({
      res,
      message: "Event Approval created successfully",
      data: eventApproval,
    });
  } catch (error) {
    return makeResponse({
      res,
      success: false,
      message: error.message,
      data: req.body,
    });
  }
};

const getEventApproval = async (req, res) => {
  try {
    const { id: eventApprovalID } = req.params;
    const eventApproval = await Event_Approval.findById(eventApprovalID);

    if (!eventApproval) {
      return makeResponse({
        res,
        success: false,
        message: `No Event Approval  with id: ${eventApprovalID}`,
        data: req.body,
      });
    }

    return makeResponse({
      res,
      message: "Event Approval fetched successfully",
      data: eventApproval,
    });
  } catch (error) {
    return makeResponse({
      res,
      success: false,
      message: error.message,
      data: req.body,
    });
  }
};

const updateEventApproval = async (req, res) => {
  try {
    const { id: eventApprovalID } = req.params;
    const eventApproval = await Event_Approval.findByIdAndUpdate(
      eventApprovalID,
      req.body,
      { new: true, runValidators: true }
    );

    if (!eventApproval) {
      return makeResponse({
        res,
        success: false,
        message: `No Event Approval  with id: ${eventApprovalID}`,
        data: req.body,
      });
    }

    return makeResponse({
      res,
      message: "Event Approval updated successfully",
      data: eventApproval,
    });
  } catch (error) {
    return makeResponse({
      res,
      success: false,
      message: error.message,
      data: req.body,
    });
  }
};

const deleteEventApproval = async (req, res) => {
  try {
    const { id: eventApprovalID } = req.params;
    const eventApproval = await Event_Approval.findByIdAndDelete(
      eventApprovalID,
      req.body,
      { new: true, runValidators: true }
    );

    if (!eventApproval) {
      return makeResponse({
        res,
        success: false,
        message: `No Event Approval  with id: ${eventApprovalID}`,
        data: req.body,
      });
    }

    return makeResponse({
      res,
      message: "Event Approval deleted successfully",
      data: eventApproval,
    });
  } catch (error) {
    return makeResponse({
      res,
      success: false,
      message: error.message,
      data: req.body,
    });
  }
};

//Endpoints For Event Component @Dinal
const getEventApprovalByEventID = async (req, res) => {
  try {
    const { id: eventID } = req.params;
    const eventApprovals = await Event_Approval.find({ event_id : eventID }).populate("event_id");
    
    if(eventApprovals.length == 0){
        return makeResponse({
            res,
            success: false,
            message: `No Event Approval  for the event id: ${eventID}`,
            data: req.body,
        });
    }

    return makeResponse({
      res,
      message: `Approval details of event id ${eventID} fetched successfully`,
      data: eventApprovals,
    });
  } catch (error) {
    return makeResponse({
      res,
      success: false,
      message: error.message,
      data: req.body,
    });
  }
}

const getEventApprovalByOrgID = async (req, res) => {
    try {
        const { id: orgID } = req.params;
        const eventApprovals = await Event_Approval.find().populate("event_id");

        const filteredEventApprovals = []
        eventApprovals.forEach(eventApproval => {
           const eventDetails = eventApproval.event_id; 
           if(eventDetails.orgId == orgID)
                filteredEventApprovals.push(eventApproval);
        });

        if(filteredEventApprovals.length == 0){
            return makeResponse({
                res,
                success: false,
                message: `No Event Approval  for the organization id: ${orgID}`,
                data: req.body,
            });
        }
    
        return makeResponse({
          res,
          message: `Approval details of organization id ${orgID} fetched successfully`,
          data: eventApprovals,
        });
      } catch (error) {
        return makeResponse({
          res,
          success: false,
          message: error.message,
          data: req.body,
        });
      }
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

const { json } = require("express");
const { Event_Approval } = require("../models/approval.model");
const eventApprovalServices = require("../repositories/approval.event.repository.js");

const createEventApproval = async ({
  event_id,
  lic_approval,
  venue_approval,
  budget_approval,
  admin_approval,
  status,
}) => {
  const eventApproval = new Event_Approval({
    event_id,
    lic_approval,
    venue_approval,
    budget_approval,
    admin_approval,
    status,
  });
  return eventApproval.save();
};

const getAllEventApprovals = async (req, res) => {
  try {
    const eventApprovals = await eventApprovalServices.getAllEventApprovals()
    
    if(eventApprovals.lenght == 0) {
      return ({
        success: false,
        message: "No Event Approvals found",
      })
    }

    return ({
      message: "Event Approvals fetched successfully",
      data: eventApprovals,
    })

  } catch (error) {
    return ({
      success: false,
      message: error.message,
  })
  }
};

const getEventApproval = async () => {};
const updateEventApproval = async () => {};
const deleteEventApproval = async () => {};

module.exports = {
  createEventApproval,
  getAllEventApprovals,
  getEventApproval,
  updateEventApproval,
  deleteEventApproval,
};

const { Event_Approval } = require("../models/approval.model");

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

const getAllEventApprovals = async () => {};
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

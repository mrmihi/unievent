const { Event_Approval } = require("../models/approval.model");

const getAllEventApprovals = async () => {
    const eventApprovals = await Event_Approval.find({})
            .populate("event_id")
            .populate("lic_approval")
            .populate("venue_approval")
            .populate("budget_approval")
            .populate("admin_approval")

    return eventApprovals;
};

const getEventApproval = async (id) => {}

module.exports = {
    getAllEventApprovals,
};
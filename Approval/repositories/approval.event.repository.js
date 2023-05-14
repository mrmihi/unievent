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

const getEventApproval = async (id) => {
    const eventApproval = await Event_Approval.findById(id)
            .populate("event_id")
            .populate("lic_approval")
            .populate("venue_approval")
            .populate("budget_approval")
            .populate("admin_approval")
    return eventApproval;
}

const createEventApproval = async (eventApproval) => {
    const newEventApproval = await Event_Approval.create(eventApproval)
    return newEventApproval;
};

const updateEventApproval = async (id, eventApproval) => {
    console.log(eventApproval)
    const updatedEventApproval = await Event_Approval.findByIdAndUpdate(id, eventApproval, {
        new: true,
        runValidators: true,
    })
    return updatedEventApproval;
}

const deleteEventApproval = async (id) => {
    const deletedEventApproval = await Event_Approval.findByIdAndDelete(id)
    return deletedEventApproval;
}


const getAllEventApprovalsByEventID = async (eventID) => {
    const eventApprovals = await Event_Approval.find({ event_id: eventID, })
        .populate("event_id")
        .populate("lic_approval")
        .populate("venue_approval")
        .populate("budget_approval")
        .populate("admin_approval")
    return eventApprovals;
};

const getAllEventApprovalsByOrgID = async (orgID) => {
    const eventApprovals = await Event_Approval.find()
        .populate("event_id")
        .populate("lic_approval")
        .populate("venue_approval")
        .populate("budget_approval")
        .populate("admin_approval")

    const filteredEventApprovals = [];
    eventApprovals.forEach((eventApproval) => {
      const eventDetails = eventApproval.event_id;
      if (eventDetails.orgId == orgID)
        filteredEventApprovals.push(eventApproval);
    });

    return filteredEventApprovals;
};


module.exports = {
    getAllEventApprovals,
    getEventApproval,
    createEventApproval,
    updateEventApproval,
    deleteEventApproval,
    getAllEventApprovalsByEventID,
    getAllEventApprovalsByOrgID,
};
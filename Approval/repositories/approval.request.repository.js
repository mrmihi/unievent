const { Approval_Request } = require("../models/approval.model");

const getAllApprovalRequests = async () => {
    const eventApprovals = await Approval_Request.find({})
            .populate("requested_to")
            .populate("requested_by")

    return eventApprovals;
};

const getApprovalRequest = async (id) => {
    const eventApproval = await Approval_Request.findById(id)
            .populate("requested_to")
            .populate("requested_by")

    return eventApproval;
}

const createApprovalRequest = async (eventApproval) => {
    const newApprovalRequest = await Approval_Request.create(eventApproval)
    return newApprovalRequest;
};

const updateApprovalRequest = async (id, eventApproval) => {
    const updatedApprovalRequest = await Approval_Request.findByIdAndUpdate(id, eventApproval, {
        new: true,
        runValidators: true,
    })
    return updatedApprovalRequest;
}

const deleteApprovalRequest = async (id) => {
    const deletedApprovalRequest = await Approval_Request.findByIdAndDelete(id)
    return deletedApprovalRequest;
}

module.exports = {
    createApprovalRequest,
    getApprovalRequest,
    getAllApprovalRequests,
    updateApprovalRequest,
    deleteApprovalRequest,
};
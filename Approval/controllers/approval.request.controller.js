const ApprovalRequestService = require('../services/approval.request.service');
const { HTTP_STATUS } = require('../utils/http_status');
const { makeResponse } = require('../utils/response');
const { Approval_Request } = require('../models/approval.model');


const createApprovalRequest = async (req, res) => {
    
}

const getApprovalRequest = async (req, res) => {
    
}

const getAllApprovalRequests = async (req, res) => {}

const updateApprovalRequest = async (req, res) => {}

const deleteApprovalRequest = async (req, res) => {}

module.exports = {
    createApprovalRequest,
    getApprovalRequest,
    getAllApprovalRequests,
    updateApprovalRequest,
    deleteApprovalRequest,
}
const EventApprovalService = require('../services/approval.event.service');
const { HTTP_STATUS } = require('../utils/http_status');
const { makeResponse } = require('../utils/response');
const { Event_Approval } = require('../models/approval.model');

const getAllEventApprovals = async (req, res) => {}

const createEventApproval = async (req, res) => {
    console.log(req.url);

    try {
        console.log(req.body);
        const eventApproval = await EventApprovalService.createEventApproval(req.body);
        return makeResponse({
            res,
            message: 'Event Approval created successfully',
            data: eventApproval,
        });
    } catch (error) {
        console.log(error.message);
        return makeResponse({
            res,
            success : false,
            message: 'Event Approval creation failed',
            data: req.body,
        });
    }
}
const getEventApproval = async (req, res) => {}
const updateEventApproval = async (req, res) => {}
const deleteEventApproval = async (req, res) => {}

//Endpoints For Event Component @Dinal
const getEventApprovalByEventID = async (req, res) => {}
const getEventApprovalByOrgID = async (req, res) => {}

module.exports = {
    getAllEventApprovals,
    createEventApproval,
    getEventApproval,
    updateEventApproval,
    deleteEventApproval,
    getEventApprovalByEventID,
    getEventApprovalByOrgID
};


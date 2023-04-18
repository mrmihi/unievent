const EventApprovalService = require('../services/approval.event.service');
const { HTTP_STATUS } = require('../utils/http_status');
const { makeResponse } = require('../utils/response');
const { Event_Approval } = require('../models/approval.model');

const getAllEventApprovals = async (req, res) => {
    try {
        const eventApprovals = await Event_Approval.find({}) 
        return makeResponse({
            res,
            message: 'Event Approvals fetched successfully',
            data: eventApprovals,
        });
    } catch (error) {
        return makeResponse({
            res,
            success : false,
            message: error.message,
            data: req.body,
        });
    }
}

const createEventApproval = async (req, res) => {
    try {
        const eventApproval = await EventApprovalService.createEventApproval(req.body);
        return makeResponse({
            res,
            message: 'Event Approval created successfully',
            data: eventApproval,
        });
    } catch (error) {
        return makeResponse({
            res,
            success : false,
            message: error.message,
            data: req.body,
        });
    }
}
const getEventApproval = async (req, res) => {
    try {
        const {_id: eventApprovalID } = req.params;
        const eventApproval = await Event_Approval.findById({_id: eventApprovalID});

        if(!eventApproval){
            return makeResponse({
                res,
                success: false,
                message: `no recipient with id: ${recipientID}`,
                data : req.body,
            }) 
        }

        return makeResponse({
            res,
            message: 'Event Approval fetched successfully',
            data: eventApproval,
        });

    } catch (error) {
        return makeResponse({
            res,
            success : false,
            message: error.message,
            data: req.body,
        });
    }
}
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


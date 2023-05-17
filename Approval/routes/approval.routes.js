const router = require('express').Router();

const {
    getAllEventApprovals,
    createEventApproval,
    getEventApproval,
    updateEventApproval,
    deleteEventApproval,
    getEventApprovalByEventID,
    getEventApprovalByOrgID,
} = require("../controllers/approval.event.controller");

const {
    getAllApprovalRequests,
    createApprovalRequest,
    getApprovalRequest,
    updateApprovalRequest,
    deleteApprovalRequest,
    getApprovalRequestsOfUser,
    deleteRequestsByEventApprovalID,
    getPendingApprovalRequestsOfUser,
} = require("../controllers/approval.request.controller");

const {
    getAllAppointment,
    createAppointment,
    getAppointment,
    updateAppointment,
    deleteAppointment,
    getAppoinmentsOfUser,
    getPendingAppoinmentsOfUser,
    getAppointmentByRequestID
} = require("../controllers/appointment.controller");

//Event Approval
router.get("/event/", getAllEventApprovals);
router.post("/event/", createEventApproval);
router.get("/event/:id", getEventApproval);
router.put("/event/:id", updateEventApproval);
router.delete("/event/:id", deleteEventApproval);

//Endpoints For Event Component @Dinal
router.get("/event/events/:id", getEventApprovalByEventID);
router.get("/event/org/:id", getEventApprovalByOrgID);

//Approval Request
router.get("/request/", getAllApprovalRequests);
router.post("/request/", createApprovalRequest);
router.get("/request/user/:id", getApprovalRequestsOfUser);
router.get("/request/user/p/:id", getPendingApprovalRequestsOfUser);
router.get("/request/:id", getApprovalRequest);
router.put("/request/:id", updateApprovalRequest);
router.delete("/request/:id", deleteApprovalRequest);
router.get("/request/events/:id", deleteRequestsByEventApprovalID);

//Appointment
router.get("/appointment", getAllAppointment);
router.post("/appointment", createAppointment);
router.get("/appointment/:id", getAppointment);
router.get("/appointment/r/:id", getAppointmentByRequestID);
router.put("/appointment/:id", updateAppointment);
router.delete("/appointment/:id", deleteAppointment);
router.get("/appointment/user/:id", getAppoinmentsOfUser);
router.get("/appointment/user/p/:id", getPendingAppoinmentsOfUser);

module.exports = router;
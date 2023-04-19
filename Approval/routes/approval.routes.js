const router = require('express').Router();

const {
    getAllEventApprovals,
    createEventApproval,
    getEventApproval,
    updateEventApproval,
    deleteEventApproval,
    getEventApprovalByEventID,
    getEventApprovalByOrgID
} = require("../controllers/approval.event.controller");

const {
    getAllApprovalRequests,
    createApprovalRequest,
    getApprovalRequest,
    updateApprovalRequest,
    deleteApprovalRequest
} = require("../controllers/approval.request.controller");

const {
    getAllAppointment,
    createAppointment,
    getAppointment,
    updateAppointment,
    deleteAppointment
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
router.get("/request/:id", getApprovalRequest);
router.put("/request/:id", updateApprovalRequest);
router.delete("/request/:id", deleteApprovalRequest);

//Appointment
router.get("/appointment", getAllAppointment);
router.post("/appointment", createAppointment);
router.get("/appointment/:id", getAppointment);
router.put("/appointment/:id", updateAppointment);
router.delete("/appointment/:id", deleteAppointment);

module.exports = router;
/**
 * The status of event approval can be in
 * @type {{INITIATED: string, LIC_APPROVAL: string, FM_APPROVAL: string, VM_APPROVAL: string, ADMIN_APPROVAL: string, APPROVED: string, REJECTED: string}}
 * The type of approval request can be in
 * @type {{LIC: string, VENUE: string, FINANCE: string, ADMIN: string}}
 * The status of an appointment can be in
 * @type {{SENT: string, ACCEPTED: string, DECLINED: string}}
 * The mode of an appointment can be in
 * @type {{VIRTUAL: string, PHYSICAL: string, EITHER: string}}
 * The role of a user can be in
 * @type {{LIC: string, VM: string, FM: string, ADMIN: string, STUDENT: string, LECTURER: string}}  
 */

const EVENT_APPROVAL_STATUS = {
  Draft: "Draft",
  INITIATED: "Initiated",
  LIC_APPROVAL: "LIC_Awaiting",
  FM_APPROVAL: "FM_Awaiting",
  VM_APPROVAL: "VM_Awaiting",
  ADMIN_APPROVAL: "Admin_Awaiting",
  APPROVED: "Approved",
  REJECTED: "Rejected",
};

const APPROVAL_REQUEST_STATUS = {
  NOT_YET_SENT: "Not_Yet_Sent",
  SENT: "Sent",
  VIEWED: "Viewed",
  APPROVED: "Approved",
  REJECTED: "Rejected",
};

const REQUEST_TYPE = {
  LIC: "LIC_Request",
  VENUE: "Venue_Request",
  FINANCE: "Budget_Request",
  ADMIN: "Admin_Request",
};

const APPOINTMENT_STATUS = {
  SENT: "Sent",
  ACCEPTED: "Accepted",
  DECLINED: "Declined",
};

const APPOINTMENT_MODE = {
    VIRTUAL: "Virtual",
    PHYSICAL: "Physical",
    EITHER : "Either",
}

module.export = {
    EVENT_APPROVAL_STATUS,
    APPROVAL_REQUEST_STATUS,
    REQUEST_TYPE,
    APPOINTMENT_STATUS,
    APPOINTMENT_MODE
};

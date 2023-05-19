/**
 * @type {module:mongoose.Schema<any>} 
 */

const { Schema, model, Mongoose } = require('mongoose');
const enums = require('../constants/approval.constants');

const eventApprovalSchema = new Schema({
    event_id: { type: Schema.Types.ObjectId, ref : 'Event', required: true , Unique: true},
    lic_approval: { type: Schema.Types.ObjectId, ref: 'Approval_Request'},
    venue_approval: { type: Schema.Types.ObjectId, ref: 'Approval_Request' },
    budget_approval: { type: Schema.Types.ObjectId, ref: 'Approval_Request' },
    admin_approval: { type: Schema.Types.ObjectId, ref: 'Approval_Request' },
    status: { type: String, enum : enums.EVENT_APPROVAL_STATUS, required: true},
    history : [{type : String}]
},{
    timestamps: true,
});

const approvalRequestSchema = new Schema({
    approval_id : { type: Schema.Types.ObjectId, ref: 'Event_Approval', required: true },
    type : { type: String, enum : enums.REQUEST_TYPE, required: true },
    requested_at : { type: Date },
    requested_to : { type: Schema.Types.ObjectId, ref: 'User', required: true },
    requested_by : { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
    viewed_at : { type: Date },
    status : { type: String, enum: enums.APPROVAL_REQUEST_STATUS, required: true },
    request_note : { type: String},
    responded_at : { type: Date },
},{
    timestamps: true,
});

const appointmentSchema = new Schema({
    approval_request_id : { type: Schema.Types.ObjectId, ref: 'Approval_Request', required: true },
    date: { type: Date, required: true },
    start_time: { type: Date, required: true },
    end_time: { type: Date, required: true },
    mode: { type: String, enum : enums.APPOINTMENT_MODE, required: true },
    location: { type: String },
    status: { type: String, enum: enums.APPOINTMENT_STATUS, required: true },
    responded_on: { type: Date },
    meetinglink : { type: String },
    appointment_note : { type: String, required: true },
    requested_by : { type: String, ref: 'Organization' },
},{
    timestamps: true,
});


module.exports = {
    Event_Approval : model('Event_Approval', eventApprovalSchema),
    Approval_Request : model('Approval_Request', approvalRequestSchema),
    Appointment : model('Appointment', appointmentSchema),
}
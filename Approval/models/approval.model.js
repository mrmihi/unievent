/**
 * @type {module:mongoose.Schema<any>} 
 */

const { Schema, model, Mongoose } = require('mongoose');
const { APPROVAL_REQUEST_STATUS, REQUEST_TYPE, EVENT_APPROVAL_STATUS, APPOINTMENT_STATUS,USER_ROLES} = require('../constants/approval.constants');
const { User } = require('../../User/models/user.model');

const eventApprovalSchema = new Schema({
    _id: { type: Schema.Types.ObjectId },
    event_id: { type: Schema.Types.ObjectId, ref : 'Event', required: true },
    lic_approval: { type: Schema.Types.ObjectId, ref: 'Approval_Request'},
    venue_approval: { type: Schema.Types.ObjectId, ref: 'Approval_Request' },
    budget_approval: { type: Schema.Types.ObjectId, ref: 'Approval_Request' },
    admin_approval: { type: Schema.Types.ObjectId, ref: 'Approval_Request' },
    status: { type: String, enum : EVENT_APPROVAL_STATUS, required: true},
});

const approvalRequestSchema = new Schema({
    _id: { type: Schema.Types.ObjectId},
    approval_id : { type: Schema.Types.ObjectId, ref: 'Event_Approval', required: true },
    type : { type: String, enum : REQUEST_TYPE, required: true },
    requested_at : { type: Date, required: true },
    requested_to : { type: Schema.Types.ObjectId, ref: 'User', required: true },
    requested_by : { type: Schema.Types.ObjectId, ref: 'User', required: true },
    viewed_at : { type: Date, required: true },
    status : { type: String, enum: APPROVAL_REQUEST_STATUS, required: true },
    request_note : { type: String, required: true },
    responded_at : { type: Date, required: true },
});

const appointmentSchema = new Schema({
    _id: { type: Schema.Types.ObjectId},
    approval_request_id : { type: Schema.Types.ObjectId, ref: 'Approval_Request', required: true },
    date: { type: Date, required: true },
    start_time: { type: Date, required: true },
    end_time: { type: Date, required: true },
    mode: { type: String, required: true },
    location: { type: String },
    status: { type: String, enum: APPOINTMENT_STATUS, required: true },
    sent_on: { type: Date, required: true },
    responded_on: { type: Date },
    meetinglink : { type: String },
    appointment_note : { type: String, required: true },
})


// const userSchema = new Schema({
//     email:{ type: String, required: true },
//     name:{ type: String,required: false},
//     password: { type: String, required: true},
//     role: { type: String, enum: USER_ROLES, required: true },
//     isActive: { type: Boolean, default: true },
//     designation: { type: String, default: true },
// },
// {
//     versionKey: false,
//     timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'},
// })

module.exports = {
    Event_Approval : model('Event_Approval', eventApprovalSchema),
    Approval_Request : model('Approval_Request', approvalRequestSchema),
    Appointment : model('Appointment', appointmentSchema),
}
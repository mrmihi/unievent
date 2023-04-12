import mongoose from "mongoose";

const attendeeStatusSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        city: String,
        state: String,
        event: String,
        student_year: String,
        phoneNumber: String,
        dataFinalists: Array,
        role: {
            type: String,
            enum: ["attendee", "administrator", "superadministrator"],
            default: "attendee",
        },

        attendeeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Attendee",
        },
        status: {
            type: String,
            enum: [
                "Approved",
                "Invitation",
                "Waitlist",
                "Pending",
                "Not going",
                "Rejected",
                "Not-defined"
            ],
           
            required: true,
        },
        date: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

const AttendeeStatus = mongoose.model("AttendeeStatus", attendeeStatusSchema);

export default AttendeeStatus;

import mongoose from "mongoose";

const AttendeeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            min: 2,
            max: 100,
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true,
        },
        password: {
            type: String,
           
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
            default: "administrator",
        },
    },
    { timestamps: true }
);

const Attendee = mongoose.model("Attendee", AttendeeSchema);
export default Attendee;

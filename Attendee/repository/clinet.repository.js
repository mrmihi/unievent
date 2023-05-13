import Attendee from "../models/Attendee";
import DataFinalists from "../models/DataFinalists";
import AttendeeStatus from "../models/AttendeeStatus";
import FeedBack from "../models/FeedBack";
import FeedBackStat from "../models/FeedBackStat";
import OverallStat from "../models/OverallStat";

export const getAttendee = async (id) => {
    const attendee = await Attendee.findById(id);
    return attendee;
};

export const createAttendees = async (
    name,
    email,
    password,
    city,
    state,
    event,
    student_year,
    phoneNumber,
    role
) => {
    const newAttendee = new Attendee({
        name: name,
        email: email,
        password: password,
        city: city,
        state: state,
        event: event,
        student_year: student_year,
        phoneNumber: phoneNumber,
        role: role,
    });
    const attendee = await newAttendee.save();
    return attendee;
};

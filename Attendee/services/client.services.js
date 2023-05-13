import clientRepositry from "../repositories/client.repository.js";

export const getAttendee = async (id) => {
    try {
        const attendee = await clientRepositry.getAttendee(id);

        return {
            status: 200,
            data: attendee,
        };
    } catch (error) {
        return error;
    }
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
    console.log("redddd", req.body);
    try {
        const attendee = await clientRepositry.createAttendees({
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
        return {
            status: 200,
            data: attendee,
            massage: "attendee created successfully",
        };
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

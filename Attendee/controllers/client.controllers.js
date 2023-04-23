import clientServices from "../services/client.services.js";

export const getAttendee = async (req, res) => {
    const { id } = req.params;

    const resulte = await clientServices.getAttendee(id);

    return {
        res,
        ...resulte,
    };
};

export const createAttendees = async (req, res) => {
    const result = await clientServices.createAttendees(req.body);

    return {
        res,
        ...result,
    };
};

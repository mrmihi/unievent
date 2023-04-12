import FeedBack from "../models/FeedBack.js";
import FeedBackStat from "../models/FeedBackStat.js";
import Attendee from "../models/Attendee.js";
import DataFinalists from "../models/DataFinalists.js";
import AttendeeStatus from "../models/AttendeeStatus.js";

export const getFeedBacks = async (req, res) => {
    try {
        const feedBacks = await FeedBack.find();

        const feedBacksWithStats = await Promise.all(
            feedBacks.map(async (feedBack) => {
                const stat = await FeedBackStat.find({
                    feedBackId: feedBack._id,
                });
                return {
                    ...feedBack._doc,
                    stat,
                };
            })
        );

        res.status(200).json(feedBacksWithStats);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getAttendee = async (req, res) => {
    try {
        const attendee = await Attendee.find({ role: "attendee" }).select(
            "-password"
        );
        res.status(200).json(attendee);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
 
export const getAttendeeById = async (req, res) => {
    const { id } = req.params;

    try {
        const attendee = await Attendee.findById(id);

        if (!attendee) {
            return res.status(404).json({ message: "Attendee not found" });
        }

        res.status(200).json(attendee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const createAttendees = async (req, res) => {
    const {
        name,
        email,
        password,
        city,
        state,
        event,
        student_year,
        phoneNumber,
        role,
    } = req.body;
    console.log("redddd", req.body);
    try {
        const attendee = await Attendee.create({
            name,
            email,
            password,
            city,
            state,
            event,
            student_year,
            phoneNumber,
            role,
        });
        res.status(201).json(attendee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateAttendees = async (req, res) => {
    const { id } = req.params;
    const {
        name,
        email,
        password,
        city,
        state,
        event,
        student_year,
        phoneNumber,
        role,
    } = req.body;
    console.log("chackupdatedatteende", req.body);
    try {
        const attendee = await Attendee.findByIdAndUpdate(
            id,
            {
                name,
                email,
                password,
                city,
                state,
                event,
                student_year,
                phoneNumber,
                role,
            },
            { new: true }
        );
        res.status(200).json(attendee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteAttendees = async (req, res) => {
    const { id } = req.params;

    try {
        const attendee = await Attendee.findByIdAndDelete(id);

        if (!attendee) {
            return res.status(404).json({ message: "Attendee not found" });
        }

        res.status(200).json({ message: "Attendee deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getDataFinalists = async (req, res) => {
    try {
        // sort should look like this: { "field": "attendeeId", "sort": "desc"}
        const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

        // formatted sort should look like { attendeeId: -1 }
        const generateSort = () => {
            const sortParsed = JSON.parse(sort);
            const sortFormatted = {
                [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
            };

            return sortFormatted;
        };
        const sortFormatted = Boolean(sort) ? generateSort() : {};

        const dataFinalists = await DataFinalists.find({
            $or: [
                { cost: { $regex: new RegExp(search, "i") } },
                { attendeeId: { $regex: new RegExp(search, "i") } },
            ],
        })
            .sort(sortFormatted)
            .skip(page * pageSize)
            .limit(pageSize);

        const total = await DataFinalists.countDocuments({
            name: { $regex: search, $options: "i" },
        });

        res.status(200).json({
            dataFinalists,
            total,
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createDataFinalist = async (req, res) => {
    try {
        const newDataFinalist = new DataFinalists(req.body);
        await newDataFinalist.save();
        res.status(201).json(newDataFinalist);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateDataFinalist = async (req, res) => {
    const { id } = req.params;

    try {
        const updatedDataFinalist = await DataFinalists.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedDataFinalist);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteDataFinalist = async (req, res) => {
    const { id } = req.params;

    try {
        await DataFinalists.findByIdAndDelete(id);
        res.status(200).json({ message: "Data finalist deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Create attendee status
export const createAttendeeStatus = async (req, res) => {
    const {
        name,
        email,
        city,
        state,
        event,
        student_year,
        phoneNumber,
        attendeeId,
        status,
    } = req.body;

    try {
        const attendeeStatus = await AttendeeStatus.create({
            name,
            email,
            city,
            state,
            event,
            student_year,
            phoneNumber,
            attendeeId,
            status,
        });
        res.status(201).json(attendeeStatus);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update attendee status
export const updateAttendeeStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const attendeeStatus = await AttendeeStatus.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );
        if (!attendeeStatus) {
            return res
                .status(404)
                .json({ message: "Attendee status not found" });
        }

        res.status(200).json(attendeeStatus);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete attendee status
export const deleteAttendeeStatus = async (req, res) => {
    const { id } = req.params;

    try {
        const attendeeStatus = await AttendeeStatus.findByIdAndDelete(id);

        if (!attendeeStatus) {
            return res
                .status(404)
                .json({ message: "Attendee status not found" });
        }

        res.status(200).json({
            message: "Attendee status deleted successfully",
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all attendee statuses
export const getAllAttendeeStatuses = async (req, res) => {
    try {
        const attendeeStatuses = await AttendeeStatus.find().populate(
            "attendeeId"
        );
        // const response = {};

        // attendeeStatuses.forEach((attendeeStatus) => {
        //   const { _id, status } = attendeeStatus;

        //   if (!response[status]) {
        //     response[status] = [];
        //   }

        //   response[status].push({ _id });
        // });

        res.status(200).json(attendeeStatuses);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get single attendee status by ID
// export const getAttendeeStatusById = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const attendeeStatus = await AttendeeStatus.findById(id).populate(
//       "attendeeId"
//     );

//     if (!attendeeStatus) {
//       return res.status(404).json({ message: "Attendee status not found" });
//     }

//     res.status(200).json(attendeeStatus);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

import mongoose from "mongoose";
import Attendee from "../models/Attendee.js";
import DataFinalists from "../models/DataFinalists.js";

export const getAdministrator = async (req, res) => {
    try {
        const administrator = await Attendee.find({
            role: "administrator",
        }).select("-password");

        res.status(200).json(administrator);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createAdministrator = async (req, res) => {
    const { name, email, password, city, state, phoneNumber, role } = req.body;

    console.log("createAdministror", req.body);

    try {
        const administrator = await Attendee.create({
            name,
            email,
            password,
            city,
            state,
            phoneNumber,
            role,
        });

        res.status(201).json(administrator);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateAdministrator = async (req, res) => {
    const { id } = req.params;
    const { name, email, password, city, state, phoneNumber, role } = req.body;

    console.log("updateAdministror", req.body);

    try {
        const administrator = await Attendee.findByIdAndUpdate(
            id,
            {
                name,
                email,
                password,
                city,
                state,
                phoneNumber,
                role,
            },
            { new: true }
        );

        res.status(200).json(administrator);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteAdministrator = async (req, res) => {
    const { id } = req.params;
    try {
        const administrator = await Attendee.findByIdAndDelete(id);
        res.status(200).json({administrator, message: "Administrator deleted successfully."});
    } catch {
        res.status(400).json({ message: error.message });
    }
};



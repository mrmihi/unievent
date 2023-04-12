import express from "express";
import { getAttendee, getDashboardStats } from "../controllers/general.js";


const router = express.Router();

router.get("/attendee/:id", getAttendee);


router.get("/dashboard", getDashboardStats);

export default router;

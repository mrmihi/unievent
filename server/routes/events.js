import express from "express";
import { getEvents } from "../controllers/events.js";

const router = express.Router();

router.get("/events", getEvents);

export default router;

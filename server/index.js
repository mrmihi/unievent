import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import eventsRoutes from "./routes/events.js";
import EmailSender from "./controllers/sendEmail.js";

// data imports
import Attendee from "./models/Attendee.js";
import FeedBack from "./models/FeedBack.js";
import FeedBackStat from "./models/FeedBackStat.js";
import DataFinalists from "./models/DataFinalists.js";
import OverallStat from "./models/OverallStat.js";
import AffiliateStat from "./models/AffiliateStat.js";
import AttendeeStatus from "./models/AttendeeStatus.js";
import {
    dataAttendee,
    dataFeedBack,
    dataFeedBackStat,
    eventDataFinalists,
    dataOverallStat,
    dataAffiliateStat,
    dataAttendeeStatus,
} from "./data/index.js";

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: `${process.env.CLIENT_URL}` }));

/* ROUTES */
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/events", eventsRoutes);

const PORT = process.env.PORT || 9000;

app.post("/send", async (req, res) => {
    try {
        const { fullName, email, message } = req.body;
        EmailSender({ fullName, email, message });
        res.json({ msg: "Your message sent successfully" });
    } catch (error) {
        res.status(404).json({ msg: "Error ❌" });
    }
});

/* MONGOOSE SETUP */
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

        // AffiliateStat.insertMany(dataAffiliateStat);
        // OverallStat.insertMany(dataOverallStat);
        // FeedBack.insertMany(dataFeedBack);
        // FeedBackStat.insertMany(dataFeedBackStat);
        // DataFinalists.insertMany(eventDataFinalists);
        // Attendee.insertMany(dataAttendee);
        //AttendeeStatus.insertMany(dataAttendeeStatus);
    })
    .catch((error) => console.log(`${error} did not connect`));

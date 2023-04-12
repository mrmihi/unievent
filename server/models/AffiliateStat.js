import mongoose from "mongoose";

const AffiliateStatSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Types.ObjectId, ref: "Attendee" },
        affiliateEvents: {
            type: [mongoose.Types.ObjectId],
            ref: "DataFinalists",
        },
    },
    { timestamps: true }
);

const AffiliateStat = mongoose.model("AffiliateStat", AffiliateStatSchema);
export default AffiliateStat;

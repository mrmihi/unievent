const VenueSubscription = require('../models/subscribe.model');
const Organization = require('../../User/models/org.model');

const manageSubscription = async (req, res) => {
    try {
        const organizationId = "6449ee79be1db21bb2b63102";
        const venueId = req.params.id;
        const subscription = await VenueSubscription.findOne({ organizer: organizationId, venue: venueId });
        const organizerMail = await Organization.findOne({ _id: organizationId });

        if (!subscription) {
            const newSubscription = new VenueSubscription({
                organizer: organizationId,
                venue: venueId,
                email: organizerMail.email,
                active: true
            });
            await newSubscription.save();
            res.status(200).json({ message: 'Subscription managed successfully', newSubscription });
        } else {
            subscription.active = !subscription.active;
            await subscription.save();
            res.status(200).json({ message: 'Subscription managed successfully', subscription });
        }
    }catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error);
    }
};

const getSubscriptions = async (req, res) => {
    try {
        const organizationId = "6449ee79be1db21bb2b63102";
        const venueId = req.params.id;
        const venueSubscriptions = await VenueSubscription.findOne({ organizer: organizationId, venue: venueId });
        res.status(200).json({ message: 'Subscriptions fetched successfully', venueSubscriptions });
    }catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error);
    }
};

module.exports = {
    manageSubscription,
    getSubscriptions
}


const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const VenueSubscriptionSchema = new Schema(
    {
        organizer: {
            type: Schema.Types.ObjectId,
            ref: 'Organization',
            required: true
        },
        venue: {
            type: Schema.Types.ObjectId,
            ref: 'Venue',
            required: true
        },
        active: {
            type: Boolean,
            default: true
        },
        email: {
            type: String,
            required: true
        }
    },
    {
        versionKey: false,
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    }
);

VenueSubscriptionSchema.plugin(mongoosePaginate);

VenueSubscriptionSchema.index({ organizer: 1, venue: 1 }, { unique: true });

const VenueSubscription = model('VenueSubscription', VenueSubscriptionSchema);

VenueSubscription.syncIndexes();

module.exports = VenueSubscription;

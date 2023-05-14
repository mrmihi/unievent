const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const ReviewSchema = new Schema(
    {
        rating: {
            type: Number,
            required: true,
        },
        review: {
            type: String,
            required: true
        },
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
        manager: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        row: {
            type: Number,
            required: true,
            default: 0
        },
    },
    {
        versionKey: false,
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    }
)

ReviewSchema.plugin(mongoosePaginate)

ReviewSchema.index({ createdAt: 1 })

const Review = model('Review', ReviewSchema)

Review.syncIndexes()

module.exports = Review;

const { Schema, model } = require('mongoose');

/**
 *
 * @type {module:mongoose.Schema<any>}
 */

const speakerSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  occupation: { type: String, required: true },
  topic: { type: String, required: true },
  photo: { type: String, required: true },
  twitterURL: { type: String, required: true },
  linkedInURL: { type: String, required: true },
});

const attendeeSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  organization: { type: String, required: true },
});

const eventSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [5, 'Name should have a minimum of 10 characters'],
    },
    description: {
      type: String,
      required: true,
      minlength: [10, 'Description should have a minimum of 10 characters'],
    },
    headerImage: {
      type: String,
    },
    venue: {
      type: Schema.Types.ObjectId,
      ref: 'Venue',
    },
    startTime: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          // Ensure the startTime is not in the past
          return value >= new Date();
        },
        message: 'Start Date & Time should be in the future',
      },
    },
    endTime: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          // Ensure the endTime is not in the past
          return value >= new Date();
        },
        message: 'End Date & Time should be in the future',
      },
    },
    status: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    speakers: {
      type: [speakerSchema],
    },
    attendeeCount: {
      type: Number,
      default: 0,
    },
    attendees: {
      type: [attendeeSchema],
    },
    capacity: {
      type: Number,
      min: [10, 'Capacity should be at least 10'],
      max: [1000, 'Capacity should be at most 1000'],
    },
    tags: {
      type: [String],
    },
    joinLink: {
      type: String,
    },
    host: {
      type: String,
    },
    org: {
      type: String,
    },
    orgId: {
      type: Schema.Types.ObjectId,
      ref: 'Organization',
    },
  },
  { timestamps: true }
);

module.exports = model('Event', eventSchema);

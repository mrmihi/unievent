const mongoose = require('mongoose');

const SpeakerSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    sessionTime: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    contactNo: {
      type: String,
      required: true,
    },
    speakerImage: {
      type: String,
      required: true,
    },
    eventID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'events',
      required: true,
    },
    organizationID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'organizations',
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

module.exports = mongoose.model('speakers', SpeakerSchema);

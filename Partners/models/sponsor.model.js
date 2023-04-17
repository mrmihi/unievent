const mongoose = require('mongoose');

const SponsorSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    packageType: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    eventID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'event',
      required: true,
    },
    organizerID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'organizers',
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

module.exports = mongoose.model('sponsors', SponsorSchema);

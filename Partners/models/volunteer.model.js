const mongoose = require('mongoose');

const VolunteerSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    contactNo: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    availableTime: {
      type: [String],
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    opportunityID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'opportunities',
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

module.exports = mongoose.model('volunteers', VolunteerSchema);

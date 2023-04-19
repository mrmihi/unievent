const mongoose = require('mongoose');

const OpportunitySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    opportunityImage: {
      type: String,
      required: true,
    },
    eventID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'events',
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

module.exports = mongoose.model('opportunities', OpportunitySchema);

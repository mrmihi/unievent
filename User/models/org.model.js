const mongoose = require('mongoose');
// const aggregratePaginate = require('mongoose-aggregate-paginate-v2');

const orgSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: true,
    },
    incharge:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// orgSchema.plugin(aggregratePaginate);
// orgSchema.index({ createdAt: 1 });

const Org = mongoose.model('Organization', orgSchema);

// Org.syncIndexes();

module.exports = Org;
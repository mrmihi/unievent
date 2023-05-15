const mongoose = require('mongoose');
// const aggregratePaginate = require('mongoose-aggregate-paginate-v2');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: [
        'student',
        'admin',
        'accountant',
        'venue',
        'attendee',
        'resource',
        'staff',
      ],
      required: true,
    },
    img_url: {
      type : String,
    }
    // active: {
    //     type: Boolean,
    //     default: true
    // }
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

// userSchema.plugin(aggregratePaginate);
// userSchema.index({createdAt: 1});

const User = mongoose.model('User', userSchema);

// User.syncIndexes();

module.exports = User;

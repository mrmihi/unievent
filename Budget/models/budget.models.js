const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true
      },
      organizationName: {
        type: String,
        required: true
      },
      createdDate: {
        type: Date,
        default: Date.now
      },
    //   creatorEmail: {
    //     type: String,
    //     required: true
    //   },
      income: [
        {
          description: String,
          amount: Number
        }
      ],
      expenses: [
        {
          description: String,
          amount: Number
        }
      ],
      totalIncome: {
        type: Number,
        default: function() {
          return this.income.reduce((acc, inc) => acc + inc.amount, 0);
        }
      },
      totalExpenses: {
        type: Number,
        default: function() {
          return this.expenses.reduce((acc, exp) => acc + exp.amount, 0);
        }
      },
      eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
      }

      // createdBy: {
      //   type: mongoose.Schema.Types.ObjectId,
      //   // ref: 'User',
      //   // required: true
      // }
});

// budgetSchema.virtual('creatorEmail', {
//     ref: 'User',
//     localField: 'createdBy',
//     foreignField: '_id',
//     justOne: true,
//     select: 'email'
// });


const Budget = mongoose.model('Budget', budgetSchema);
module.exports = Budget;
const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    categories:[
        {
            name:String,
            expenses:[
                {
                    name:String,
                    amount:Number,
                }
            ]
        }
    ],

    createdBy:{
        type: mongoose.Schema.Types.ObjectId,

        ref: 'User'
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});


const Budget = mongoose.model('Budget', budgetSchema);
module.exports = Budget;
const mongoose = require('mongoose');
const aggregratePaginate = require('mongoose-aggregate-paginate-v2');

const organizationSchema = new mongoose.Schema({
    
    email:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    mobile:{
        type: String,
        required: true

    },
    website:{
        type: String,
        required: true
    }
    // active: {
    //     type: Boolean,
    //     default: true
    // }
},
{
    versionKey: false,
    // timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'},
    timestamps:true
}

);

organizationSchema.plugin(aggregratePaginate);
organizationSchema.index({createdAt: 1});

const Organization = mongoose.model('Organization', organizationSchema)

Organization.syncIndexes();

module.exports = Organization
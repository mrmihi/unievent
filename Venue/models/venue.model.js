const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const venueSchema = new Schema({});

venueSchema.plugin(mongoosePaginate);
venueSchema.index({ createdAt: 1, updatedAt: 1 });

const Venue = model('Venue', venueSchema);
Venue.syncIndexes();

module.exports = Venue;

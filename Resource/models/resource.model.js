const { Schema, model } = require('mongoose');

/**
 *
 * @type {module:mongoose.Schema<any>}
 */

const resourceSchema = new Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  availableQty: { type: Number },
  image_url: { type: String, required: true },
});

// const SupplierSuggestionSchema = new Schema({
//   //supplier_id: { type: String, required: true },
//   supplierName: { type: String, required: true },
//   itemName: { type: String, required: true },
//   address: { type: String, required: true },
//   contactNO: { type: String, required: true },
//   image_url: { type: String, required: true },
// });

module.exports = model('Resource', resourceSchema);

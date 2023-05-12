const Resource = require('../models/resource.model');
const validateRequest = require('../middleware/requestValidator');

// This function is not complete
const createResource = async ({ name, quantity, availableQty, image_url }) => {
  const resource = new Resource({
    name,
    quantity,
    availableQty,
    image_url,
  });

  return resource.save();
};

const getResourceById = (id) => Resource.findById(id);

const updateResourceById = async (id, body) => {
  const resource = await Resource.findById(id);
  return await resource.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: false,
  });
};
const deleteResourceById = async () => {};

module.exports = {
  createResource,
  getResourceById,
  updateResourceById,
  deleteResourceById,
};

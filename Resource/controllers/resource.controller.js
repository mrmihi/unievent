const ResourceService = require('../services/resource.service');
const { HTTP_STATUS } = require('../utils/http');
const { makeResponse } = require('../utils/response');
const Resource = require('../models/resource.model');
const tokenHelper = require('../helpers/token.helper');
const jwt = require('jsonwebtoken');

const createResource = async (req, res) => {
  const resource = await ResourceService.createResource(req.body, req.org);
  console.log(req.body);
  return makeResponse({
    res,
    message: 'Resource added successfully!',
    data: resource,
  });
};

const getResourceById = async (req, res) => {
  const resource = await ResourceService.getResourceById(req.params.id);
  if (!resource)
    return makeResponse({
      res,
      success: false,
      message: `Resource not found with id:${req.params.id}`,
      status: HTTP_STATUS.BAD_REQUEST,
    });
  return makeResponse({
    res,
    message: 'Data retrieval successful',
    data: resource,
  });
};

// const getResourceById = async (req, res) => {
//   try {
//     const Resource = await Resource.findById(req.params.id);
//     res.status(200).json(Resource);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

const getAllResources = async (req, res) => {
  const resources = await Resource.find({});
  res.json(resources);
};

const updateResourceById = async (req, res) => {
  const resource = req.body;
  const id = req.params.id;

  const updatedResource = await Resource.findByIdAndUpdate(id, resource, {
    new: true,
  });

  updatedResource
    ? res.status(200).json(updatedResource.toJSON())
    : res.status(404).end();
};

const deleteResourceById = async (req, res) => {
  const id = req.params.id;
  const resource = await Resource.findById(id);
  await resource.deleteOne({ _id: id });
  res.sendStatus(204).end();
};

module.exports = {
  createResource,
  getAllResources,
  getResourceById,
  updateResourceById,
  deleteResourceById,
};

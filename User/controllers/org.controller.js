const Organization = require('../models/org.model');
const bcrypt = require('bcrypt');
const generateToken = require('../util/token.js');

//create organization
const createOrg = async (req, res) => {
  try {
    const { email, name, password, mobile, website } = req.body; //get email, name, password, mobile and website from request body
    const salt = await bcrypt.genSalt(10); //generate salt
    const hashedPassword = await bcrypt.hash(password, salt); //hash password
    const organization = await Organization.create({
      name,
      email,
      password: hashedPassword,
      mobile,
      website,
    });
    if (organization) {
      res.status(201).json({
        _id: organization._id,
        name: organization.name,
        email: organization.email,
        mobile: organization.mobile,
        website: organization.website,
        token: generateToken(organization._id),
      }); //generate token
    } else {
      res.status(400).json({ message: 'Invalid organization data' });
    } //if organization is not created
  } catch (error) {
    res.status(500).json({ message: error.message });
  } //catch error
}; //create organization

//login organization
const loginOrg = async (req, res) => {
  try {
    const { email, password } = req.body; //get email and password from request body
    const organization = await Organization.findOne({ email }); //find organization by email

    if (
      organization &&
      (await bcrypt.compare(password, organization.password))
    ) {
      res.status(201).json({
        _id: organization._id,
        name: organization.name,
        email: organization.email,
        mobile: organization.mobile,
        website: organization.website,
        token: generateToken(organization._id),
      }); //generate token

      // res.status(201).json(organization)//return organization
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    } //if organization is not created
  } catch (error) {
    res.status(500).json({ message: error.message });
  } //catch error
}; //login organization

//get all organizations
const getAllOrg = async (req, res) => {
  try {
    const organizations = await Organization.find({}); //find all organizations
    res.status(200).json(organizations); //return all organizations
  } catch (error) {
    res.status(500).json({ message: error.message });
  } //catch error
}; //get all organizations

//delete organization
const deleteOrg = async (req, res) => {
  try {
    const { id } = req.params; //get id from request params
    const review = await Organization.findByIdAndDelete({ _id: id }); //delete organization by id

    if (!review) {
      return res.status(404).json({ message: 'Organization not found' });
    } //if organization is not deleted
    else {
      res.status(200).json({ message: 'Organization deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  } //catch error
};

//update organization
const updateOrg = async (req, res) => {
  try {
    const { id } = req.params; //get id from request params
    const { email, name, mobile, website } = req.body; //get name, email, password and mobile from request body

    const organization = await Organization.findByIdAndUpdate(
      { _id: id },
      { email, name, mobile, website },
      { new: true }
    ); //update organization by id

    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    } //if organization is not updated
    else {
      res.status(200).json({ message: 'Organization updated successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  } //catch error
};

module.exports = {
  createOrg,
  loginOrg,
  getAllOrg,
  deleteOrg,
  updateOrg,
}; //export all functions

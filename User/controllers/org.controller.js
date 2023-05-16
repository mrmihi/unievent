const Org = require('../models/org.model');
const bcrypt = require('bcrypt');
const generateToken = require('../util/token.js');

//create Org
const createOrg = async (req, res) => {
  try {
    const { email, name, password, mobile, website, incharge } = req.body; //get email, name, password, mobile and website from request body
    const existingOrg = await Org.findOne({ email }); //find user by email
    if (existingOrg) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const salt = await bcrypt.genSalt(10); //generate salt
    const hashedPassword = await bcrypt.hash(password, salt); //hash password
    const org = await Org.create({
      name,
      email,
      password: hashedPassword,
      mobile,
      website,
      incharge
    });
    if (org) {
      res.status(201).json({
        _id: org._id,
        name: org.name,
        email: org.email,
        mobile: org.mobile,
        website: org.website,
        incharge: org.incharge,
        token: generateToken(org._id),
      }); //generate token
    } else {
      res.status(400).json({ message: 'Invalid Org data' });
    } //if Org is not created
  } catch (error) {
    res.status(500).json({ message: error.message });
  } //catch error
}; //create Org

//login Org
const loginOrg = async (req, res) => {
  try {
    const { email, password } = req.body; //get email and password from request body
    const org = await Org.findOne({ email }); //find Org by email
    if (!org) {
      res.status(401).json({ message: 'Email does not exist!' });
    }

    if (org && (await bcrypt.compare(password, org.password))) {
      res.status(201).json({
        _id: org._id,
        name: org.name,
        email: org.email,
        mobile: org.mobile,
        website: org.website,
        token: generateToken(org._id),
      }); //generate token

      // res.status(201).json(Org)//return Org
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    } //if Org is not created
  } catch (error) {
    res.status(500).json({ message: error.message });
  } //catch error
}; //login Org

//get all Orgs
const getAllOrg = async (req, res) => {
  try {
    const orgs = await Org.find({}).populate("incharge"); //find all Orgs
    res.status(200).json(orgs); //return all Orgs
  } catch (error) {
    res.status(500).json({ message: error.message });
  } //catch error
}; //get all Orgs


//get  Org by incharge id
//for shabs
const getOrgByInchargeID = async (req, res) => {
  try {
    const { id : incharge } = req.params; //get id from request params
    const orgs = await Org.find({incharge : incharge}).populate("incharge"); //find Org
    res.status(200).json(orgs); //return all Orgs
  } catch (error) {
    res.status(500).json({ message: error.message });
  } //catch error
}; 

const getOrgByID = async (req, res) => {
  try {
    const { id : orgID } = req.params; //get id from request params
    const orgs = await Org.findById({_id : orgID})
            .populate("incharge"); //find Org
    res.status(200).json(orgs); //return all Orgs
  } catch (error) {
    res.status(500).json({ message: error.message });
  } //catch error
}

//delete Org
const deleteOrg = async (req, res) => {
  try {
    const { id } = req.params; //get id from request params
    const review = await Org.findByIdAndDelete({ _id: id }); //delete Org by id

    if (!review) {
      return res.status(404).json({ message: 'Org not found' });
    } //if Org is not deleted
    else {
      res.status(200).json({ message: 'Org deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  } //catch error
};

//update Org
const updateOrg = async (req, res) => {
  try {
    const { id } = req.params; //get id from request params
    const { email, name, mobile, website, incharge } = req.body; //get name, email, password and mobile from request body

    const org = await Org.findByIdAndUpdate(
      { _id: id },
      { email, name, mobile, website, incharge },
      { new: true }
    ); //update Org by id

    if (!org) {
      return res.status(404).json({ message: 'Org not found' });
    } //if Org is not updated
    else {
      res.status(200).json({ message: 'Org updated successfully' });
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
  getOrgByInchargeID,
  getOrgByID
}; //export all functions